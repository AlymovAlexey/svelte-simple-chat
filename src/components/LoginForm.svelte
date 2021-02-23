<script>
  import { createEventDispatcher } from "svelte";
  import { login, checkToken, refreshToken } from "../requests.js";

  const dispatch = createEventDispatcher();

  let username = "";
  let password = "";
  let isLoading = false;

  function onSubmit() {
    isLoading = true;
    const new_tokens = login(username, password);
    setTimeout(() => {
      isLoading = false;
    }, 2000);
    if (new_tokens) {
      localStorage.setItem("tokens", new_tokens);
      dispatch("message", {
        login: true,
        user: username,
      });
    }
  }
</script>

<div class="container-login">
  <div class="form-signin text-center">
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
  </div>
</div>

<style>
  .btn-primary,
  .btn-primary:hover,
  .btn-primary:active,
  .btn-primary:visited {
    background-color: #05728f !important;
    border: #05728f;
  }
  .container-login {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    overflow: auto;
  }
  .form-signin {
    /* width: 100%; */
    width: 330px;
    height: 300px;
    /* padding: 15px; */
    /* margin: auto; */
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
