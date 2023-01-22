<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let state = "In Marcia";

  const handleChange = () => {
    dispatch("change", state);
  };
</script>

<div in:slide={{ duration: 300, delay: 300 }} class="p-4 h-full">
  <div
    class="flex flex-row justify-center gap-4 font-bold font-mono h-full w-[13rem] md:w-[27rem]"
  >
    <button
      class={state === "In Marcia" ? "button ring-2 ring-green-500" : "button"}
      type="button"
      on:click={() => {
        state = "In Marcia";
        handleChange();
      }}
    >
      In Marcia
    </button>
    <button
      class={state === "Limitata" ? "button ring-2 ring-orange-500" : "button"}
      type="button"
      on:click={() => {
        state = "Limitata";
        handleChange();
      }}
    >
      Limitata
    </button>
    <button
      class={state === "Ferma" ? "button ring-2 ring-red-500" : "button"}
      type="button"
      on:click={() => {
        state = "Ferma";
        handleChange();
      }}
    >
      Ferma
    </button>
  </div>
</div>

<style>
  .button {
    @apply flex flex-row bg-gray-200 rounded gap-2 items-center p-2 hover:bg-gray-300 w-32 max-w-xl h-12 justify-center;
  }
</style>
