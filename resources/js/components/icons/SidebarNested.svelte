<script lang="ts">
  interface Props {
    isExpanded: boolean;
    className?: string;
  }

  let { isExpanded = $bindable(false), className = "size-6" }: Props = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  class={className}
  viewBox="0 0 16 16"
>
  <path
    d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z"
  />
  <path
    class="transition-all duration-300 ease-in-out"
    d={isExpanded
      ? "M2 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"
      : "M2 4a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"}
  />
</svg>
