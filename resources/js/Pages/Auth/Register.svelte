<script lang="ts">
  import AuthLayout from "@/Components/Layouts/Auth/AuthLayout.svelte";
  import { store } from "@/actions/App/Http/Controllers/Auth/RegisterController";
  import { router, inertia } from "@inertiajs/svelte";

  let title = "Register";

  interface Props {
    errors: {
      name?: string;
      email?: string;
      password?: string;
    };
  }

  let { errors }: Props = $props();

  let values = $state({
    name: "allen",
    email: "allen@email.com",
    password: "1qaz2wsX",
    password_confirmation: "1qaz2wsX",
  });

  function submit(event: SubmitEvent) {
    event.preventDefault();

    router.post(store.url(), values);
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<AuthLayout>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        Welcome to Join us!
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" onsubmit={submit}>
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-900">
            Name
          </label>
          <div class="mt-2">
            <input
              bind:value={values.name}
              type="text"
              name="name"
              id="name"
              required
              class="block w-full rounded-md bg-zinc-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {#if errors.name}
          <div class="text-red-500">{errors.name}</div>
        {/if}

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
              required
              class="block w-full rounded-md bg-zinc-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {#if errors.email}
          <div class="text-red-500">{errors.email}</div>
        {/if}

        <div>
          <label
            for="password"
            class="block text-sm/6 font-medium text-gray-900"
          >
            Password
          </label>
          <div class="mt-2">
            <input
              bind:value={values.password}
              type="password"
              name="password"
              id="password"
              required
              class="block w-full rounded-md bg-zinc-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {#if errors.password}
          <div class="text-red-500">{errors.password}</div>
        {/if}

        <div>
          <label
            for="password_confirmation"
            class="block text-sm/6 font-medium text-gray-900"
          >
            Confirm Password
          </label>
          <div class="mt-2">
            <input
              bind:value={values.password_confirmation}
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              required
              class="block w-full rounded-md bg-zinc-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-zinc-50 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Already have an account?
        <a
          use:inertia
          href="/login"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </a>
      </p>
    </div>
  </div>
</AuthLayout>
