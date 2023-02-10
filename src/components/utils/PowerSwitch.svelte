<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let isKilowatt = true;
  const dispatch = createEventDispatcher();

  const handleChange = () => {
    dispatch("change", isKilowatt ? "KILOWATT" : "MEGAWATT");
  };
</script>

<div in:fade={{ duration: 300 }} class="p-4 h-full">
  <div
    class="flex flex-row justify-center gap-4 font-bold font-mono h-full w-[13rem] md:w-[27rem]"
  >
    <button
      class={isKilowatt ? "button ring-2 ring-green-500" : "button"}
      type="button"
      on:click={() => {
        isKilowatt = true;
        handleChange();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class={isKilowatt ? "text-green-500" : ""}
        ><path
          d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"
        /><line x1="23" y1="13" x2="23" y2="11" /><polyline
          points="11 6 7 12 13 12 9 18"
        /></svg
      >Kilowatt
    </button>
    <button
      class={isKilowatt ? "button" : "button ring-2 ring-blue-500"}
      type="button"
      on:click={() => {
        isKilowatt = false;
        handleChange();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class={isKilowatt ? "" : "text-blue-500"}
        ><path
          d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"
        /><line x1="23" y1="13" x2="23" y2="11" /><polyline
          points="11 6 7 12 13 12 9 18"
        /></svg
      >Megawatt
    </button>
  </div>
</div>

<style>
  .button {
    @apply flex flex-row bg-gray-200 rounded gap-2 items-center p-2 hover:bg-gray-300 w-28 md:w-32 max-w-xl h-12 justify-center;
  }
</style>
