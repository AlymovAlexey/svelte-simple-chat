<script>
  import LoginForm from "./components/LoginForm.svelte";
  import Chat from "./components/chat/Chat.svelte";

  let login = false;

  function checkLogin(event) {
    if (event.detail.login) {
      login = true;
      console.log(event.detail.user);
    }
  }
  function logout() {
    login = false;
  }
</script>

{#if !login}
  <LoginForm on:message={checkLogin} />
{:else}
  <Chat on:exit={logout} />
{/if}
