<script>
  import { createEventDispatcher } from "svelte";
  import { login, create_new_user } from "../requests.js";

  const dispatch = createEventDispatcher();

  let username = "";
  let password = "";
  let password_again = "";
  let remember;
  let new_user = false;
  let isLoading = false;

  async function onSubmit() {
    let new_tokens;
    if (new_user) {
      if (password !== password_again) {
        alert("Пароли не совпадают");
        return;
      }
      isLoading = true;
      new_tokens = await create_new_user(username, password);
    } else {
      isLoading = true;
      new_tokens = await login(username, password);
    }
    isLoading = false;
    if (new_tokens) {
      if (remember) localStorage.setItem("tokens", new_tokens);
      dispatch("message", {
        login_success: true,
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
          required="true"
        />
        <input
          bind:value={password}
          type="password"
          class="form-control"
          placeholder="Пароль"
          required="true"
        />
        {#if !new_user}
          <button class="w-100 btn-lg btn-primary" type="submit">Войти</button>
        {:else}
          <input
            bind:value={password_again}
            type="password"
            class="form-control"
            placeholder="Повторите пароль"
            required="true"
          />
        {/if}
        <div class="checkbox mb-3">
          <label>
            <input
              type="checkbox"
              value="remember-me"
              bind:checked={remember}
            /> Запомни меня
          </label>
        </div>
        {#if !new_user}
          <button
            class="w-100 btn-lg btn-secondary"
            on:click={() => {
              new_user = true;
            }}>Создать аккаунт</button
          >
        {:else}
          <button class="w-100 btn-lg btn-secondary" type="submit"
            >Создать аккаунт</button
          >
        {/if}
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
    width: 330px;
    height: 300px;
  }
  .form-signin .checkbox {
    font-weight: 400;
    margin-top: 15px;
  }
  .form-signin .form-control {
    position: relative;
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
