<script>
  import TurbinePreview from "../../components/TurbinePreview.svelte";
  import { slide } from "svelte/transition";
  import {
    getWindfarms,
    getExportData,
  } from "../../services/TurbineService.js";
  import Turbine from "../../components/Turbine.svelte";
  import EditModal from "../../components/utils/EditModal.svelte";
  import CreateModal from "../../components/utils/CreateModal.svelte";
  import { onMount, tick } from "svelte";

  let isDetailOpen = false;
  let turbine = {};

  /**
   * @type {any[]}
   */
  let loadedWindfarms = [];

  onMount(() => {
    getWindfarms().then((data) => {
      loadedWindfarms = data;
    });
  });

  const handleDetailOpening = (event) => {
    const turbineId = event.detail;
    turbine = loadedWindfarms.find((turbine) => turbine.id === turbineId);

    isDetailOpen = true;
    isEditModelOpen = false;
  };

  const handleModalClosing = () => {
    // Update windfarms, might have been changed some steps
    getWindfarms().then((data) => {
      loadedWindfarms = data;
      isDetailOpen = false;
    });
  };

  const handleDeletion = () => {
    isDetailOpen = false;

    getWindfarms().then((data) => {
      loadedWindfarms = data;
    });
  };

  let isEditModelOpen = false;
  const handleEditModalOpening = (event) => {
    const turbineId = event.detail;
    turbine = loadedWindfarms.find((turbine) => turbine.id === turbineId);

    isDetailOpen = false;
    isEditModelOpen = true;
  };

  let isCreateModelOpen = false;
  const handleCreateModalOpening = () => {
    isCreateModelOpen = true;
    isDetailOpen = false;
    isEditModelOpen = false;
  };

  const handleCreation = () => {
    isCreateModelOpen = false;
    isDetailOpen = false;
    isEditModelOpen = false;

    // Update windfarms, might have been changed
    getWindfarms().then((data) => {
      console.log("Updating with: ", data);
      loadedWindfarms = data;
    });
  };

  const handleUpdate = () => {
    // Update windfarms, might have been changed
    getWindfarms().then((data) => {
      loadedWindfarms = data;
      isEditModelOpen = false;
    });
  };

  const downloadCsv = () => {
    if (loadedWindfarms.length > 0) {
      getExportData().then((response) => {
        const blob = new Blob([response.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "export.csv";
        link.click();
      });
    }
  };

  let searchKey = "";
  let year = new Date().getFullYear().toString();

  $: filteredTurbines = loadedWindfarms.filter(
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
        class="appearance-none bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm md:rounded-md focus:outline-none focus:ring-2 ring-blue-400 focus:shadow-outline"
        type="text"
        id="turbineName"
        name="turbineName"
        placeholder="Cerca"
        bind:value={searchKey}
      />
      <input
        class="appearance-none bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm md:rounded-md focus:outline-none focus:ring-2 ring-blue-400 focus:shadow-outline"
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

  <div
    class="flex flex-row justify-between items-center mt-6 mb-4 mx-1 md:mx-6"
  >
    <p class="font-mono text-lg">{numberOfTurbines} risultati</p>
    <div class="justify-end flex flex-row gap-4">
      <button
        class="bg-blue-500 rounded p-2 ring-2 ring-gray-300 hover:bg-blue-400 hover:ring-gray-200 group
        disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loadedWindfarms.length === 0}
        on:click={downloadCsv}
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
          class="feather feather-file-text group-hover:rotate-12 group-hover:transition-transform group-hover:duration-500"
          ><path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          /><polyline points="14 2 14 8 20 8" /><line
            x1="16"
            y1="13"
            x2="8"
            y2="13"
          /><line x1="16" y1="17" x2="8" y2="17" /><polyline
            points="10 9 9 9 8 9"
          /></svg
        >
      </button>
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
  </div>
  <section
    class="max-h-[24rem] md:max-h-[36rem] md:p-4 overflow-y-scroll overflow-x-hidden scrollbar-none snap-mandatory snap-y"
  >
    {#if loadedWindfarms.length === 0}
      <div
        class="flex flex-col items-center justify-center h-full w-full mt-24"
      >
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-300 border"
        />
        <p class="mt-4 text-xl font-bold">Caricamento in corso...</p>
      </div>
    {:else}
      {#each filteredTurbines as turbine (turbine.id)}
        <TurbinePreview {turbine} on:showDetails={handleDetailOpening} />
      {/each}
    {/if}

    {#if isDetailOpen}
      <div
        class="h-full w-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm"
        on:click={handleModalClosing}
        on:keydown={handleModalClosing}
      >
        <Turbine
          {turbine}
          on:closeDetails={handleModalClosing}
          on:editMode={handleEditModalOpening}
          on:deleted={handleDeletion}
        />
      </div>
    {/if}
    {#if isEditModelOpen}
      <div
        class="h-full w-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm"
        on:click={handleModalClosing}
        on:keydown={handleModalClosing}
      >
        <EditModal
          {turbine}
          on:close={() => (isEditModelOpen = false)}
          on:updated={handleUpdate}
        />
      </div>
    {/if}
    {#if isCreateModelOpen}
      <div
        class="h-full w-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm"
        on:click={handleModalClosing}
        on:keydown={handleModalClosing}
      >
        <CreateModal
          on:close={() => (isCreateModelOpen = false)}
          on:created={handleCreation}
        />
      </div>
    {/if}
  </section>
</div>
