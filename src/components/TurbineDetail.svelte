<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import StepList from "./utils/StepList.svelte";
  import { deleteWindfarm } from "../services/TurbineService";
  import DeletionModal from "./utils/DeletionModal.svelte";
  import TurbineType from "./utils/TurbineType.svelte";

  export let windfarm = {
    id: 0,
    turbineName: "",
    turbineNumber: "",
    description: "",
    odlNumber: null,
    power: "KILOWATT",
    operation: [],
    turbineState: "In Marcia",
    creationDate: null,
    startingDateEEMM: null,
    startingDateOOCC: null,
    permittingDate: null,
    priorNotification: null,
    toNotDismantle: false,
  };

  const dispatch = createEventDispatcher();

  let currentActiveIndex = 0;
  const handleScroll = () => {
    const element = document.getElementById("scrollable");
    if (element) {
      const scrollLeft = element.scrollLeft;

      if (scrollLeft <= 10) {
        currentActiveIndex = 0;
      } else {
        currentActiveIndex = 1;
      }
    }
  };

  const scrollLeft = () => {
    const element = document.getElementById("scrollable");
    if (element) {
      element.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    const element = document.getElementById("scrollable");
    if (element) {
      element.scrollTo({
        left: element.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  const handleFormClosing = () => {
    dispatch("close");
  };

  let isDeletionModalOpen = false;
  const handleDeletion = () => {
    isDeletionModalOpen = false;
    deleteWindfarm(windfarm.id).then(() => {
      dispatch("deleted");
    });
  };

  const handleEditMode = () => {
    dispatch("editMode", windfarm.id);
  };

  let infoTooltip = false;
</script>

<div
  class="h-full w-full flex flex-col items-center justify-center md:min-h-screen scrollbar-none overflow-x-hidden"
  on:click={handleFormClosing}
  on:keydown={handleFormClosing}
>
  <!-- Div container -->
  <div
    transition:slide={{ duration: 150 }}
    id="scrollable"
    class="flex flex-row gap-5 text-black p-2 w-[20rem] md:w-[30rem] scrollbar-none overflow-scroll snap-x snap-mandatory"
    on:click|stopPropagation
    on:keydown|stopPropagation
    on:scroll={handleScroll}
  >
    {#if isDeletionModalOpen}
      <div
        class="h-full w-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm z-50"
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
    <div
      class="flex flex-col gap-3 bg-gray-800 p-5 rounded ring-2 ring-gray-500 snap-center"
    >
      <div class="grid grid-cols-1 w-[17rem] md:w-[27rem]">
        <div class="flex flex-row justify-between">
          <h1 class="font-mono font-bold text-2xl text-white mb-2">
            {windfarm.turbineName}
            {#if windfarm.turbineNumber}
              <span> - {windfarm.turbineNumber}</span>
            {/if}
          </h1>
          <TurbineType power={windfarm.power} />
        </div>

        {#if windfarm.creationDate}
          <p class="font-mono text-white">
            Creazione: <span>
              {windfarm.creationDate
                ? windfarm.creationDate.substring(0, 10)
                : new Date().toISOString().substring(0, 10)}
            </span>
          </p>
        {/if}
        <p class="font-mono text-white">
          Stato turbina: <span>{windfarm.turbineState}</span>
        </p>

        {#if windfarm.permittingDate !== undefined}
          <p class="font-mono text-white">
            Valdit&agrave; permitting: <span>{windfarm.permittingDate}</span>
          </p>
        {/if}
        {#if windfarm.priorNotification !== undefined}
          <p class="font-mono text-white">
            Valdit&agrave; notifica: <span>{windfarm.priorNotification}</span>
          </p>
        {/if}
      </div>

      <div class="ring-2 rounded ring-gray-600 px-2 py-1 text-white">
        <div class="flex flex-row items-center gap-2 relative">
          <p class="font-mono text-xl">Attivit&agrave;</p>
          <button
            class="hover:text-amber-400 {infoTooltip ? 'text-amber-400' : ''}"
            on:click={() => (infoTooltip = !infoTooltip)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-info"
              ><circle cx="12" cy="12" r="10" /><line
                x1="12"
                y1="16"
                x2="12"
                y2="12"
              /><line x1="12" y1="8" x2="12.01" y2="8" /></svg
            >
          </button>
          {#if infoTooltip}
            <div
              class="absolute z-10 bg-gray-400 text-white rounded-sm shadow-md p-2 cursor-default top-8"
            >
              <p>
                {windfarm.toNotDismantle
                  ? "Da non smantellare"
                  : "Da smantellare"}
              </p>
            </div>
          {/if}
        </div>
        <div class="p-2">
          <ul class="font-mono">
            {#each windfarm.operation as operation}
              <li class="text-sm list-disc ml-5 font-bold">
                {operation}
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <div
        class="flex flex-col gap-2 ring-2 rounded ring-gray-600 px-2 pb-2 pt-1"
      >
        <div class="flex flex-row font-mono text-white">
          <h1 class="font-mono text-xl">Tracciamento eventi</h1>
        </div>
        <ul>
          <li class="text-sm list-disc ml-5 font-bold text-white">
            Inizio ATT EEMM: <span class="font-extralight"
              >{windfarm.startingDateEEMM || "N/A"}</span
            >
          </li>
          <li class="text-sm list-disc ml-5 font-bold text-white">
            Inizio ATT OOCC: <span class="font-extralight"
              >{windfarm.startingDateOOCC || "N/A"}</span
            >
          </li>
        </ul>
      </div>

      <div
        id="action-buttons"
        class="grid place-content-center grid-flow-col gap-2 mt-6"
      >
        <button
          class="flex flex-row gap-2 items-center text-red-500 hover:bg-gray-300 hover:shadow-sm bg-gray-200 rounded py-2 px-4"
          on:click={() => {
            isDeletionModalOpen = true;
          }}
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
            class="feather feather-trash-2"
            ><polyline points="3 6 5 6 21 6" /><path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            /><line x1="10" y1="11" x2="10" y2="17" /><line
              x1="14"
              y1="11"
              x2="14"
              y2="17"
            /></svg
          >
          <p class="font-mono">Elimina</p>
        </button>
        <button
          class="flex flex-row gap-2 items-center text-blue-500 hover:bg-gray-300 hover:shadow-sm bg-gray-200 rounded py-2 px-4"
          on:click={handleEditMode}
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
            class="feather feather-edit-2"
            ><path
              d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
            /></svg
          >
          <p class="font-mono">Modifica</p>
        </button>
      </div>
    </div>
    <!-- Second form div -->
    <div
      class="flex flex-col bg-gray-800 rounded ring-2 ring-gray-500 snap-center p-1"
    >
      <StepList turbine={windfarm} />
    </div>
  </div>

  <div
    class="grid grid-flow-col place-content-center w-full gap-2 h-10"
    on:click|stopPropagation
    on:keydown|stopPropagation
  >
    <input
      type="checkbox"
      checked={currentActiveIndex === 0}
      class="dot bg-gray-300 checked:bg-blue-400"
      on:change={() => {
        scrollLeft();
      }}
    />
    <input
      type="checkbox"
      checked={currentActiveIndex === 1}
      class="dot bg-gray-300 checked:bg-blue-400"
      on:change={() => {
        scrollRight();
      }}
    />
  </div>
</div>

<style>
  .dot {
    @apply appearance-none rounded-full w-3 h-3 cursor-pointer hover:ring-2 hover:ring-blue-400 focus:ring-2 focus:ring-blue-400;
  }
</style>
