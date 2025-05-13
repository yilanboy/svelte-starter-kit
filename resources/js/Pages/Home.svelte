<script lang="ts">
  import LayoutMain from "@/Components/Layouts/Main/LayoutMain.svelte";

  let { title } = $props();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<LayoutMain>
  <h1 class="text-4xl font-semibold">Use Inertia.js with Svelte and Laravel</h1>
</LayoutMain>
