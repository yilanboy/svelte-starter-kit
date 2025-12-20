<script lang="ts">
  import ForgotPasswordController from "@/actions/App/Http/Controllers/Auth/ForgotPasswordController";
  import { Form, page } from "@inertiajs/svelte";
  import ChevronLeft from "@/components/icons/ChevronLeft.svelte";
  import { back } from "@/helpers";
  import InputWithLabel from "@/components/forms/InputWithLabel.svelte";
  import LayoutGuest from "@/components/layouts/guest/LayoutGuest.svelte";

  let title = "Forgot Password";

  interface SlotProps {
    errors: {
      email: string;
    };
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
      Forgot Your Password?
    </h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form
        class="space-y-6"
        method="post"
        action={ForgotPasswordController.store()}
      >
        {#snippet children({ errors }: SlotProps)}
          <InputWithLabel
            label="Email address"
            id="email"
            type="email"
            name="email"
            required
          />

          {#if errors.email}
            <div class="text-red-500">{errors.email}</div>
          {/if}

          <div>
            <button
              type="submit"
              class="flex w-full cursor-pointer justify-center rounded-md bg-blue-600 px-3 py-1.5 text-base font-semibold text-zinc-50 shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Send Reset Link
            </button>
          </div>
        {/snippet}
      </Form>
    </div>
  </main>
</LayoutGuest>
