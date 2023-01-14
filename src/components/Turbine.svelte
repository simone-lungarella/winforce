<script>
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { windfarms } from "../stores/TurbineStore.js";
  import { createEventDispatcher } from "svelte";
  import { steps } from "../stores/StepStore.js";

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

    // Get stepsContainer div and set its height to view the reached step
    const stepsContainer = document.getElementById("stepsContainer");

    if (stepsContainer) {
      setTimeout(() => {
        stepsContainer.scrollTo({
          top: (stepsContainer.scrollHeight / 8) * turbine.completedSteps,
          behavior: "smooth",
        });
      }, 1500);
    }
  });

  const dispatch = createEventDispatcher();

  const handleDetailClose = () => {
    dispatch("closeDetails");
  };

  const handleClickEvent = (event) => {
    // Stop click propagation to avoid closing the modal
    event.stopPropagation();
  };

  let reachedStep = $steps[turbine.completedSteps + 1];
</script>

<!-- TODO: Non smantellare flag su dettaglio, creazione e modifica -->

<div
  in:slide={{ duration: 1000 }}
  class="bg-gray-800 rounded border-2 border-gray-800 ring-2 ring-amber-500 p-4 backdrop-filter backdrop-blur-sm bg-opacity-75 text-white font-mono text-2xl 
  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 z-50 md:min-w-min"
  on:click={handleClickEvent}
  on:keydown={handleClickEvent}
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

  <div class="w-full grid grid-cols-1 md:grid-cols-5 items-start">
    <div class="col-span-3">
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
    <div class="col-span-2 text-white">
      <!-- Visualization of reached step and all steps -->
      <h1 class="text-center font-mono font-bold text-xl mb-3 mt-5 md:mt-0">
        Tracciamento fasi
      </h1>

      <div
        in:slide={{ delay: 400, duration: 1000 }}
        id="stepsContainer"
        class="grid grid-cols-7 p-5 text-lg text-left overflow-scroll h-32 md:h-64 gap-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 bg-gray-800/70 border-2 border-gray-500 rounded-sm mt-5 items-center"
      >
        {#each $steps as step (step.id)}
          <div
            class="col-span-7 relative grid grid-cols-7 hover:bg-gray-700/60 transition duration-500 ease-in-out p-3 hover:border hover:shadow-md hover:border-amber-200 items-center rounded-sm"
          >
            <input
              type="checkbox"
              class="col-span-1 h-5 w-5 text-amber-600 border-gray-300 rounded accent-amber-400"
              disabled={step.name !== reachedStep.name}
              checked={step.complete}
            />
            <div class="col-span-6 text-left">
              <p>
                {step.name}
              </p>
            </div>
            {#if step.complete}
              <div
                in:slide={{ delay: 1200, duration: 1000 }}
                class="absolute h-full w-full bg-gray-600 bg-opacity-70 flex items-center justify-end p-5 rounded-sm hover:text-amber-400"
              >
                <p class="font-bold uppercase">Completato</p>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
