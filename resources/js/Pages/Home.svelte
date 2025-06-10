<script lang="ts">
  import MainLayout from "@/Components/Layouts/Main/MainLayout.svelte";

  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<MainLayout>
  <h1 class="text-4xl font-semibold">
    Welcome! This is a simple example to use Inertia.js with Svelte and Laravel
  </h1>
</MainLayout>
