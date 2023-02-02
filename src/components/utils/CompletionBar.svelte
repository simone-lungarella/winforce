<script>
  import Step from "../../enum/Step";

  export let completedSteps = 0;
  export let creationDate = "";

  let numberOfSteps = creationDate.includes("2022") ? 7 : 8;

  $: reachedStep = creationDate.includes("2022")
    ? Step[completedSteps + 2]
    : Step[completedSteps + 1];
</script>

<div class="flex">
  <div
    class="transition duration-300 ease-in-out transform flex flex-row bg-gray-500 h-7 w-3/4"
  >
    {#each Array(numberOfSteps) as _, index}
      {#if index < completedSteps}
        <div class="border border-gray-400 bg-green-500 h-full w-full" />
      {:else if index === completedSteps}
        <div class="border border-gray-400 bg-green-800 h-full w-full" />
      {:else}
        <div class="border border-gray-400 bg-gray-500 h-full w-full" />
      {/if}
    {/each}
  </div>

  {#if reachedStep}
    <span class="absolute font-bold text-lg flex px-1">{reachedStep}</span>
  {:else}
    <span class="absolute font-bold text-lg flex px-1">Cantiere chiuso</span>
  {/if}
</div>
