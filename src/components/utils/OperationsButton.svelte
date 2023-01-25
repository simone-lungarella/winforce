<script>
  export let turbine;

  let areOperationsVisible = false;
</script>

<button
  class="grid place-content-start gap-2 grid-flow-col items-center font-bold mb-3 bg-gray-600 p-3 rounded-sm
          hover:bg-gray-700 hover:shadow-sm hover:border border-blue-400 w-full"
  on:click|preventDefault={() => (areOperationsVisible = !areOperationsVisible)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-tool"
    ><path
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
    /></svg
  >
  <h1 class="font-mono text-xl">Operazioni</h1>
</button>
{#if areOperationsVisible}
  <div class="p-2">
    <ul class="prose font-mono text-white">
      {#each turbine.operation as operation}
        <li class="text-sm list-disc ml-5 font-bold uppercase">
          {operation}
        </li>
      {/each}
    </ul>
  </div>
{/if}
