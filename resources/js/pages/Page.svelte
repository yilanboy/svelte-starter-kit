<script lang="ts">
  import AuthenticatedSessionController from "@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController";
  import RegisterController from "@/actions/App/Http/Controllers/Auth/RegisterController";
  import Laravel from "@/components/icons/Laravel.svelte";
  import X from "@/components/icons/X.svelte";
  import Menu from "@/components/icons/Menu.svelte";
  import { Link } from "@inertiajs/svelte";
  import LayoutGuest from "@/components/layouts/guest/LayoutGuest.svelte";

  interface Props {
    title: string;
  }

  let { title }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<LayoutGuest>
  <header class="absolute inset-x-0 top-0 z-50">
    <nav
      aria-label="Global"
      class="flex items-center justify-between p-6 lg:px-8"
    >
      <div class="flex lg:flex-1">
        <Link href="/" class="-m-1.5 p-1.5" viewTransition>
          <span class="sr-only">Your Website</span>
          <Laravel className="size-8" />
        </Link>
      </div>
      <div class="flex flex-1 items-center justify-end gap-x-6">
        <Link
          href={AuthenticatedSessionController.create().url}
          class="hidden text-sm/6 font-semibold text-gray-900 lg:block"
          viewTransition
        >
          Log in
        </Link>
        <Link
          href={RegisterController.create().url}
          class="hidden rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:block"
          viewTransition
        >
          Sign up
        </Link>
      </div>

      <div class="flex lg:hidden">
        <button
          type="button"
          command="show-modal"
          commandfor="mobile-menu"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span class="sr-only">Open main menu</span>
          <Menu />
        </button>
      </div>
    </nav>

    <!-- Mobile menu, show/hide based on menu state. -->
    <el-dialog>
      <dialog id="mobile-menu" class="backdrop:bg-transparent lg:hidden">
        <div class="fixed inset-0 focus:outline-none">
          <el-dialog-panel
            class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div class="flex items-center gap-x-6">
              <a href="/" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Website</span>
                <Laravel className="size-8" />
              </a>
              <a
                href="/register"
                class="ml-auto rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign up
              </a>
              <button
                type="button"
                command="close"
                commandfor="mobile-menu"
                class="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span class="sr-only">Close menu</span>
                <X />
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <a
                    href="/dashboard"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Dashboard
                  </a>
                </div>
                <div class="py-6">
                  <a
                    href="/login"
                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >Log in</a
                  >
                </div>
              </div>
            </div>
          </el-dialog-panel>
        </div>
      </dialog>
    </el-dialog>
  </header>

  <!-- Hero section -->
  <div class="relative isolate px-6 pt-14 lg:px-8">
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div class="text-center">
        <h1
          class="flex flex-col text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl"
        >
          <span>A simple starter kit</span>
          <span>with Svelte and Laravel</span>
        </h1>
        <p
          class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
        >
          A minimal, modern starter kit built with Laravel and Svelte.
        </p>
        <p class="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Perfect for your next project.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={RegisterController.create().url}
            class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            viewTransition
          >
            Get started
          </Link>
          <a
            href="https://github.com/yilanboy/svelte-starter-kit"
            class="text-sm/6 font-semibold text-gray-900"
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</LayoutGuest>
