<script lang="ts">
  import { inertia, page } from "@inertiajs/svelte";
  import ChevronDown from "@/components/icons/ChevronDown.svelte";
  import Home from "@/components/icons/Home.svelte";
  import Settings from "@/components/icons/Settings.svelte";
  import X from "@/components/icons/X.svelte";
  import AlignJustify from "@/components/icons/AlignJustify.svelte";
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  let dropdownIsOpen = $state(false);
  let sidebarIsOpen = $state(false);

  interface Props {
    title: string;
  }

  let { title }: Props = $props();

  function toggleDropdown() {
    dropdownIsOpen = !dropdownIsOpen;
  }

  function closeDropdown() {
    dropdownIsOpen = false;
  }

  function openSidebar() {
    sidebarIsOpen = true;
  }

  function closeSidebar() {
    sidebarIsOpen = false;
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

  function stopPropagation(fn: (event: Event) => void) {
    return function (this: (event: Event) => void, event: Event) {
      event.stopPropagation();
      fn.call(this, event);
    };
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<svelte:window onclick={closeDropdown} />

<div
  class="font-source-sans-3 relative flex min-h-screen w-full flex-col bg-zinc-50"
>
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  {#if sidebarIsOpen}
    <div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
      <!-- Off-canvas menu backdrop, show/hide based on off-canvas menu state. -->
      <div
        transition:fade
        class="fixed inset-0 bg-gray-900/80"
        aria-hidden="true"
      ></div>

      <div transition:fly={{ x: -200 }} class="fixed inset-0 flex">
        <!-- Off-canvas menu, show/hide based on off-canvas menu state. -->
        <div class="relative mr-16 flex w-full max-w-xs flex-1">
          <!-- Close button, show/hide based on off-canvas menu state. -->
          <div
            class="absolute top-0 left-full flex w-16 cursor-pointer justify-center pt-5"
          >
            <button onclick={closeSidebar} type="button" class="-m-2.5 p-2.5">
              <span class="sr-only">Close sidebar</span>
              <X className="size-6 text-zinc-50" />
            </button>
          </div>

          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <div
            class="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-50 px-6 pb-4"
          >
            <div class="flex h-16 shrink-0 items-center text-xl font-semibold">
              Svelte Starter Kit
            </div>

            <nav class="flex flex-1 flex-col">
              <ul role="list" class="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" class="-mx-2 space-y-1">
                    <li>
                      <!--
                      Current: "bg-zinc-100 text-blue-600",
                      Default: "text-zinc-700 hover:text-blue-600 hover:bg-zinc-100"
                      -->
                      <a
                        use:inertia
                        href="/dashboard"
                        class={{
                          "bg-zinc-100 text-blue-600":
                            $page.url === "/dashboard",
                          "text-zinc-700 hover:bg-zinc-100 hover:text-blue-600":
                            $page.url !== "/dashboard",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold": true,
                        }}
                      >
                        <Home className="size-6 shrink-0 text-blue-600" />
                        Dashboard
                      </a>
                    </li>
                  </ul>
                </li>

                <li class="mt-auto">
                  <a
                    href="#"
                    class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-blue-600"
                  >
                    <Settings
                      className="size-6 shrink-0 text-zinc-400 group-hover:text-blue-600"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Static sidebar for desktop -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-zinc-200 bg-zinc-50 px-6 pb-4"
    >
      <div class="flex h-16 shrink-0 items-center text-xl font-semibold">
        Svelte Starter Kit
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li>
                <a
                  use:inertia
                  href="/dashboard"
                  class={{
                    "bg-zinc-100 text-blue-600": $page.url === "/dashboard",
                    "text-zinc-700 hover:bg-zinc-100 hover:text-blue-600":
                      $page.url !== "/dashboard",
                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold": true,
                  }}
                >
                  <Home className="size-6 shrink-0 text-blue-600" />
                  Dashboard
                </a>
              </li>
            </ul>
          </li>

          <li class="mt-auto">
            <a
              href="#"
              class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-blue-600"
            >
              <Settings
                className="size-6 shrink-0 text-zinc-400 group-hover:text-blue-600"
              />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

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
                  <!-- Active: "bg-zinc-100 outline-hidden", Not Active: "" -->
                  <a
                    href="#"
                    onclick={(event) => event.stopPropagation()}
                    class="block px-3 py-1 text-base/6 text-zinc-900 hover:bg-zinc-100"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0">Your profile</a
                  >
                  <button
                    use:inertia={{ href: "/logout", method: "post" }}
                    onclick={(event) => event.stopPropagation()}
                    type="button"
                    class="block w-full cursor-pointer px-3 py-1 text-left text-base/6 text-zinc-900 hover:bg-zinc-100"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                  >
                    Sign out
                  </button>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>

    <main class="flex grow py-10">
      <div
        class="mx-auto grid max-w-7xl grow grid-cols-3 grid-rows-4 gap-6 px-4 sm:px-6 lg:px-8"
      >
        <div
          class="col-span-3 flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 text-6xl text-zinc-300 lg:col-span-1"
        >
          01
        </div>
        <div
          class="col-span-3 flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 text-6xl text-zinc-300 lg:col-span-1"
        >
          02
        </div>
        <div
          class="col-span-3 flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 text-6xl text-zinc-300 lg:col-span-1"
        >
          03
        </div>
        <div
          class="col-span-3 row-span-1 flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 text-6xl text-zinc-300 lg:row-span-3"
        >
          04
        </div>
        <!-- Your content -->
      </div>
    </main>
  </div>
</div>
