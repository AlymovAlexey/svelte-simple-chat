<script>
  import { onMount } from "svelte";
  import { checkToken, refreshToken } from "./requests.js";
  import LoginForm from "./components/LoginForm.svelte";
  import Chat from "./components/chat/Chat.svelte";

  const tokens_key = "tokens";

  let login = false;

  onMount(async () => {
    try {
      const tokens = localStorage.getItem(tokens_key);
      const valid_token = await checkToken(tokens.success);
      if (valid_token) {
        login = true;
      } else {
        const new_tokens = await refreshToken(tokens.refresh);
        if (new_tokens) {
          localStorage.setItem(tokens_key, new_tokens);
          login = true;
        }
      }
    } catch (err) {}
  });

  function Login(event) {
    if (event.detail.login_success) {
      login = true;
    }
  }
  function logout() {
    login = false;
    localStorage.clear();
  }
</script>

{#if !login}
  <LoginForm on:message={Login} />
{:else}
  <Chat on:exit={logout} />
{/if}
