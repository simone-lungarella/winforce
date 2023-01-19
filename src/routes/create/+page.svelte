<script>
  import { slide } from "svelte/transition";
  import Operation from "../../enum/Operation";
  import SelectionModal from "../../components/utils/SelectionModal.svelte";
  import { onMount } from "svelte";

  let windfarm = {
    turbineName: "",
    turbineNumber: "XXXX",
    description: "",
    odlNumber: 0,
    power: "MEGAWATT",
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

<div transition:slide={{ duration: 200 }} class="md:mt-16">
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
  <form>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black overflow-y-scroll md:overflow-auto p-3 h-[30rem] md:h-full scrollbar-none"
    >
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
        placeHolder="Numero"
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
        required
      />
      <select class="select">
        <option>MEGAWATT</option>
        <option>KILOWATT</option>
      </select>

      <div>
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

      <select class="select">
        <option>In Marcia</option>
        <option>Limitata</option>
        <option>Ferma</option>
      </select>
      <input
        class="input"
        type="date"
        value={windfarm.startingDateEEMM}
        placeHolder="Data inizio EEMM"
        required
      />
      <input
        class="input"
        type="date"
        value={windfarm.startingDateOOCC}
        placeHolder="Data inizio OOCC"
        required
      />
      <input
        class="input"
        type="date"
        value={windfarm.permittingDate}
        placeHolder="Data concessione"
        required
      />
      <input
        class="input"
        type="text"
        value={windfarm.priorNotification}
        placeHolder="Data notifica"
        required
      />
    </div>

    <div class="flex flex-row mt-5 gap-2 justify-center">
      <button class="bg-green-500 hover:bg-green-600 py-2 px-4 rounded w-24"
        >Crea</button
      >
    </div>
  </form>
</div>
