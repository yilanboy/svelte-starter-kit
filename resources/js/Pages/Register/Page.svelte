<script lang="ts">
  import { store } from "@/actions/App/Http/Controllers/Auth/RegisterController";
  import { inertia, useForm } from "@inertiajs/svelte";

  let title = "Register";

  const form = useForm({
    name: "allen",
    email: "allen@email.com",
    password: "Password101",
    password_confirmation: "Password101",
  });

  function submit(event: SubmitEvent) {
    event.preventDefault();

    $form.post(store.url());
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="font-source-sans-3 flex min-h-screen w-full flex-col bg-zinc-50">
  <main class="flex w-full flex-1 flex-col justify-center p-6">
    <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
      Welcome to Join us!
    </h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" onsubmit={submit}>
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-900">
            Name
          </label>
          <div class="mt-2">
            <input
              bind:value={$form.name}
              type="text"
              name="name"
              id="name"
              required
              class="block w-full rounded-md bg-zinc-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {#if $form.errors.name}
          <div class="text-red-500">{$form.errors.name}</div>
        {/if}

        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">
            Email address
          </label>
          <div class="mt-2">
            <input
              bind:value={$form.email}
              type="email"
              name="email"
              id="email"
              required
              class="block w-full rounded-md bg-zinc-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {#if $form.errors.email}
          <div class="text-red-500">{$form.errors.email}</div>
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
              bind:value={$form.password}
              type="password"
              name="password"
              id="password"
              required
              class="block w-full rounded-md bg-zinc-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {#if $form.errors.password}
          <div class="text-red-500">{$form.errors.password}</div>
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
              bind:value={$form.password_confirmation}
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
            class="flex w-full cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-zinc-50 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
  </main>
</div>
