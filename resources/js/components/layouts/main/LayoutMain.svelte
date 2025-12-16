<script lang="ts">
  import type { Snippet } from "svelte";
  import Sidebar from "@/components/layouts/main/partials/Sidebar.svelte";
  import Header from "@/components/layouts/main/partials/Header.svelte";
  import { onMount } from "svelte";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  let sidebarIsOpen = $state(false);
  let sidebarTransitionEnabled = $state(false);

  onMount(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    // Set the initial state based on screen size
    if (mediaQuery.matches) {
      sidebarIsOpen = true;
    }

    // Enable transitions after initial render
    setTimeout(() => {
      sidebarTransitionEnabled = true;
    }, 300);
  });
</script>

<div class="font-source-sans-3 relative min-h-screen w-full bg-zinc-50">
  <Header bind:sidebarIsOpen />

  <Sidebar
    bind:isOpen={sidebarIsOpen}
    enableTransition={sidebarTransitionEnabled}
  />

  <div
    class={{
      "lg:pl-72": sidebarIsOpen,
      "flex flex-col transition-all duration-300 ease-in-out": true,
    }}
  >
    <main class="flex-1">
      {@render children?.()}
    </main>
  </div>
</div>
