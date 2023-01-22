<script>
  import TurbinePreview from "../../components/TurbinePreview.svelte";
  import { slide } from "svelte/transition";
  import { windfarms } from "../../stores/TurbineStore.js";
  import Turbine from "../../components/Turbine.svelte";
  import EditModal from "../../components/utils/EditModal.svelte";
  import CreateModal from "../../components/utils/CreateModal.svelte";

  let isDetailOpen = false;
  let turbineId = 0;

  const handleDetailOpening = (event) => {
    turbineId = event.detail;
    isDetailOpen = true;
    isEditModelOpen = false;
  };

  const handleModalClosing = () => {
    isDetailOpen = false;
    isEditModelOpen = false;
    isCreateModelOpen = false;
  };

  let isEditModelOpen = false;
  const handleEditModalOpening = (event) => {
    turbineId = event.detail;
    isDetailOpen = false;
    isEditModelOpen = true;
  };

  let isCreateModelOpen = false;
  const handleCreateModalOpening = () => {
    isCreateModelOpen = true;
    isDetailOpen = false;
    isEditModelOpen = false;
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
      />
    </div>
  </section>

  <div class="flex flex-row justify-between items-center my-4 mx-4 md:mx-6">
    <p class="font-mono text-lg">{numberOfTurbines} risultati</p>
    <button
      class="bg-green-500 rounded p-2 ring-2 ring-gray-300 hover:bg-green-400 hover:ring-gray-200 group"
      on:click={handleCreateModalOpening}
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
        class="feather feather-plus group-hover:rotate-90 transition-all duration-300 ease-in-out"
        ><line x1="12" y1="5" x2="12" y2="19" /><line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
        /></svg
      >
    </button>
  </div>
  <section
    class="max-h-[24rem] md:max-h-[36rem] md:p-4 overflow-y-scroll overflow-x-hidden scrollbar-none snap-mandatory snap-y"
  >
    {#each filteredTurbines as turbine (turbine.id)}
      <TurbinePreview {turbine} on:showDetails={handleDetailOpening} />
    {/each}

    {#if isDetailOpen}
      <div
        class="h-full w-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm"
        on:click={handleModalClosing}
        on:keydown={handleModalClosing}
      >
        <Turbine
          {turbineId}
          on:closeDetails={handleModalClosing}
          on:editMode={handleEditModalOpening}
        />
      </div>
    {/if}
    {#if isEditModelOpen}
      <div
        class="h-full w-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm"
        on:click={handleModalClosing}
        on:keydown={handleModalClosing}
      >
        <EditModal {turbineId} on:close={() => (isEditModelOpen = false)} />
      </div>
    {/if}
    {#if isCreateModelOpen}
      <div
        class="h-full w-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm"
        on:click={handleModalClosing}
        on:keydown={handleModalClosing}
      >
        <CreateModal on:close={() => (isCreateModelOpen = false)} />
      </div>
    {/if}
  </section>
</div>
