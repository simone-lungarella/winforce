<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const confirm = () => {
    dispatch("confirm");
  };

  const cancel = () => {
    dispatch("cancel");
  };
</script>

<div
  in:slide={{ duration: 300 }}
  class="bg-gray-800 rounded border-2 border-gray-800 ring-2 ring-gray-500 p-4
    backdrop-filter backdrop-blur-md bg-opacity-75 text-white font-mono absolute w-5/6 md:w-1/2 top-0 transform translate-y-1/2 left-1/2 -translate-x-1/2 z-50"
>
  <p class="font-bold text-xl">
    L'eliminazione è irreversibile, sei sicuro di voler procedere?
  </p>

  <div class="flex justify-end mt-5">
    <button
      class="bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
      on:click={cancel}>Annulla</button
    >

    <button
      class="bg-green-500 hover:bg-green-600 py-2 px-4 rounded ml-2"
      on:click={confirm}>Conferma</button
    >
  </div>
</div>
