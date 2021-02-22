<script>
  import { afterUpdate, onMount, tick } from "svelte";
  import { getDialogs, getMessages } from "../requests.js"
  import ChatInput from "../components/Chat/ChatInput.svelte";
  import ChatHead from "../components/Chat/ChatHead.svelte";
  let messages = [];
  let msg_count = 16;
  let msg_hist;
  let active_dialog_id = 0;
  const locale = "ru";

  function scrollToBottom() {
    msg_hist.scrollTo({ left: 0, top: msg_hist.scrollHeight });
  }

  onMount(async () => {
    getHistory(active_dialog_id);
    await tick();
    scrollToBottom();
  });

  afterUpdate(() => {
    msg_hist.scrollTo(0, msg_hist.scrollHeight);
  });

  function appendMessage(new_msg_text) {
    msg_count += 1;
    const now = new Date();
    const now_datetime =
      now.toLocaleTimeString(locale) + " " + now.toLocaleDateString(locale);
    messages = [
      ...messages,
      {
        id: msg_count,
        side: "outgoing_msg",
        type: "send_msg",
        text: new_msg_text,
        date: now_datetime,
      },
    ];
  }

  function chooseDialog(dialog_id) {
    active_dialog_id = dialog_id;
    getHistory(dialog_id);
  }

  function getHistory(dialog_id) {
    messages = getMessages(dialog_id);
  }
  const dialogs = getDialogs()
</script>

<div class="container">
  <div class="inbox_msg">
    <div class="inbox_people">
      <ChatHead />
      <div class="inbox_chat">
        {#each dialogs as dialog}
          <div
            class:active_chat={dialog.id === active_dialog_id}
            class="chat_list"
            on:click={() => chooseDialog(dialog.id)}
          >
            <div class="chat_people">
              <div class="chat_img">
                <img src={dialog.avatar} alt="sunil" />
              </div>
              <div class="chat_ib">
                <h5>
                  {dialog.from} <span class="chat_date">{dialog.date}</span>
                </h5>
                <p>
                  {dialog.last_message}
                </p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <div class="mesgs">
      <div bind:this={msg_hist} class="msg_history">
        {#each messages as message}
          <div class={message.side}>
            {#if message.side === "incoming_msg"}
              <div class="received_withd_msg">
                <p>{message.text}</p>
                <span class="time_date"> {message.date} </span>
              </div>
            {:else}
              <div class="sent_msg">
                <p>{message.text}</p>
                <span class="time_date"> {message.date} </span>
              </div>
            {/if}
          </div>
        {/each}
      </div>
      <div class="type_msg">
        <div class="input_msg_write">
          <ChatInput
            on:message={(e) => {
              appendMessage(e.detail);
            }}
          />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  img {
    max-width: 100%;
  }
  .inbox_people {
    background: #f8f8f8 none repeat scroll 0 0;
    float: left;
    overflow: hidden;
    width: 40%;
    border-right: 1px solid #c4c4c4;
  }
  .inbox_msg {
    border: 1px solid #c4c4c4;
    clear: both;
    overflow: hidden;
  }
  .chat_ib h5 {
    font-size: 15px;
    color: #464646;
    margin: 0 0 8px 0;
  }
  .chat_ib h5 span {
    font-size: 13px;
    float: right;
  }
  .chat_ib p {
    font-size: 14px;
    color: #989898;
    margin: auto;
  }
  .chat_img {
    float: left;
    width: 11%;
  }
  .chat_ib {
    float: left;
    padding: 0 0 0 15px;
    width: 88%;
  }
  .chat_people {
    overflow: hidden;
    clear: both;
  }
  .chat_list {
    border-bottom: 1px solid #c4c4c4;
    margin: 0;
    padding: 18px 16px 10px;
  }
  .inbox_chat {
    height: 600px;
    overflow-y: scroll;
  }
  .active_chat {
    background: #ebebeb;
  }
  .received_withd_msg p {
    background: #ebebeb none repeat scroll 0 0;
    border-radius: 3px;
    color: #646464;
    font-size: 14px;
    margin: 0;
    padding: 5px 10px 5px 12px;
    width: 100%;
  }
  .time_date {
    color: #747474;
    display: block;
    font-size: 12px;
    margin: 8px 0 0;
  }
  .received_withd_msg {
    width: 57%;
  }
  .mesgs {
    float: left;
    padding: 30px 15px 0 25px;
    width: 60%;
  }
  .sent_msg p {
    background: #05728f none repeat scroll 0 0;
    border-radius: 3px;
    font-size: 14px;
    margin: 0;
    color: #fff;
    padding: 5px 10px 5px 12px;
    width: 100%;
  }
  .outgoing_msg {
    overflow: hidden;
    margin: 26px 0 26px;
  }
  .sent_msg {
    float: right;
    width: 46%;
  }
  .input_msg_write {
    background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
    border: medium none;
    color: #4c4c4c;
    font-size: 15px;
    min-height: 48px;
    width: 100%;
  }
  .type_msg {
    border-top: 1px solid #c4c4c4;
    position: relative;
  }
  .messaging {
    padding: 0 0 50px 0;
  }
  .msg_history {
    height: 516px;
    overflow-y: auto;
  }
</style>
