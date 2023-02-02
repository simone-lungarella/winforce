<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Step from "../enum/Step";
  import CompletionBar from "./utils/CompletionBar.svelte";

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

  $: reachedStep = turbine.creationDate.includes("2022")
    ? Step[turbine.completedSteps + 2]
    : Step[turbine.completedSteps + 1];

  $: reachedStepDate =
    reachedStep === Step[3]
      ? turbine.priorNotification
      : reachedStep === Step[4]
      ? turbine.permittingDate
      : null;

  // Expiring date is permittingDate + 90 days formatted in dd-MM-yyyy
  $: expiringDate = turbine.permittingDate
    ? new Date(
        new Date(turbine.permittingDate).getTime() + 90 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("it-IT")
    : null;

  $: mainOperation = turbine.operation[0]
    ? turbine.operation[0].length > 16
      ? turbine.operation[0].substring(0, 14) + "..."
      : turbine.operation[0]
    : "";

  const dispatch = createEventDispatcher();

  const handleDetailsOpening = () => {
    dispatch("showDetails", turbine.id);
  };

  let tooltipOperation = false;
</script>

<div class="snap-start pt-1">
  <div
    in:slide={{ duration: 1000 }}
    class="bg-gray-800 px-4 my-2 mx-2 md:mx-0 rounded-sm shadow-md hover:ring-2 ring-blue-500 transition duration-300 ease-in-out transform h-auto md:h-56 pb-5 content-start group"
  >
    <div class="grid grid-cols-1 text-white font-mono gap-3">
      <h1 class="font-bold text-4xl mt-3 col-span-1 md:col-span-2">
        {turbine.turbineName}
        {#if turbine.turbineNumber}
          <span class="hidden md:inline-block"> - {turbine.turbineNumber}</span>
        {/if}
      </h1>

      <div class="col-span-1 md:col-span-2">
        <CompletionBar
          completedSteps={turbine.completedSteps}
          creationDate={turbine.creationDate}
        />
      </div>
      <div class="col-span-1" />

      <!-- {#if reachedStepDate !== null && reachedStepDate !== undefined}
        <span class="flex md:justify-end md:mr-5">{reachedStepDate}</span>
      {:else} -->
      <div class="hidden md:flex" />
      <!-- {/if} -->

      <div class="flex gap-2 md:-mb-2">
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
          class="feather feather-map-pin"
          ><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle
            cx="12"
            cy="10"
            r="3"
          /></svg
        >
        <span>{turbine.description}</span>
      </div>

      {#if turbine.odlNumber !== undefined && turbine.odlNumber !== 0}
        <p class="flex md:justify-end">
          ODL:&nbsp;<span class="text-blue-400">{turbine.odlNumber}</span>
        </p>
      {:else}
        <div class="hidden md:flex col-span-2" />
      {/if}

      <div
        class="flex gap-2"
        on:mouseover={() => (tooltipOperation = true)}
        on:focus={() => (tooltipOperation = true)}
        on:mouseleave={() => (tooltipOperation = false)}
        on:focusout={() => (tooltipOperation = false)}
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
          class="feather feather-clipboard"
          ><path
            d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
          /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg
        >
        {#if tooltipOperation}
          <div
            on:mouseover={() => (tooltipOperation = true)}
            on:focus={() => (tooltipOperation = true)}
            on:mouseleave={() => (tooltipOperation = false)}
            on:focusout={() => (tooltipOperation = false)}
            class="absolute z-10 bg-gray-400 text-white rounded-sm shadow-md p-2 left-10 cursor-default"
          >
            <p>{turbine.operation[0]}</p>
          </div>
        {/if}

        <span class="flex select-none">{mainOperation} </span>
      </div>

      <span class="flex md:justify-end font-bold">{turbine.turbineState}</span>
      <span class="font-mono hidden md:flex">Scadenza cantiere: </span>
      <span class="font-mono flex md:hidden"
        >Scadenza: {expiringDate || "N/A"}</span
      >
      {#if expiringDate}
        <span class="hidden md:flex font-mono font-bold text-end"
          >{expiringDate}</span
        >
      {:else}
        <span class="hidden md:flex font-mono font-bold text-end"
          >Non disponibile</span
        >
      {/if}
    </div>

    <div class="absolute top-0 right-0 mr-2 mt-2">
      <div class="flex flex-col md:flex-row gap-2 md:gap-0">
        <button
          class="py-2 px-2 hover:bg-gray-400 rounded-full group"
          on:click|preventDefault={handleDetailsOpening}
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
            class="feather feather-maximize-2 group-hover:rotate-90 transition-all duration-300 ease-in-out"
            ><polyline points="15 3 21 3 21 9" /><polyline
              points="9 21 3 21 3 15"
            /><line x1="21" y1="3" x2="14" y2="10" /><line
              x1="3"
              y1="21"
              x2="10"
              y2="14"
            /></svg
          >
        </button>
      </div>
    </div>
  </div>
</div>
