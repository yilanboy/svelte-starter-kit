<script lang="ts">
  import RegisterController from "@/actions/App/Http/Controllers/Auth/RegisterController";
  import AuthenticatedSessionController from "@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController";
  import { inertia, Form } from "@inertiajs/svelte";
  import ChevronLeft from "@/components/icons/ChevronLeft.svelte";
  import { back } from "@/helpers";
  import InputWithLabel from "@/components/forms/InputWithLabel.svelte";
  import LayoutGuest from "@/components/layouts/guest/LayoutGuest.svelte";

  let title = "Register";

  interface SlotProps {
    errors: {
      name: string;
      email: string;
      password: string;
    };
  }

  function handleSuccess() {
    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: {
          type: "success",
          message: "Account created",
          description: "You're all set — welcome aboard!",
          position: "top-right",
        },
      }),
    );
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<LayoutGuest>
  <header class="flex w-full items-center justify-start p-4">
    <button
      type="button"
      onclick={back}
      class="flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition duration-150 hover:bg-zinc-100"
    >
      <ChevronLeft className="size-4" />
      <span class="text-lg">Go back</span>
    </button>
  </header>

  <main class="flex w-full grow flex-col justify-center p-6">
    <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
      Welcome to Join us!
    </h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form
        class="space-y-6"
        method="post"
        action={RegisterController.store()}
        onSuccess={handleSuccess}
      >
        {#snippet children({ errors }: SlotProps)}
          <InputWithLabel label="Name" id="name" name="name" required />

          {#if errors.name}
            <div class="text-red-500">{errors.name}</div>
          {/if}

          <InputWithLabel
            label="Email"
            id="email"
            name="email"
            type="email"
            required
          />

          {#if errors.email}
            <div class="text-red-500">{errors.email}</div>
          {/if}

          <InputWithLabel
            label="Password"
            id="password"
            name="password"
            type="password"
            required
          />

          {#if errors.password}
            <div class="text-red-500">{errors.password}</div>
          {/if}

          <InputWithLabel
            label="Confirm Password"
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required
          />

          <div>
            <button
              type="submit"
              class="flex w-full cursor-pointer justify-center rounded-md bg-blue-600 px-3 py-1.5 text-base font-semibold text-zinc-50 shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign Up
            </button>
          </div>
        {/snippet}
      </Form>

      <p class="mt-10 text-center text-base text-gray-500">
        Already have an account?
        <a
          use:inertia
          href={AuthenticatedSessionController.create().url}
          class="font-semibold text-blue-600 hover:text-blue-500"
        >
          Sign in
        </a>
      </p>
    </div>
  </main>
</LayoutGuest>
