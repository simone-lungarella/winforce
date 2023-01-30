<script>
  export let turbine;

  let areEventsVisible = false;
</script>

<button
  class="grid place-content-start gap-2 grid-flow-col items-center font-bold mb-3 bg-gray-600 p-3 rounded-sm
          hover:bg-gray-700 hover:shadow-sm hover:border border-blue-400 w-full"
  on:click|preventDefault={() => (areEventsVisible = !areEventsVisible)}
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
    class="feather feather-clock"
    ><circle cx="12" cy="12" r="10" /><polyline
      points="12 6 12 12 16 14"
    /></svg
  >
  <h1 class="font-mono text-xl">Tracciamento eventi</h1>
</button>
{#if areEventsVisible}
  <div class="p-2 mb-2">
    <p class="font-mono text-white text-lg">
      Inizio ATT EEMM: <span class="font-extralight"
        >{turbine.startingDateEEMM || "____/__/__"}</span
      >
    </p>
    <p class="font-mono text-white text-lg">
      Inizio ATT OOCC: <span class="font-extralight"
        >{turbine.startingDateOOCC || "____/__/__"}</span
      >
    </p>
  </div>
{/if}
