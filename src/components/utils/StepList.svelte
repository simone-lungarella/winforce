<script>
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { getSteps, setStepComplete } from "../../services/StepService.js";

  /**
   * @type { any }
   */
  export let turbine;

  let steps = [];
  $: reachedStep = steps[turbine.completedSteps];

  onMount(() => {
    getSteps(turbine.id).then((data) => {
      steps = data;
    });

    setTimeout(() => {
      scrollToReachedStep();
    }, 1500);
  });

  const handleStepUpdate = (stepId, isComplete) => {
    setStepComplete(stepId, isComplete).then(() => {
      getSteps(turbine.id).then((data) => {
        steps = data;
        isComplete
          ? (turbine.completedSteps += 1)
          : (turbine.completedSteps -= 1);
        scrollToReachedStep();
      });
    });
  };

  function scrollToReachedStep() {
    const stepsContainer = document.getElementById("stepsContainer");
    const totaleNumberOfSteps = 9;

    if (stepsContainer) {
      const numberOfVisibleRows = window.innerWidth < 768 ? 2 : 4;
      const exceedingSteps = turbine.completedSteps - numberOfVisibleRows;

      if (exceedingSteps >= 0 && turbine.completedSteps < totaleNumberOfSteps) {
        stepsContainer.scrollTo({
          top:
            (stepsContainer.scrollHeight / totaleNumberOfSteps) *
            (exceedingSteps + 1), // Focus on the next step to be completed
          behavior: "smooth",
        });
        return;
      } else if (turbine.completedSteps === totaleNumberOfSteps) {
        setTimeout(() => {
          stepsContainer.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 500);

        return;
      }
    }
  }
</script>

<div
  in:fade={{ delay: 400, duration: 1000 }}
  class="col-span-1 text-white md:ring-2 ring-gray-400 rounded-sm"
>
  <div
    class="grid justify-center place-content-center items-center grid-flow-col mb-3 mt-5 md:mt-0 md:border-b w-11/12 mx-auto md:py-2 gap-2 font-bold"
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
      class="feather feather-link"
      ><path
        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
      /><path
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
      /></svg
    >
    <h1 class="text-center font-mono text-xl">Tracciamento fasi</h1>
  </div>

  <div
    in:slide={{ delay: 500, duration: 1000 }}
    id="stepsContainer"
    class="grid grid-cols-7 md:p-5 text-lg text-left overflow-scroll h-40 md:h-64 gap-2 scrollbar-none shadow-md mt-5 items-center"
  >
    {#await steps}
      <div class="col-span-7 text-center">Caricamento...</div>
    {:then steps}
      {#each steps as step (step.id)}
        <div
          class="col-span-7 relative grid grid-cols-7 hover:bg-gray-700/60 transition duration-500 ease-in-out p-3 hover:border hover:shadow-md hover:border-blue-200 items-center rounded-sm"
        >
          <input
            type="checkbox"
            class="col-span-1 h-5 w-5 border-gray-300 rounded accent-green-600 cursor-pointer disabled:cursor-not-allowed"
            disabled={reachedStep &&
              step.name !== reachedStep.name &&
              !step.complete &&
              !(steps.indexOf(step) === steps.indexOf(reachedStep) - 1)}
            checked={step.complete}
            on:click={() => handleStepUpdate(step.id, !step.complete)}
          />
          <div class="col-span-6 text-left">
            <p>
              {step.name}
            </p>
          </div>
          {#if step.complete && !(steps.indexOf(step) === steps.indexOf(reachedStep) - 1)}
            <div
              class="absolute h-full w-full bg-gray-600 bg-opacity-70 flex items-center justify-end p-5 rounded-sm hover:text-green-400 gap-2 backdrop-filter backdrop-blur-md"
            >
              <p class="font-bold uppercase">Completato</p>
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
                class="feather feather-check-circle text-green-500"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          {/if}
        </div>
      {/each}
    {/await}
  </div>
</div>
