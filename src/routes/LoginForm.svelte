<script>
  import { navigate } from "svelte-routing";

  let username = "";
  let password = "";
  let isLoading = false;

  function onSubmit() {
    isLoading = true;
    console.log(username, password);
    setTimeout(() => {
      isLoading = false;
      navigate("/", { replace: true });
    }, 2000);
  }
</script>

<div class="container">
  <main class="form-signin text-center">
    {#if isLoading}
      <div class="spinner-border m-" role="status">
        <span class="sr-only" />
      </div>
    {:else}
      <form on:submit|preventDefault={onSubmit}>
        <img class="mb-4" src="./log-in.svg" alt="" width="72" height="57" />
        <h1 class="h3 mb-3 fw-normal">Авторизация</h1>
        <input
          bind:value={username}
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Электронная почта"
          required=""
        />
        <input
          bind:value={password}
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Пароль"
          required=""
        />
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Запомни меня
          </label>
        </div>
        <button class="w-100 btn-lg btn-primary" type="submit">Войти</button>
      </form>
    {/if}
  </main>
</div>

<style>
.btn-primary, .btn-primary:hover, .btn-primary:active, .btn-primary:visited {
    background-color: #05728f !important;
    border: #05728f;
}
</style>