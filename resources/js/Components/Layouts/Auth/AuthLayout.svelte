<script lang="ts">
  import { inertia } from "@inertiajs/svelte";
  import ArrowLeftShort from "@/Components/Icons/ArrowLeftShort.svelte";

  let { children } = $props();
</script>

<main class="font-source-sans-3 relative h-screen bg-zinc-50">
  <a class="absolute top-2 left-2" href="/" use:inertia>
    <ArrowLeftShort className="size-12" />
  </a>

  {@render children?.()}
</main>
