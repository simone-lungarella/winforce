<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

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
    mailSent: false,
  };

  const dispatch = createEventDispatcher();

  const handleDetailsOpening = () => {
    dispatch("showDetails", turbine.id);
  };
</script>

<div
  in:slide={{ duration: 1000 }}
  class="w-full bg-gray-800 h-32 md:h-20 px-4 my-4 rounded-sm shadow-md content-center hover:ring-2 ring-amber-500 transition duration-300 ease-in-out transform hover:h-64 md:hover:h-48 hover:content-start group"
>
  <grid class="grid grid-cols-1 md:grid-cols-2 text-white font-mono gap-4">
    <h1 class="font-bold text-4xl mt-5 col-span-2">
      {turbine.turbineName}
    </h1>

    <span class="col-span-2 md:col-span-1 font-bold hidden group-hover:flex"
      >{turbine.description}</span
    >

    <span
      class="col-span-2 md:col-span-1 hidden group-hover:flex md:justify-end md:mr-5"
      >{turbine.creationDate}</span
    >

    <span class="col-span-2 md:col-span-1 hidden group-hover:flex"
      >{turbine.turbineState}</span
    >

    {#if turbine.odlNumber !== 0}
      <p class="hidden group-hover:flex md:justify-end md:mr-5">
        <span class="text-amber-400">ODL: </span>
        {turbine.odlNumber}
      </p>
    {/if}
  </grid>

  <div class="absolute top-0 right-0 mr-5 md:mr-9 mt-5">
    <div class="flex flex-col md:flex-row gap-2 md:gap-0">
      <button
        class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm md:rounded-l"
        on:click|preventDefault={handleDetailsOpening}
      >
        Ispeziona
      </button>
      <button
        class="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-sm md:rounded-r"
      >
        Elimina
      </button>
    </div>
  </div>
</div>
