<script lang="ts">
  let { children } = $props();
</script>

<main class="font-source-sans-3 h-screen bg-zinc-50">
  {@render children?.()}
</main>
