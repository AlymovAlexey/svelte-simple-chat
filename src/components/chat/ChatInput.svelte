<script>
  import Input from "./Input.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let msgInput;
</script>

<div>
  <form
    method="get"
    autocomplete="off"
    on:submit|preventDefault={(e) => {
      if (!msgInput || !msgInput.trim()) return;
      dispatch("message", msgInput);
      msgInput = "";
      e.target.msg.focus();
    }}
  >
    <Input
      multiline
      maxRows={3}
      bind:value={msgInput}
      name="msg"
      placeholder="Введите сообщение"
      ariaLabel="Message"
    />
  </form>
</div>

<style>
</style>
