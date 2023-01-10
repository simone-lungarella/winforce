<script>
  import { slide } from "svelte/transition";

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

  function redirectToTurbinePage() {
    const turbineId = 1160;
    window.location.href = `/${turbineId}/index.html`;
  }
</script>

<div
  in:slide={{ duration: 1000 }}
  class="w-full bg-gray-800 h-32 md:h-20 px-4 my-4 rounded-sm shadow-md grid grid-flow-col hover:grid-flow-row content-center hover:ring-2 ring-amber-500 transition duration-300 ease-in-out transform hover:h-48 hover:content-start group"
>
  <h1 class="text-white font-mono h-full font-bold text-4xl group-hover:mt-5">
    {turbine.turbineName}
  </h1>
  <div class="hidden group-hover:flex mt-5">
    <ul>
      <li class="text-white font-mono h-full font-bold text-xl">
        {turbine.description}
      </li>
      <li class="text-white font-mono h-full">
        {turbine.creationDate}
      </li>
    </ul>
  </div>

  <div class="absolute top-0 right-0 mr-5 md:mr-9 mt-5">
    <div class="flex flex-col md:flex-row gap-2 md:gap-0">
      <button
        class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm md:rounded-l"
        on:click|preventDefault={redirectToTurbinePage}
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
