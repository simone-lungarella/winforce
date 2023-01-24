<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let operations = [];

  const dispatch = createEventDispatcher();

  const confirm = () => {
    dispatch("confirm", operations);
  };

  const cancel = () => {
    dispatch("cancel");
  };
</script>

<div
  in:slide={{ duration: 300 }}
  class="bg-gray-800 rounded border-2 border-gray-800 ring-2 ring-gray-500 p-4 overflow-y-hidden w-80 md:w-96
    backdrop-filter backdrop-blur-md bg-opacity-75 text-white font-mono absolute top-16 transform left-1/2 -translate-x-1/2 z-50"
  on:click|stopPropagation
  on:keydown|stopPropagation
>
  <div
    class="grid grid-cols-1 gap-2 h-96 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
  >
    {#each operations as operation (operation.name)}
      <div class="flex flex-row gap-4">
        <input
          class="checkbox"
          checked={operation.isSelected}
          type="checkbox"
          on:change={(event) => {
            operation.isSelected = event.target.checked;
          }}
        />
        <p class="font-mono">{operation.name}</p>
      </div>
    {/each}
  </div>

  <div class="flex flex-row mt-5 gap-2 justify-center">
    <button
      class="font-bold font-mono bg-green-500 hover:bg-green-600 py-2 px-4 rounded w-24"
      on:click|stopPropagation={confirm}>Conferma</button
    >

    <button
      class="font-bold font-mono bg-red-500 hover:bg-red-600 py-2 px-4 rounded w-24"
      on:click|stopPropagation={cancel}>Chiudi</button
    >
  </div>
</div>
