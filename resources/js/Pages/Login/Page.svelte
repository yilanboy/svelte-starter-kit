<script lang="ts">
  import { store } from "@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController";
  import { inertia, useForm } from "@inertiajs/svelte";
  import Check from "@/Components/Icons/Check.svelte";

  let title = "Login";

  const form = useForm({
    email: "",
    password: "",
    remember: false,
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
      Sign in to your account
    </h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" onsubmit={submit}>
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
              autocomplete="email"
              required
              class="block w-full rounded-md bg-zinc-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
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
              autocomplete="current-password"
              required
              class="block w-full rounded-md bg-zinc-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
            />
          </div>
        </div>

        {#if $form.errors.password}
          <div class="text-red-500">{$form.errors.password}</div>
        {/if}

        <div class="flex items-center justify-between">
          <div class="flex gap-3">
            <div class="flex h-6 shrink-0 items-center">
              <div class="group grid size-4 grid-cols-1">
                <input
                  bind:checked={$form.remember}
                  id="remember"
                  name="remember"
                  type="checkbox"
                  class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-zinc-50 checked:border-sky-600 checked:bg-sky-600 indeterminate:border-sky-600 indeterminate:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                />

                <Check
                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center fill-zinc-50 group-has-disabled:stroke-gray-950/25"
                />
              </div>
            </div>
            <label for="remember" class="block text-sm/6 text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm/6">
            <a
              use:inertia
              href="/forgot-password"
              class="font-semibold text-sky-600 hover:text-sky-500"
              >Forgot password?</a
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full cursor-pointer justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm/6 font-semibold text-zinc-50 shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
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
          class="font-semibold text-sky-600 hover:text-sky-500"
        >
          Become one!
        </a>
      </p>
    </div>
  </main>
</div>
