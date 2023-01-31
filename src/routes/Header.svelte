<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let isMenuOpen = false;

  const handleMenuOpen = () => {
    isMenuOpen = !isMenuOpen;
    dispatch("menu-open", isMenuOpen);
  };

  const handleMenuClose = () => {
    isMenuOpen = false;
    dispatch("menu-open", isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "./login";
  };
</script>

<header class="bg-gray-900 w-full">
  <div class="flex items-center w-full h-10 justify-between">
    <h1 class="ml-5 md:ml-10 text-2xl font-mono font-extrabold">
      <span class={isMenuOpen ? "blur-sm" : ""}>Task Manager Wind</span>
    </h1>
    {#if !isMenuOpen}
      <button
        class="text-blue-300 hover:text-blue-400 transition duration-200 hover:scale-110"
        on:click={handleMenuOpen}
      >
        <svg
          class="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          /></svg
        >
      </button>
    {/if}
  </div>
  {#if isMenuOpen}
    <div
      class="bg-gray-600/75 w-3/4 md:w-1/5 absolute h-full top-0 right-0 shadow-2xl z-50"
    >
      <div class="flex flex-row-reverse">
        <button
          class="items-center px-3 py-8 rounded text-blue-300"
          on:click={handleMenuClose}
        >
          <svg
            class="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            /></svg
          >
        </button>
      </div>
      <nav>
        <ul class="gap-2 flex mr-10 flex-col p-4" aria-label="Navigation">
          <li>
            <div class="item">
              <button
                class="text-white hover:text-blue-300"
                on:click={handleLogout}>Esci</button
              >
            </div>
          </li>
        </ul>
      </nav>
    </div>
  {/if}
</header>

<style>
  .item {
    @apply flex items-center px-3 py-2 text-xl font-mono gap-1;
  }
</style>
