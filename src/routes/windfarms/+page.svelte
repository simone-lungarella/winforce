<script>
  import TurbinePreview from "../../components/TurbinePreview.svelte";
  import { slide } from "svelte/transition";
  import {
    getWindfarms,
    getExportData,
  } from "../../services/TurbineService.js";
  import EditModal from "../../components/utils/EditModal.svelte";
  import CreateModal from "../../components/utils/CreateModal.svelte";
  import { onMount } from "svelte";
  import Operation from "../../enum/Operation";
  import TurbineDetail from "../../components/TurbineDetail.svelte";

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
  let year = "";

  // Options are: ALL, ONLY_INCOMPLETE, ONLY_COMPLETED, ALL
  let listType = "ALL";

  // Options are: ALL, ONLY_BLADE, MAINTENANCE, MAIN_COMPS
  let operationType = "ALL";

  $: filteredTurbines = loadedWindfarms.filter((turbine) => {
    const searchTerm = searchKey.toLowerCase();
    const descMatch = turbine.description.toLowerCase().includes(searchTerm);
    const nameMatch = turbine.turbineName.toLowerCase().includes(searchTerm);
    const numberMatch = turbine.turbineNumber
      .toLowerCase()
      .includes(searchTerm);
    const yearMatch = turbine.creationDate.includes(year);

    const typeMatch =
      listType === "ALL" ||
      (listType === "ONLY_INCOMPLETE" && !turbine.completionDate) ||
      (listType === "ONLY_COMPLETED" && turbine.completionDate);

    const operationTypeMatch =
      operationType === "ALL" ||
      (operationType === "MAINTENANCE" &&
        turbine.operation.some(
          (operation) =>
            operation.includes(Operation[20]) ||
            operation.includes(Operation[21]) ||
            operation.includes(Operation[22]) ||
            operation.includes(Operation[25]) ||
            operation.includes(Operation[26])
        )) ||
      (operationType === "ONLY_BLADES" &&
        turbine.operation.some((operation) =>
          operation.includes(Operation[2])
        )) ||
      (operationType === "MAIN_COMPS" &&
        turbine.operation.some(
          (operation) =>
            !operation.includes(Operation[20]) &&
            !operation.includes(Operation[21]) &&
            !operation.includes(Operation[22]) &&
            !operation.includes(Operation[25]) &&
            !operation.includes(Operation[26])
        ));

    return (
      (descMatch || nameMatch || numberMatch) &&
      yearMatch &&
      typeMatch &&
      operationTypeMatch
    );
  });

  $: numberOfTurbines = filteredTurbines.length;

  let isFilterVisible = false;
</script>

<div transition:slide={{ duration: 200 }}>
  <div id="full-content" class="p-4">
    <section
      class="mt-5 flex flex-col gap-3 font-mono h-min-[10vh]"
      id="filters"
    >
      <div
        class="items-center flex flex-row justify-between md:justify-start gap-2"
      >
        <input
          class="appearance-none bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm md:rounded-md focus:outline-none focus:ring-2 ring-blue-400 focus:shadow-outline"
          type="text"
          id="turbineName"
          name="turbineName"
          placeholder="Cerca"
          bind:value={searchKey}
        />

        <button
          class="py-2 px-2 hover:text-blue-500 bg-gray-700 rounded-sm md:rounded-md"
          on:click={() => {
            isFilterVisible = !isFilterVisible;
          }}
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
            class={isFilterVisible ? "text-blue-500 rotate-90" : "text-white"}
            ><polygon
              points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
            /></svg
          >
        </button>
      </div>

      {#if isFilterVisible}
        <div class="flex flex-col md:flex-row gap-2">
          <input
            class="appearance-none bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm md:rounded-md focus:outline-none focus:ring-2 ring-blue-400 focus:shadow-outline"
            type="text"
            id="turbineName"
            name="turbineName"
            placeholder="Anno"
            bind:value={year}
          />
          <div class="relative">
            <select
              class="w-full min-w-1/2 min-w-[13rem] appearance-none bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm md:rounded-md focus:outline-none hover:ring-2 ring-blue-400 focus:shadow-outline hover:cursor-pointer"
              bind:value={listType}
            >
              <option value="ALL">Tutte le attività</option>
              <option value="ONLY_INCOMPLETE">In corso</option>
              <option value="ONLY_COMPLETED">Cantieri chiusi</option>
            </select>
            <div class="absolute top-2 right-2 font-bold">
              <svg
                class="w-6 h-6 text-white fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7.293 7.293a1 1 0 0 1 1.414 0L12 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                />
              </svg>
            </div>
          </div>
          <div class="relative">
            <select
              class="w-full min-w-1/2 min-w-[15rem] appearance-none bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-sm md:rounded-md focus:outline-none hover:ring-2 ring-blue-400 focus:shadow-outline hover:cursor-pointer"
              bind:value={operationType}
            >
              <option value="ALL">Tutte le operazioni</option>
              <option value="ONLY_BLADES">Pale</option>
              <option value="MAIN_COMPS">Main components</option>
              <option value="MAINTENANCE">Manutenzioni Ordinarie</option>
            </select>
            <div class="absolute top-2 right-2 font-bold">
              <svg
                class="w-6 h-6 text-white fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7.293 7.293a1 1 0 0 1 1.414 0L12 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                />
              </svg>
            </div>
          </div>
        </div>
      {/if}
    </section>

    <div class="flex flex-row justify-between items-center h-[10vh]">
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
      class="px-1 md:px-2 ring-2 overflow-y-scroll scrollable ring-gray-600 rounded-sm mt-2 {isFilterVisible
        ? 'h-[42vh] md:h-[60vh]'
        : 'h-[65vh]'}"
    >
      {#if loadedWindfarms.length === 0}
        <div
          class="flex flex-col items-center justify-center h-full w-full mt-24"
        >
          <div
            class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-300 border"
          />
          <p class="mt-4 text-xl font-bold font-mono">
            Caricamento in corso...
          </p>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each filteredTurbines as turbine (turbine.id)}
            <TurbinePreview {turbine} on:showDetails={handleDetailOpening} />
          {/each}
        </div>
      {/if}

      {#if isDetailOpen}
        <div
          class="h-full w-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm"
          on:click={handleModalClosing}
          on:keydown={handleModalClosing}
        >
          <TurbineDetail
            windfarm={turbine}
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
</div>

<style>
  .scrollable {
    scrollbar-width: thin;
    scrollbar-color: #60a5fa;
    scroll-behavior: smooth;
  }

  .scrollable::-webkit-scrollbar {
    width: 6px;
  }

  .scrollable::-webkit-scrollbar-track {
    background: #4b5563;
  }

  .scrollable::-webkit-scrollbar-thumb {
    background-color: #60a5fa;
    border-radius: 8px;
  }
</style>
