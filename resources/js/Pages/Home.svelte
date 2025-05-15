<script lang="ts">
  import MainLayout from "@/Components/Layouts/Main/MainLayout.svelte";

  let { title } = $props();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<MainLayout>
  <h1 class="text-4xl font-semibold">Use Inertia.js with Svelte and Laravel</h1>
</MainLayout>
