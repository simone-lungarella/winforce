<script>
  import axios from "axios";

  let errorMessage = "";

  function handleLogin(event) {
    const apiUrl = "http://localhost:8080/login";
    const username = event.target.form.username.value;
    const password = event.target.form.password.value;

    axios
      .get(apiUrl + "?username=" + username + "&password=" + password)
      .then((response) => {
        if (response.status === 200) {
          const token = response?.data?.jwtToken;
          localStorage.setItem("token", token);
          window.location.href = "/windfarms";
        } else if (response.status === 401) {
          errorMessage = "Username or password is incorrect";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
</script>

<div
  class="flex flex-col items-center justify-center md:min-h-screen mt-32 md:mt-0"
>
  <!-- Login form -->
  <form
    class="md:w-1/2 flex flex-col gap-3 bg-gray-800 p-5 rounded ring-2 ring-gray-500 font-mono"
  >
    <div class="flex flex-col">
      <label for="username">Username</label>
      <input
        type="username"
        name="username"
        id="username"
        placeholder="Username"
        class="border border-gray-300 rounded-md p-2 text-black"
      />
    </div>
    <div class="flex flex-col">
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        class="border border-gray-300 rounded-md p-2 text-black"
      />
    </div>
    <div class="flex flex-col">
      <button
        type="submit"
        class="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200"
        on:click={(event) => {
          event.preventDefault();
          handleLogin(event);
        }}
      >
        Login</button
      >
      <div class="text-red-500">{errorMessage}</div>
    </div>
  </form>
</div>
