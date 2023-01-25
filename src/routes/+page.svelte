<script>
  // get token from local storage, if it's not present redirect to login
  import { onMount } from "svelte";

  onMount(() => {
    if (typeof localStorage !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "./login";
      } else {
        window.location.href = "./windfarms";
      }
    } else {
      window.location.href = "./login";
    }
  });
</script>
