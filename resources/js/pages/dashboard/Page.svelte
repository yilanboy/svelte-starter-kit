<script lang="ts">
  import { inertia, page } from "@inertiajs/svelte";

  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="font-source-sans-3 flex min-h-screen w-full flex-col bg-zinc-50">
  <header class="flex w-full items-center justify-end gap-6 p-6">
    <span class="text-lg">
      Hello! {$page.props.auth.user.name}
    </span>
    <button
      use:inertia={{ href: "/logout", method: "post" }}
      type="button"
      class="cursor-pointer text-lg transition duration-150 hover:text-gray-600"
    >
      Logout
    </button>
  </header>

  <main class="flex w-full grow flex-col items-center justify-center p-6">
    <h1 class="text-4xl font-semibold">This is a dashboard page.</h1>
  </main>
</div>
