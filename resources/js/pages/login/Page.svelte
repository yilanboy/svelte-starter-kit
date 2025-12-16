<script lang="ts">
  import AuthenticatedSessionController from "@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController";
  import RegisterController from "@/actions/App/Http/Controllers/Auth/RegisterController";
  import ForgotPasswordController from "@/actions/App/Http/Controllers/Auth/ForgotPasswordController";
  import { Form, inertia, Link } from "@inertiajs/svelte";
  import ChevronLeft from "@/components/icons/ChevronLeft.svelte";
  import { back } from "@/helpers";
  import InputWithLabel from "@/components/forms/InputWithLabel.svelte";
  import LayoutGuest from "@/components/layouts/guest/LayoutGuest.svelte";
  import CheckboxWithLabel from "@/components/forms/CheckboxWithLabel.svelte";

  interface FormSlotProps {
    errors: Record<string, string>;
    invalid: (field: string) => boolean;
    validate: (field: string) => void;
  }

  function handleSuccess() {
    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: {
          type: "success",
          message: "Welcome back",
          description: "Signed in successfully",
          position: "top-right",
        },
      }),
    );
  }

  let title = "Login";
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
    <h2 class="text-center text-2xl font-bold tracking-tight text-gray-900">
      Sign in to your account
    </h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form
        class="space-y-6"
        method="post"
        action={AuthenticatedSessionController.store()}
        onSuccess={handleSuccess}
      >
        {#snippet children({ errors, invalid, validate }: FormSlotProps)}
          <InputWithLabel
            label="Email address"
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            required
            onchange={() => validate("email")}
          />

          {#if invalid("email")}
            <div class="text-red-500">{errors.email}</div>
          {/if}

          <InputWithLabel
            label="Password"
            type="password"
            name="password"
            id="password"
            autocomplete="current-password"
            required
            onchange={() => validate("password")}
          />

          {#if invalid("password")}
            <div class="text-red-500">{errors.password}</div>
          {/if}

          <div class="flex items-center justify-between">
            <CheckboxWithLabel
              label="Remember me"
              id="remember"
              name="remember"
            />

            <div class="text-base">
              <a
                use:inertia
                href={ForgotPasswordController.create().url}
                class="font-semibold text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full cursor-pointer justify-center rounded-md bg-blue-600 px-3 py-1.5 text-base font-semibold text-zinc-50 shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign in
            </button>
          </div>
        {/snippet}
      </Form>

      <p class="mt-10 text-center text-base text-gray-500">
        Not a member?
        <Link
          href={RegisterController.create().url}
          class="font-semibold text-blue-600 hover:text-blue-500"
          viewTransition
        >
          Become one!
        </Link>
      </p>
    </div>
  </main>
</LayoutGuest>
