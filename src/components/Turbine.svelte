<script>
  import { slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import EventsButton from "./utils/EventsButton.svelte";
  import OperationsButton from "./utils/OperationsButton.svelte";
  import StepList from "./utils/StepList.svelte";
  import DeletionModal from "./utils/DeletionModal.svelte";
  import { deleteWindfarm } from "../services/TurbineService";

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

  const dispatch = createEventDispatcher();

  const handleDetailClose = () => {
    dispatch("closeDetails");
  };

  const handleEditMode = () => {
    dispatch("editMode", turbine.id);
  };

  let isDeletionModalOpen = false;
  const handleDeletion = () => {
    isDeletionModalOpen = false;
    deleteWindfarm(turbine.id).then(() => {
      dispatch("deleted");
    });
  };
</script>

<div
  in:slide={{ duration: 150 }}
  class="bg-gray-800 rounded border-2 border-gray-800 ring-2 ring-gray-400 p-4 backdrop-filter backdrop-blur-sm bg-opacity-75 text-white font-mono text-2xl 
  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:min-w-min md:max-w-4xl z-50 h-[32rem] overflow-y-scroll scrollbar-none md:h-auto md:min-h-[28rem]"
  on:click|stopPropagation
  on:keydown|stopPropagation
>
  <div class="w-full h-20 grid grid-cols-2 items-start">
    <h1 class="font-mono font-bold text-2xl md:text-4xl">
      {turbine.turbineName}
      {#if turbine.turbineNumber}
        <span> - {turbine.turbineNumber}</span>
      {/if}
    </h1>
    <div class="flex flex-row justify-end">
      <div class="grid grid-cols-6">
        <div class="col-span-3" />

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
        <div class="flex flex-row col-span-3 gap-2 items-center font-bold py-2">
          <button
            class="text-red-500 hover:scale-110 hover:shadow-sm"
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
          </button>
          <button
            class="text-blue-500 hover:scale-110 hover:shadow-sm"
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
          </button>
          <button
            class="text-red-500 hover:scale-110 hover:shadow-sm"
            on:click={handleDetailClose}
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
              class="feather feather-x"
              ><line x1="18" y1="6" x2="6" y2="18" /><line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
              /></svg
            >
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="w-full grid grid-cols-1 md:grid-cols-2 items-start gap-0 md:gap-4"
  >
    <div class="col-span-1">
      <p class="prose font-mono text-white">
        Creazione: <span>
          {turbine.creationDate}
        </span>
      </p>
      <p class="prose font-mono text-white">
        Stato turbina: <span>{turbine.turbineState}</span>
      </p>
      {#if turbine.permittingDate !== undefined}
        <p class="prose font-mono text-white">
          Valdit&agrave; permitting: <span>{turbine.permittingDate}</span>
        </p>
      {/if}
      {#if turbine.priorNotification !== undefined}
        <p class="prose font-mono text-white">
          Valdit&agrave; notifica: <span>{turbine.priorNotification}</span>
        </p>
      {/if}
      <div class="w-full mt-5">
        <EventsButton {turbine} />
        <OperationsButton {turbine} />
      </div>
    </div>
    <StepList {turbine} />
  </div>
</div>
