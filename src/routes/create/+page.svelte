<script>
  import { slide } from "svelte/transition";
  import axios from "axios";

  const executeCall = async () => {
    const response = await axios.get(
      "https://dockyard-handler.herokuapp.com/v1.0.0/events"
    );
    console.log(response);
  };
</script>

<div transition:slide={{ duration: 200 }} class="md:mt-16">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click={executeCall}>Execute</button
  >
</div>
