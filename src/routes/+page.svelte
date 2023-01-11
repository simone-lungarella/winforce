<script>
  import TurbinePreview from "../components/TurbinePreview.svelte";
  import { slide } from "svelte/transition";
  import { TurbineStore } from "../stores/TurbineStore.js";
  import Turbine from "../components/Turbine.svelte";

  let isDetailOpen = false;
  let turbineId = 0;
  const handleDetailOpening = (event) => {
    turbineId = event.detail;
    window.scrollTo(0, 0);
    isDetailOpen = true;
  };

  const handleDetailClosing = () => {
    isDetailOpen = false;
  };

  let searchKey = "";
  let year = new Date().getFullYear().toString();

  $: filteredTurbines = $TurbineStore.filter(
    (turbine) =>
      (turbine.description.toLowerCase().includes(searchKey.toLowerCase()) ||
        turbine.turbineName.toLowerCase().includes(searchKey.toLowerCase())) &&
      turbine.creationDate.includes(year)
  );

  $: numberOfTurbines = filteredTurbines.length;
</script>

<div transition:slide={{ duration: 200 }} class="mt-16">
  <section class="mt-5">
    <div class="flex flex-col md:flex-row gap-2">
      <input
        class="appearance-none bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm md:rounded-md focus:outline-none focus:ring-2 ring-amber-400 focus:shadow-outline"
        type="text"
        id="turbineName"
        name="turbineName"
        placeholder="Cerca"
        bind:value={searchKey}
      />
      <input
        class="appearance-none bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm md:rounded-md focus:outline-none focus:ring-2 ring-amber-400 focus:shadow-outline"
        type="text"
        id="turbineName"
        name="turbineName"
        placeholder="Anno"
        bind:value={year}
      />
      <div
        class="hidden md:flex justify-end w-full text-end text-2xl font-bold font-mono"
      >
        <div
          class="rounded-full w-20 items-center content-center place-content-center grid"
        >
          <p><span class="text-gray-200">#</span>{numberOfTurbines}</p>
        </div>
      </div>
    </div>

    <div class="h-1 w-3/4 bg-gray-800 rounded-full my-8 mx-auto" />
  </section>

  <section>
    {#each filteredTurbines as turbine (turbine.id)}
      <TurbinePreview {turbine} on:showDetails={handleDetailOpening} />
    {/each}
    {#if filteredTurbines.length === 0}
      <div class="grid place-content-center">
        <h1 class="text-white font-mono h-full font-bold text-2xl">
          Nessuna turbina trovata
        </h1>
      </div>
    {/if}

    {#if isDetailOpen}
      <Turbine {turbineId} on:closeDetails={handleDetailClosing} />
    {/if}
  </section>
</div>
