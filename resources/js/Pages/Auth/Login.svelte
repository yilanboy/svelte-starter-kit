<script lang="ts">
  import LayoutAuth from "@/Components/Layouts/Auth/LayoutAuth.svelte";
  import { store } from "@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController";
  import { router, inertia } from "@inertiajs/svelte";

  let title = "Login";

  interface Props {
    errors: {
      email: string;
    };
  }

  let { errors }: Props = $props();

  let values = $state({
    email: "allen@example.com",
    password: "secret",
    remember: false,
  });

  function submit(event: SubmitEvent) {
    event.preventDefault();

    router.post(store.url(), values);
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<LayoutAuth>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" onsubmit={submit}>
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">
            Email address
          </label>
          <div class="mt-2">
            <input
              bind:value={values.email}
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900">Password</label
            >
            <div class="text-sm">
              <a
                use:inertia
                href="/forgot-password"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div class="mt-2">
            <input
              bind:value={values.password}
              type="password"
              name="password"
              id="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {#if errors.email}
          <div class="text-red-500">{errors.email}</div>
        {/if}

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        <a
          use:inertia
          href="/register"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Become one!
        </a>
      </p>
    </div>
  </div>
</LayoutAuth>
