<script>
  import { slide } from "svelte/transition";
  import { windfarms } from "../stores/TurbineStore.js";
  import { createEventDispatcher } from "svelte";
  import EventsButton from "./utils/EventsButton.svelte";
  import OperationsButton from "./utils/OperationsButton.svelte";
  import StepList from "./utils/StepList.svelte";

  export let turbineId = 0;

  let turbine = $windfarms.find((turbine) => turbine.id === turbineId);

  const dispatch = createEventDispatcher();

  const handleDetailClose = () => {
    dispatch("closeDetails");
  };

  const handleClickEvent = (event) => {
    // Stop click propagation to avoid closing the modal
    event.stopPropagation();
  };
</script>

<!-- TODO: Non smantellare flag su dettaglio, creazione e modifica -->

<div
  in:slide={{ duration: 1000 }}
  class="bg-gray-800 rounded border-2 border-gray-800 ring-2 ring-gray-400 p-4 backdrop-filter backdrop-blur-sm bg-opacity-75 text-white font-mono text-2xl 
  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 z-50 h-[32rem] overflow-y-scroll scrollbar-none md:h-auto md:min-h-[28rem]"
  on:click={handleClickEvent}
  on:keydown={handleClickEvent}
>
  <div class="w-full h-20 grid grid-cols-2 items-start">
    <h1 class="font-mono font-bold text-2xl md:text-4xl">
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

  <div class="w-full grid grid-cols-1 md:grid-cols-2 items-start">
    <div class="col-span-1">
      <p class="prose font-mono text-white">
        Creazione: <span>
          {turbine.creationDate.slice(0, 10).split("-").join("/")}
        </span>
      </p>
      <p class="prose font-mono text-white">
        Stato turbina: <span>{turbine.turbineState}</span>
      </p>
      <div class="w-full md:w-3/4 mt-5">
        <EventsButton {turbine} />
        <OperationsButton {turbine} />
      </div>
    </div>
    <StepList {turbine} />
  </div>
</div>
