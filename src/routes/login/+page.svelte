<script>
  import axios from "axios";

  let errorMessage = "";

  function handleLogin(event) {
    const apiUrl = "https://dockyard-handler.herokuapp.com/login";
    const username = event.target.form.username.value;
    const password = event.target.form.password.value;

    axios
      .get(apiUrl + "?username=" + username + "&password=" + password)
      .then((response) => {
        if (response.status === 200 && response.data.jwtToken) {
          const token = response?.data?.jwtToken;
          localStorage.setItem("token", token);
          window.location.href = "./windfarms";
        } else {
          errorMessage = "Credenziali errate";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
</script>

<div class="h-screen">
  <div class="flex flex-col items-center justify-center h-3/4">
    <!-- Login form -->
    <form class="w-11/12 md:w-1/3 flex flex-col gap-3 p-5 rounded font-mono">
      <div class="flex flex-col">
        <label for="username">Username</label>
        <input
          type="username"
          name="username"
          id="username"
          placeholder="Username"
          class="ring-2 ring-gray-300 rounded-md p-2 text-black"
        />
      </div>
      <div class="flex flex-col">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          class="ring-2 ring-gray-300 rounded-md p-2 text-black"
        />
      </div>
      {#if errorMessage}
        <div class="text-red-500">{errorMessage}</div>
      {/if}
      <button
        type="submit"
        class="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200"
        on:click|preventDefault={(event) => {
          handleLogin(event);
        }}
      >
        Login</button
      >
    </form>
  </div>
</div>
