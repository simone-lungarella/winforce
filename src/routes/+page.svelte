<script>
  import TurbinePreview from "../components/TurbinePreview.svelte";
  import { slide } from "svelte/transition";
  import { windfarms, remove } from "../stores/TurbineStore.js";
  import Turbine from "../components/Turbine.svelte";
  import DeletionModal from "../components/utils/DeletionModal.svelte";

  let isDetailOpen = false;
  let turbineId = 0;

  const handleDetailOpening = (event) => {
    turbineId = event.detail;
    isDetailOpen = true;
  };

  let isDeletionModalOpen = false;
  const handleDeletion = () => {
    isDeletionModalOpen = false;
    remove(turbineId);
  };

  const handleDetailClosing = () => {
    isDetailOpen = false;
  };

  let searchKey = "";
  let year = new Date().getFullYear().toString();

  $: filteredTurbines = $windfarms.filter(
    (turbine) =>
      (turbine.description.toLowerCase().includes(searchKey.toLowerCase()) ||
        turbine.turbineName.toLowerCase().includes(searchKey.toLowerCase()) ||
        turbine.turbineNumber
          .toLowerCase()
          .includes(searchKey.toLowerCase())) &&
      turbine.creationDate.includes(year)
  );

  $: numberOfTurbines = filteredTurbines.length;
</script>

<div transition:slide={{ duration: 200 }} class="md:mt-16">
  <section class="mt-5 md:ml-5">
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

  <section
    class="overflow-y-scroll overflow-x-hidden max-h-[24rem] md:max-h-[36rem] md:p-4 scrollbar-none"
  >
    {#each filteredTurbines as turbine (turbine.id)}
      <TurbinePreview
        {turbine}
        on:showDetails={handleDetailOpening}
        on:deleteTurbine={(event) => {
          turbineId = event.detail;
          isDeletionModalOpen = true;
        }}
      />
    {/each}
    {#if filteredTurbines.length === 0}
      <div class="grid place-content-center">
        <h1 class="text-white font-mono h-full font-bold text-2xl">
          Nessuna turbina trovata
        </h1>
      </div>
    {/if}

    {#if isDetailOpen}
      <div
        class="h-full w-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm"
        on:click={handleDetailClosing}
        on:keydown={handleDetailClosing}
      >
        <Turbine {turbineId} on:closeDetails={handleDetailClosing} />
      </div>
    {/if}
    {#if isDeletionModalOpen}
      <div
        class="h-full w-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm"
        on:click={() => {
          isDeletionModalOpen = false;
        }}
        on:keydown={() => {
          isDeletionModalOpen = false;
        }}
      >
        <DeletionModal
          on:confirm={handleDeletion}
          on:cancel={() => {
            isDeletionModalOpen = false;
          }}
        />
      </div>
    {/if}
  </section>
</div>
