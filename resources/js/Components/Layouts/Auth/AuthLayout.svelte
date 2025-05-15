<script lang="ts">
  let { children } = $props();
</script>

<main class="h-screen bg-zinc-50">
  {@render children?.()}
</main>
