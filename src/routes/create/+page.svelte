<script>
  import { fade, slide } from "svelte/transition";
  import Operation from "../../enum/Operation";
  import SelectionModal from "../../components/utils/SelectionModal.svelte";
  import { onMount } from "svelte";
  import PowerSwitch from "../../components/utils/PowerSwitch.svelte";
  import StateSwitch from "../../components/utils/StateSwitch.svelte";

  let windfarm = {
    turbineName: "",
    turbineNumber: "",
    description: "",
    odlNumber: null,
    power: "KILOWATT",
    operation: [],
    turbineState: "In marcia",
    startingDateEEMM: null,
    startingDateOOCC: null,
    permittingDate: null,
    priorNotification: null,
  };

  let isOperationSelectOpen = false;
  let operations = [];
  onMount(() => {
    operations = Object.values(Operation).map((operation) => {
      return {
        name: operation,
        isSelected: false,
      };
    });
  });
</script>

<div
  transition:slide={{ duration: 200 }}
  class="md:mt-8 overflow-y-scroll scrollbar-none h-screen pb-24"
>
  {#if isOperationSelectOpen}
    <div
      class="h-full w-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm"
      on:click={() => {
        isOperationSelectOpen = false;
      }}
      on:keydown={() => {
        isOperationSelectOpen = false;
      }}
    >
      <SelectionModal
        {operations}
        on:cancel={() => {
          isOperationSelectOpen = false;
        }}
        on:confirm={(event) => {
          operations = event.detail;
          windfarm.operation = operations
            .filter((operation) => operation.isSelected)
            .map((operation) => operation.name);

          isOperationSelectOpen = false;
        }}
      />
    </div>
  {/if}
  <form class="lg:mx-32 overflow-y-scroll scrollbar-none">
    <div
      in:fade={{ duration: 150 }}
      out:fade={{ duration: 50 }}
      class="grid grid-cols-1 md:grid-cols-2 gap-4 text-black overflow-y-scroll md:overflow-auto p-1 md:p-5 h-[25.1rem] md:h-full scrollbar-none"
    >
      <div class="bg-gray-800 p-5 col-span-full rounded ring-2 ring-gray-500">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full">
          <input
            class="input"
            type="text"
            value={windfarm.turbineName}
            placeHolder="Aerogeneratore"
            required
          />
          <input
            class="input"
            type="text"
            value={windfarm.turbineNumber}
            placeHolder="Numero turbina"
            required
          />
          <input
            class="input"
            type="text"
            value={windfarm.description}
            placeHolder="Descrizione"
            required
          />
          <input
            class="input"
            type="number"
            value={windfarm.odlNumber}
            placeHolder="Numero ODL"
          />
        </div>

        <div class="col-span-full mt-5">
          <button
            type="button"
            class="input hover:bg-gray-200 text-start transition ease-in-out"
            on:click={() => {
              isOperationSelectOpen = !isOperationSelectOpen;
            }}
          >
            <input
              class="w-full"
              value={windfarm.operation.length > 0
                ? windfarm.operation.join(", ")
                : ""}
              disabled
              placeholder="Operazioni"
            />
          </button>
        </div>
        <div class="col-span-full mt-5">
          <PowerSwitch on:change={(event) => (windfarm.power = event.detail)} />
        </div>
      </div>

      <div
        class="h-1 bg-gray-300 rounded-full m-auto my-4 w-full col-span-full"
      />

      <div class="flex flex-col gap-3 bg-gray-800 p-5 col-span-full rounded ring-2 ring-gray-500">
        <div class="col-span-full">
          <StateSwitch
            on:change={(event) => (windfarm.turbineState = event.detail)}
          />
        </div>

        <div>
          <label for="dateEEMM" class="font-mono text-white">
            Data Inizio EEMM
          </label>
          <input
            id="dateEEMM"
            class="input"
            type="date"
            value={windfarm.startingDateEEMM}
            placeHolder="Data inizio EEMM"
            required
          />
        </div>
        <div>
          <label for="dateEEMM" class="font-mono text-white">
            Data Inizio OOCC
          </label>
          <input
            class="input"
            type="date"
            value={windfarm.startingDateOOCC}
            placeHolder="Data inizio OOCC"
            required
          />
        </div>
        <div>
          <label for="dateEEMM" class="font-mono text-white">
            Data Permitting
          </label>
          <input
            class="input"
            type="date"
            value={windfarm.permittingDate}
            placeHolder="Data concessione"
            required
          />
        </div>
      </div>
    </div>
    <div class="h-1 bg-gray-300 rounded-full w-3/4 m-auto my-4" />

    <div class="flex flex-row mt-10 gap-2 justify-center">
      <button
        class="font-bold font-mono bg-green-500 py-2 px-4 rounded w-24 flex flex-row gap-1
        hover:bg-green-600 hover:scale-105"
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
          class="feather feather-plus"
          ><line x1="12" y1="5" x2="12" y2="19" /><line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
          /></svg
        >
        Crea
      </button>
    </div>
  </form>
</div>
