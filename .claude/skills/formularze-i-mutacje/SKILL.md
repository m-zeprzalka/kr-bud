---
name: formularze-i-mutacje
description: Użyj gdy budujesz formularze, walidujesz user input, obsługujesz form submissions, lub tworzysz Server Actions dla mutacji. Pokrywa wzorce react-hook-form + zod schema, strukturę Server Action, error handling, optimistic updates, i UX formularzy. Triggery: "formularz", "form", "submit", "walidacja", "validation", "server action", "mutacja", "mutation", "save", "zapisz", "create form", "edit form", "input validation", "zod schema".
---

# Formularze i Mutacje

Opinionated stack: **react-hook-form + zod + Server Actions**. Schema-first, type-safe end-to-end, server-validated.

## Kompletny wzorzec

### 1. Zdefiniuj schemę raz
```tsx
// lib/validators/post.ts
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Tytuł musi mieć minimum 3 znaki").max(100),
  body: z.string().min(10, "Treść musi mieć minimum 10 znaków"),
  published: z.boolean().default(false),
});

export type PostInput = z.infer<typeof postSchema>;
```

### 2. Server Action waliduje i mutuje
```tsx
// app/posts/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { postSchema } from "@/lib/validators/post";
import { db } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function createPost(input: unknown): Promise<ActionResult<{ id: string }>> {
  // 1. Authenticate
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Unauthorized" };

  // 2. Validate (NIGDY nie ufaj client input — re-validate nawet po zodResolver)
  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Invalid input",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // 3. Mutate
  try {
    const post = await db.posts.create({
      data: { ...parsed.data, authorId: user.id },
    });

    // 4. Revalidate affected paths
    revalidatePath("/posts");
    revalidatePath(`/users/${user.id}/posts`);

    return { ok: true, data: { id: post.id } };
  } catch (e) {
    console.error("Failed to create post:", e);
    return { ok: false, error: "Nie udało się zapisać. Spróbuj ponownie." };
  }
}
```

### 3. Client form z react-hook-form
```tsx
// app/posts/new/post-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { postSchema, type PostInput } from "@/lib/validators/post";
import { createPost } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function PostForm() {
  const router = useRouter();
  const form = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: "", body: "", published: false },
  });

  async function onSubmit(values: PostInput) {
    const result = await createPost(values);

    if (!result.ok) {
      // Mapuj server field errors z powrotem na form
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, errors]) => {
          if (errors?.[0]) {
            form.setError(field as keyof PostInput, { message: errors[0] });
          }
        });
        return;
      }
      form.setError("root", { message: result.error });
      return;
    }

    router.push(`/posts/${result.data.id}`);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Tytuł</Label>
        <Input
          id="title"
          {...form.register("title")}
          aria-invalid={!!form.formState.errors.title}
          aria-describedby={form.formState.errors.title ? "title-error" : undefined}
        />
        {form.formState.errors.title && (
          <p id="title-error" role="alert" className="text-sm text-destructive">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="body">Treść</Label>
        <Textarea id="body" rows={8} {...form.register("body")} />
        {form.formState.errors.body && (
          <p role="alert" className="text-sm text-destructive">
            {form.formState.errors.body.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="published" {...form.register("published")} />
        <Label htmlFor="published">Opublikuj natychmiast</Label>
      </div>

      {form.formState.errors.root && (
        <p role="alert" className="text-sm text-destructive">
          {form.formState.errors.root.message}
        </p>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Zapisywanie..." : "Utwórz post"}
        </Button>
      </div>
    </form>
  );
}
```

## Wzorzec Result type

Server Actions ZAWSZE zwracają discriminated union, nigdy nie throw'ują:

```tsx
type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
```

### Dlaczego
- Type-safe error handling na clientcie
- Brak try/catch boilerplate w call sites
- Field-level errors mapują czysto na form errors
- Exhaustive checks przez discriminated union

### Wzorzec wywołania
```tsx
const result = await createPost(values);
if (!result.ok) {
  // result.error jest typed; result.fieldErrors jest typed
  return;
}
// result.data jest typed — proceed
```

## Zasady UX formularzy

### Labels ZAWSZE widoczne
- Nad inputem (nie tylko placeholder, nie wewnątrz)
- `htmlFor` matchuje input `id`
- Optional fields explicit oznaczone LUB required fields oznaczone `*` — wybierz jedną konwencję

### Timing walidacji
- **Na blur** dla field-level errors (nie krzycz gdy user nadal pisze)
- **Na submit** dla full walidacji
- **Na change** TYLKO gdy poprawia poprzedni error (żeby user widział że to naprawił)

react-hook-form's `mode: "onBlur"` matchuje to.

```tsx
const form = useForm({
  resolver: zodResolver(schema),
  mode: "onBlur",  // walidacja na blur, potem re-walidacja na change po pierwszym errorze
});
```

### Disable submit during submitting
```tsx
<Button type="submit" disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? "Zapisywanie..." : "Zapisz"}
</Button>
```

Zapobiega double-submit. Pokazuje progress.

### Single column zawsze
Formularze są ZAWSZE single-column. Two-column forms wymuszają horizontal eye movement i psują się na mobile.

Wyjątek: bardzo wąskie paired fields (first name + last name) gdy width matters.

### Pozycja submit buttona
- Mobile: full-width, sticky bottom dla long forms
- Desktop: right-aligned na końcu form
- Tylko primary action — secondary ("Cancel") jako ghost variant, po lewej od primary

### Loading i disabled states
- Submit button: disabled + spinner podczas submitting
- Form fields: opcjonalnie disabled podczas submitting (zapobiega edytom mid-submit)

```tsx
<fieldset disabled={form.formState.isSubmitting}>
  {/* wszystkie form fields */}
</fieldset>
```

## Wzorce Server Action

### Zawsze revalidate po mutacji
```tsx
revalidatePath("/posts");          // re-render posts list
revalidateTag("posts");            // lub przez tag jeśli używasz fetch z tagami
```

Bez tego, user widzi stale dane po swojej akcji.

### Redirect z Server Action
```tsx
import { redirect } from "next/navigation";

export async function createPost(input: unknown) {
  // ... walidacja, mutacja ...
  redirect(`/posts/${post.id}`);   // throws — funkcja nigdy nie returnuje
}
```

Gdy używasz `redirect`, action nie returnuje — redirect JEST success signalem.

### Optimistic updates
Dla perceived snappiness, użyj `useOptimistic`:

```tsx
"use client";
import { useOptimistic } from "react";

export function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  );

  async function handleAdd(title: string) {
    addOptimisticTodo({ id: "temp", title, done: false });
    await createTodo({ title });
  }

  return <>{optimisticTodos.map(...)}</>;
}
```

## Form composition shortcut: shadcn `<Form>`

shadcn dostarcza `<Form>` wrapper wokół react-hook-form dla less boilerplate:

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tytuł</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

Używaj tego gdy masz 3+ pola. Dla 1-2 polowych formów, plain `useForm` + manualne JSX jest mniej ceremony.

## Częste błędy

❌ **Walidacja tylko po stronie clienta** — Server Actions MUSZĄ re-validate; client walidacja jest tylko UX
❌ **Throwing z Server Actions** — zwracaj Result type zamiast; throws psują client contract
❌ **Zapomnienie `revalidatePath`** — mutacja success, ale UI pokazuje stale dane
❌ **Placeholder jako label** — accessibility fail
❌ **`type="text"` dla wszystkiego** — używaj `email`, `tel`, `url`, `number` dla correct mobile keyboards
❌ **Brak `inputMode` na numeric fields** — desktop userzy dostają text keyboard dla numeric input
❌ **Disabled submit wygląda identycznie jak enabled** — clear visual difference
❌ **Loading state pokazuje nothing** — user klika ponownie, double-submituje
❌ **Brak error association** — error pojawia się pod input bez `aria-describedby`
❌ **Submit na Enter w textareach** — Enter powinien dodawać new line w textareas; submit przez button click lub Cmd+Enter
