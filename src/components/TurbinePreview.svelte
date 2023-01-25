<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Step from "../enum/Step";
  import { onMount } from "svelte";

  export let turbine = {
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
    startingDateOOCC: "",
    permittingDate: "",
    priorNotification: "",
    mailSent: false,
  };

  $: reachedStep = Step[turbine.completedSteps + 1];

  let reachedStepDate = null;
  onMount(() => {
    if (reachedStep === Step[4]) {
      reachedStepDate = turbine.priorNotification;
    } else if (reachedStep === Step[5]) {
      reachedStepDate = turbine.permittingDate;
    }
  });

  const dispatch = createEventDispatcher();

  const handleDetailsOpening = () => {
    dispatch("showDetails", turbine.id);
  };
</script>

<div class="snap-start pt-1">
  <div
    in:slide={{ duration: 1000 }}
    class="bg-gray-800 md:h-32 px-4 my-3 hover:mx-2 md:hover:mx-0 rounded-sm shadow-md content-center hover:ring-2 ring-blue-500 transition duration-300 ease-in-out transform h-auto pb-5 md:hover:h-48 hover:content-start group"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 text-white font-mono gap-4">
      <h1 class="font-bold text-4xl mt-5 col-span-1 md:col-span-2">
        {turbine.turbineName}
        {#if turbine.turbineNumber}
          <span class="hidden md:inline-block"> - {turbine.turbineNumber}</span>
        {/if}
      </h1>

      {#if reachedStep}
        <span class="col-span-2 md:col-span-1 font-bold flex"
          >{reachedStep}</span
        >
      {:else}
        <span class="col-span-2 md:col-span-1 font-bold flex">Completato</span>
      {/if}

      {#if reachedStepDate !== null && reachedStepDate !== undefined}
        <span class="col-span-2 md:col-span-1 flex md:justify-end md:mr-5"
          >{reachedStepDate}</span
        >
      {:else}
        <div class="hidden md:flex col-span-2 md:col-span-1" />
      {/if}

      <div class="col-span-2 md:col-span-1 hidden group-hover:flex gap-2">
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
          class="feather feather-map-pin col-span-1"
          ><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle
            cx="12"
            cy="10"
            r="3"
          /></svg
        >
        <span>{turbine.description}</span>
      </div>

      <!-- Manca odl number e turbineNumber su mobile -->

      {#if turbine.odlNumber !== undefined && turbine.odlNumber !== 0}
        <p class="hidden md:group-hover:flex justify-end mr-5 col-span-1">
          ODL:&nbsp;<span class="text-blue-400">{turbine.odlNumber}</span>
        </p>
      {:else}
        <div class="hidden md:flex col-span-2 md:col-span-1" />
      {/if}

      <div class="hidden group-hover:flex gap-2">
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
          class="feather feather-clipboard"
          ><path
            d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
          /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg
        >
        <span class="col-span-2 md:col-span-1 hidden group-hover:flex"
          >{turbine.operation[0]}</span
        >
      </div>

      <span
        class="col-span-2 md:col-span-1 hidden group-hover:flex md:justify-end md:mr-5 font-bold"
        >{turbine.turbineState}</span
      >
    </div>

    <div class="absolute top-0 right-0 mr-5 mt-5">
      <div class="flex flex-col md:flex-row gap-2 md:gap-0">
        <button
          class="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-sm"
          on:click|preventDefault={handleDetailsOpening}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-search"
            ><circle cx="11" cy="11" r="8" /><line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
            /></svg
          >
        </button>
      </div>
    </div>
  </div>
</div>
