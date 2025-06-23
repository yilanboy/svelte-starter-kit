<script lang="ts">
  import { inertia, page } from "@inertiajs/svelte";
  import ChevronDown from "@/components/icons/ChevronDown.svelte";
  import AlignJustify from "@/components/icons/AlignJustify.svelte";
  import { cubicOut } from "svelte/easing";
  import LogOut from "@/components/icons/LogOut.svelte";
  import type { Snippet } from "svelte";
  import { stopPropagation } from "@/helpers";
  import MobileSidebar from "@/components/layouts/main/partials/MobileSidebar.svelte";
  import DesktopSidebar from "@/components/layouts/main/partials/DesktopSidebar.svelte";
  import Settings from "@/components/icons/Settings.svelte";

  let dropdownIsOpen = $state(false);
  let sidebarIsOpen = $state(false);

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  function toggleDropdown() {
    dropdownIsOpen = !dropdownIsOpen;
  }

  function closeDropdown() {
    dropdownIsOpen = false;
  }

  function openSidebar() {
    sidebarIsOpen = true;
  }

  function scaleFromTopRight(
    node: HTMLElement,
    { delay, duration }: { delay: number; duration: number },
  ) {
    return {
      delay,
      duration,
      easing: cubicOut,
      css: (t: number) => `
        transform: scale(${0.75 + t * 0.25});
        opacity: ${t};
        transform-origin: top right;`,
    };
  }
</script>

<svelte:window onclick={closeDropdown} />

<div
  class="font-source-sans-3 relative flex min-h-screen w-full flex-col bg-zinc-50"
>
  <MobileSidebar bind:sidebarIsOpen />

  <DesktopSidebar />

  <div class="flex min-h-screen flex-col lg:pl-72">
    <div class="sticky top-0 z-40 w-full lg:mx-auto lg:max-w-7xl lg:px-8">
      <div
        class="flex h-16 items-center gap-x-4 border-b border-zinc-200 bg-zinc-50 px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none"
      >
        <button
          onclick={openSidebar}
          type="button"
          class="-m-2.5 p-2.5 text-zinc-700 lg:hidden"
        >
          <span class="sr-only">Open sidebar</span>
          <AlignJustify className="size-6" />
        </button>

        <!-- Separator -->
        <div class="h-6 w-px bg-zinc-200 lg:hidden" aria-hidden="true"></div>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex-1">
            <!-- Left side of header -->
          </div>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <!-- Separator -->
            <div
              class="hidden lg:block lg:h-6 lg:w-px lg:bg-zinc-200"
              aria-hidden="true"
            ></div>

            <!-- Profile dropdown -->
            <div class="relative">
              <button
                onclick={stopPropagation(toggleDropdown)}
                type="button"
                class="-m-1.5 flex cursor-pointer items-center p-1.5"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <div
                  class="flex size-8 items-center justify-center rounded-full bg-zinc-100 bg-zinc-200 text-zinc-900"
                >
                  {$page.props.auth.user.name.charAt(0).toUpperCase()}
                </div>
                <span class="hidden lg:flex lg:items-center">
                  <span
                    class="ml-4 text-base/6 font-semibold text-zinc-900"
                    aria-hidden="true">{$page.props.auth.user.name}</span
                  >
                  <ChevronDown className="ml-2 size-5 text-zinc-400" />
                </span>
              </button>

              <!-- Dropdown menu, show/hide based on dropdownIsOpen state. -->
              {#if dropdownIsOpen}
                <div
                  transition:scaleFromTopRight={{ delay: 0, duration: 100 }}
                  class="absolute right-0 z-10 mt-2.5 w-32 rounded-md bg-zinc-50 py-2 shadow-lg ring-1 ring-zinc-900/5 focus:outline-hidden"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <a
                    use:inertia
                    href="/settings/profile"
                    class="flex w-full items-center gap-2 px-3 py-1 text-left text-base text-zinc-900 hover:bg-zinc-100"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                  >
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </a>
                  <button
                    use:inertia={{ href: "/logout", method: "post" }}
                    type="button"
                    class="flex w-full cursor-pointer items-center gap-2 px-3 py-1 text-left text-base text-zinc-900 hover:bg-zinc-100"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                  >
                    <LogOut className="size-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>

    {@render children?.()}
  </div>
</div>
