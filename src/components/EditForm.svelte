<script>
  import { slide } from "svelte/transition";
  import Operation from "../enum/Operation";
  import SelectionModal from "../components/utils/SelectionModal.svelte";
  import { onMount } from "svelte";
  import PowerSwitch from "../components/utils/PowerSwitch.svelte";
  import StateSwitch from "../components/utils/StateSwitch.svelte";
  import { createEventDispatcher } from "svelte";
  import { createWindfarm, updateWindfarm } from "../services/TurbineService";

  export let isEditMode = false;
  export let windfarm = {
    turbineName: "",
    turbineNumber: "",
    description: "",
    odlNumber: null,
    power: "KILOWATT",
    operation: [],
    turbineState: "In Marcia",
    startingDateEEMM: null,
    startingDateOOCC: null,
    permittingDate: null,
    priorNotification: null,
    toNotDismantle: false,
  };

  const dispatch = createEventDispatcher();

  let isOperationSelectOpen = false;
  let operations = [];

  onMount(() => {
    operations = Object.values(Operation).map((operation) => {
      return {
        name: operation,
        isSelected: windfarm.operation.includes(operation),
      };
    });
  });

  let currentActiveIndex = 0;
  const handleScroll = () => {
    const element = document.getElementById("scrollable");
    const scrollLeft = element.scrollLeft;
    const scrollWidth = element.scrollWidth;
    const offsetWidth = element.offsetWidth;
    const scrollRight = scrollWidth - scrollLeft - offsetWidth;

    if (scrollLeft <= 10) {
      currentActiveIndex = 0;
    } else if (scrollRight <= 10) {
      currentActiveIndex = 2;
    } else {
      currentActiveIndex = 1;
    }
  };

  const scrollLeft = () => {
    const element = document.getElementById("scrollable");
    // Smoothly scroll to left
    element.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const element = document.getElementById("scrollable");
    // Smoothly scroll to right
    element.scrollTo({
      left: element.scrollWidth,
      behavior: "smooth",
    });
  };

  const scrollCenter = () => {
    const element = document.getElementById("scrollable");
    let amount = element.scrollWidth / 2;

    if (window.innerWidth < 768) {
      amount = element.scrollWidth / 3;
    }
    // Smoothly scroll to center
    element.scrollTo({
      left: amount,
      behavior: "smooth",
    });
  };

  const handleFormClosing = () => {
    dispatch("close");
  };

  const allRequiredFieldsAreProvided = () => {
    return (
      windfarm.turbineName !== "" &&
      windfarm.description !== "" &&
      windfarm.operation.length > 0 &&
      windfarm.operation[0] !== ""
    );
  };

  const clearForm = () => {
    windfarm = {
      turbineName: "",
      turbineNumber: "",
      description: "",
      odlNumber: null,
      power: "KILOWATT",
      operation: [],
      turbineState: "In Marcia",
      startingDateEEMM: null,
      startingDateOOCC: null,
      permittingDate: null,
      priorNotification: null,
    };
  };

  let isSendingRequest = false;

  const handleFormSubmit = () => {
    if (isSendingRequest || !allRequiredFieldsAreProvided()) {
      return;
    }

    isSendingRequest = true;

    if (isEditMode) {
      updateWindfarm(windfarm)
        .then((response) => {
          if (response !== undefined && response.status === 200) {
            dispatch("updated");
            isSendingRequest = false;
            clearForm();
          } else {
            console.log("Error while updating windfarm: ", response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createWindfarm(windfarm)
        .then(() => {
          dispatch("created");
          isSendingRequest = false;
          clearForm();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
</script>

<div
  class="h-full w-full flex flex-col items-center justify-center md:min-h-screen scrollbar-none overflow-x-hidden"
  on:click={handleFormClosing}
  on:keydown={handleFormClosing}
>
  {#if isOperationSelectOpen}
    <div
      class="w-full h-full absolute top-0 left-0 bg-gray-800 backdrop-filter bg-opacity-75 backdrop-blur-sm"
      on:click|stopPropagation={() => {
        isOperationSelectOpen = false;
      }}
      on:keydown|stopPropagation={() => {
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
    <!-- Div container -->
    <div
      transition:slide={{ duration: 150 }}
      id="scrollable"
      class="flex flex-row gap-5 text-black p-2 w-[19rem] md:w-[32.5rem] scrollbar-none overflow-scroll snap-x snap-mandatory"
      on:click|stopPropagation
      on:keydown|stopPropagation
      on:scroll={handleScroll}
    >
      <div
        class="flex flex-col gap-3 bg-gray-800 p-5 rounded ring-2 ring-gray-500 snap-center"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            class="input"
            type="text"
            value={windfarm.turbineName}
            placeHolder="Aerogeneratore*"
            on:change={(event) => {
              windfarm.turbineName = event.target.value;
            }}
            required
            disabled={isEditMode}
          />
          <input
            class="input"
            type="text"
            value={windfarm.turbineNumber}
            placeHolder="Numero cantiere"
            on:change={(event) => {
              windfarm.turbineNumber = event.target.value;
            }}
          />
          <input
            class="input"
            type="text"
            value={windfarm.description}
            placeHolder="Impianto Eolico*"
            on:change={(event) => {
              windfarm.description = event.target.value;
            }}
            required
          />
          <input
            class="input"
            type="number"
            value={windfarm.odlNumber}
            on:change={(event) => {
              windfarm.odlNumber = event.target.value;
            }}
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
              placeholder="Operazioni*"
              required
            />
          </button>
        </div>
        <div class="flex flex-row justify-between p-2 items-center">
          <label class="text-xl text-white font-mono" for="smantleCheckbox"
            >Non smantellare</label
          >
          <input
            id="smantleCheckbox"
            class="checkbox w-8 h-8"
            type="checkbox"
            value={windfarm.toNotDismantle}
            on:change={(event) => {
              windfarm.toNotDismantle = event.target.checked;
            }}
          />
        </div>
        <div class="col-span-full mt-auto">
          <PowerSwitch
            on:change={(event) => (windfarm.power = event.detail)}
            isKilowatt={windfarm.power === "KILOWATT"}
          />
        </div>
      </div>
      <!-- Second form div -->
      <div
        class="flex flex-col gap-3 bg-gray-800 p-5 rounded ring-2 ring-gray-500 snap-center"
      >
        <div class="col-span-full">
          <StateSwitch
            on:change={(event) => (windfarm.turbineState = event.detail)}
            state={windfarm.turbineState}
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
            value={windfarm.startingDateEEMM !== undefined
              ? windfarm.startingDateEEMM
              : ""}
            placeHolder="Data inizio EEMM"
            on:change={(event) => {
              windfarm.startingDateEEMM = event.target.value;
            }}
          />
        </div>
        <div>
          <label for="dateEEMM" class="font-mono text-white">
            Data Inizio OOCC
          </label>
          <input
            class="input"
            type="date"
            value={windfarm.startingDateOOCC !== undefined
              ? windfarm.startingDateOOCC
              : ""}
            placeHolder="Data inizio OOCC"
            on:change={(event) => {
              windfarm.startingDateOOCC = event.target.value;
            }}
          />
        </div>
        <div>
          <label for="dateEEMM" class="font-mono text-white">
            Validit&agrave; permitting
          </label>
          <input
            class="input"
            type="date"
            value={windfarm.permittingDate !== undefined
              ? windfarm.permittingDate
              : ""}
            placeHolder="Validità permitting"
            on:change={(event) => {
              windfarm.permittingDate = event.target.value;
            }}
          />
        </div>
        <div>
          <label for="dateEEMM" class="font-mono text-white">
            Validit&agrave; notifica
          </label>
          <input
            class="input"
            type="date"
            value={windfarm.priorNotification !== undefined
              ? windfarm.priorNotification
              : ""}
            placeHolder="Validità notifica"
            on:change={(event) => {
              windfarm.priorNotification = event.target.value;
            }}
          />
        </div>
      </div>
      <div
        class="flex flex-col gap-3 bg-gray-800 p-5 rounded ring-2 ring-gray-500 snap-center"
      >
        <div class="w-[15rem] md:w-[29rem] h-3/4">
          <h2 class="font-mono font-extrabold text-gray-300 text-2xl mb-2">
            Riepilogo {isEditMode ? "modifica" : "creazione"}
          </h2>

          <div class="h-1 w-3/4 bg-gray-500 my-1 rounded" />

          <!-- Review main stats of widfarm -->
          <p>
            <span class="font-mono font-bold text-gray-300"
              >Numero cantiere:</span
            >
            <span class="font-mono text-gray-300">{windfarm.turbineNumber}</span
            >
          </p>
          <p>
            <span class="font-mono font-bold text-gray-300"
              >Aerogeneratore:</span
            >
            <span class="font-mono text-gray-300">{windfarm.turbineName}</span>
          </p>

          <p>
            <span class="font-mono font-bold text-gray-300"
              >Impianto eolico:</span
            >
            <span class="font-mono text-gray-300">{windfarm.description}</span>
          </p>
          <p>
            <span class="font-mono font-bold text-gray-300">Numero ODL:</span>
            <span class="font-mono text-gray-300"
              >{windfarm.odlNumber || "N/A"}</span
            >
          </p>
          <p>
            <span class="font-mono font-bold text-gray-300">Operazioni:</span>
            <span class="font-mono text-gray-300">{windfarm.operation}</span>
          </p>
          <p>
            <span class="font-mono font-bold text-gray-300">Tipologia:</span>
            <span class="font-mono text-gray-300">{windfarm.power}</span>
          </p>
          <p>
            <span class="font-mono font-bold text-gray-300">Stato:</span>
            <span class="font-mono text-gray-300">{windfarm.turbineState}</span>
          </p>
        </div>
        <div class="grid grid-flow-col place-content-center w-full mt-5 gap-2">
          <button
            type="button"
            class="font-bold font-mono bg-red-500 hover:bg-red-600 py-2 rounded w-24"
            on:click={handleFormClosing}
          >
            Annulla
          </button>
          <button
            class="font-bold font-mono bg-green-500 hover:bg-green-600 py-2 rounded w-24"
            disabled={isSendingRequest}
            on:click|preventDefault={handleFormSubmit}
          >
            <p>{isEditMode ? "Modifica" : "Crea"}</p>
          </button>
        </div>
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
          scrollCenter();
        }}
      />
      <input
        type="checkbox"
        checked={currentActiveIndex === 2}
        class="dot bg-gray-300 checked:bg-blue-400"
        on:change={() => {
          scrollRight();
        }}
      />
    </div>
  </form>
</div>

<style>
  .dot {
    @apply appearance-none rounded-full w-3 h-3 cursor-pointer hover:ring-2 hover:ring-blue-400;
  }
</style>
