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
    class="transition duration-300 ease-in-out transform flex flex-row h-7 w-full lg:w-3/4 gap-0.5"
  >
    {#each Array(numberOfSteps) as _, index}
      {#if index < completedSteps}
        <div class="border border-gray-400 bg-blue-500 h-full w-full rounded" />
      {:else if index === completedSteps}
        <div class="border border-gray-400 bg-blue-800 h-full w-full rounded" />
      {:else}
        <div class="border border-gray-400 bg-gray-500 h-full w-full rounded" />
      {/if}
    {/each}
  </div>

  <span class="absolute font-bold text-lg flex pl-2"
    >{reachedStep || "Cantiere chiuso"}</span
  >
</div>
