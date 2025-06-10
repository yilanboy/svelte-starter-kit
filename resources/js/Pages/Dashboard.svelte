<script lang="ts">
  import { Link } from "@inertiajs/svelte";

  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="flex h-screen items-center justify-center">
  <header
    class="absolute top-0 top-0 left-0 flex h-20 w-full items-center justify-end gap-6 p-4 text-lg"
  >
    <Link
      href="/logout"
      method="post"
      as="button"
      class="cursor-pointer transition duration-150 hover:text-gray-600"
    >
      Logout
    </Link>
  </header>

  <h1 class="text-4xl font-semibold">This is a dashboard page</h1>
</div>
