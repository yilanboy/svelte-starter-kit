<script lang="ts">
  import { inertia, page } from "@inertiajs/svelte";

  let title = "Verify Email";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="font-source-sans-3 flex min-h-screen w-full flex-col bg-zinc-50">
  <main class="flex w-full grow flex-col items-center justify-center p-6">
    <h1 class="text-4xl font-semibold">
      Please check your email to verify your account. 😊
    </h1>

    <button
      use:inertia={{ href: "/email/verify", method: "post" }}
      type="button"
      class="mt-6 cursor-pointer text-xl hover:underline"
    >
      Resend
    </button>

    {#if $page.props.flash.message}
      <div class="text-green-500">{$page.props.flash.message}</div>
    {/if}
  </main>
</div>
