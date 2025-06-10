<script lang="ts">
  import { inertia } from "@inertiajs/svelte";

  let { children } = $props();
</script>

<main
  class="relative flex h-screen w-full flex-col items-center justify-center"
>
  <header
    class="absolute top-0 top-0 left-0 flex h-20 w-full items-center justify-end gap-6 p-4 text-lg"
  >
    <a
      use:inertia
      href="/login"
      class="transition duration-150 hover:text-gray-600"
    >
      Login
    </a>

    <a
      use:inertia
      href="/register"
      class="transition duration-150 hover:text-gray-600"
    >
      Register
    </a>
  </header>

  {@render children?.()}
</main>
