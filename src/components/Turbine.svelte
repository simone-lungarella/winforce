<script>
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { windfarms } from "../stores/TurbineStore.js";
  import { createEventDispatcher } from "svelte";

  export let turbineId = 0;
  let turbine = {
    id: 0,
    turbineName: "",
    turbineNumber: "",
    description: "",
    odlNumber: 0,
    power: "KILOWATT",
    operation: [],
    creationDate: "",
    turbineState: "",
    completedSteps: 0,
    startingDateEEMM: "",
    startingDateOOCC: "",
    priorNotification: "",
    mailSent: false,
  };

  onMount(() => {
    windfarms.subscribe((turbines) => {
      turbine = turbines.find((turbine) => turbine.id === turbineId);
    });
  });

  const dispatch = createEventDispatcher();

  const handleDetailClose = () => {
    dispatch("closeDetails");
  };
</script>

<!-- TODO: Non smantellare flag su dettaglio, creazione e modifica -->

<div
  in:slide={{ duration: 1000 }}
  class="bg-gray-800 rounded border-2 border-gray-800 ring-2 ring-amber-500 p-4 backdrop-filter backdrop-blur-sm bg-opacity-75 text-white font-mono text-2xl 
  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-1/2"
>
  <div class="w-full h-20 grid grid-cols-2 items-start">
    <h1 class="font-mono font-bold text-4xl">
      {turbine.turbineName} -
      <span>{turbine.turbineNumber}</span>
    </h1>
    <div class="flex justify-end">
      <button
        class="text-red-500 font-bold py-2 px-4 hover:scale-110 hover:shadow-sm"
        on:click={handleDetailClose}
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
          class="feather feather-x"
          ><line x1="18" y1="6" x2="6" y2="18" /><line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
          /></svg
        >
      </button>
    </div>
  </div>

  <div class="w-full grid grid-cols-1 md:grid-cols-3 items-start">
    <div class="col-span-2">
      <p class="prose font-mono text-white">
        Creazione: <span>{turbine.creationDate}</span>
      </p>
      <p class="prose font-mono text-white">
        Stato turbina: <span>{turbine.turbineState}</span>
      </p>
      <div class="w-full md:w-3/4 border rounded-sm mt-5 p-4 bg-gray-700">
        <h1 class="font-mono font-bold text-xl mb-3">Tracciamento eventi</h1>
        <p class="prose font-mono text-white">
          Invio notifica: <span class="font-extralight"
            >{turbine.priorNotification || "____/__/__"}</span
          >
        </p>
        <p class="prose font-mono text-white">
          Inizio ATT EEMM: <span class="font-extralight"
            >{turbine.startingDateEEMM || "____/__/__"}</span
          >
        </p>
        <p class="prose font-mono text-white">
          Inizio ATT OOCC: <span class="font-extralight"
            >{turbine.startingDateOOCC || "____/__/__"}</span
          >
        </p>
      </div>
      <p class="prose font-mono text-white mt-5">Operazioni:</p>
      <ul class="mt-2">
        {#each turbine.operation as operation}
          <li class="text-sm list-disc ml-5 font-bold uppercase">
            {operation}
          </li>
        {/each}
      </ul>
    </div>
    <div class="col-span-1 h-full border" />
    <!-- TODO: Steps -->
  </div>
</div>
