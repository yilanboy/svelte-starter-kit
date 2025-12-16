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

  function toggleSidebar() {
    sidebarIsOpen = !sidebarIsOpen;
  }

  function closeSidebar() {
    sidebarIsOpen = false;
  }

  onMount(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    // Set initial state based on screen size
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
  <Header {toggleSidebar} />

  <Sidebar
    isOpen={sidebarIsOpen}
    enableTransition={sidebarTransitionEnabled}
    {closeSidebar}
  />

  <div
    class={[
      "flex flex-col transition-all duration-300 ease-in-out",
      sidebarIsOpen ? "lg:pl-72" : "",
    ]}
  >
    <main class="flex-1">
      {@render children?.()}
    </main>
  </div>
</div>
