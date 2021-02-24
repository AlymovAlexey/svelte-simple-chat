<script>
  import { afterUpdate, onMount, tick } from "svelte";
  import { getDialogs, getMessages } from "../../requests.js";
  import ChatInput from "./ChatInput.svelte";
  import ChatHead from "./ChatHead.svelte";

  const locale = "ru";

  let messages = [];
  let msg_count = 16;
  let msg_hist;
  let dialog_from;
  let dialogs = [];
  let active_dialog_id;

  function scrollToBottom() {
    msg_hist.scrollTo({ left: 0, top: msg_hist.scrollHeight });
  }

  onMount(async () => {
    dialogs = await getDialogs();
    active_dialog_id = findLastDialogId();
    getHistory(active_dialog_id);
    await tick();
    scrollToBottom();
  });

  afterUpdate(() => {
    msg_hist.scrollTo(0, msg_hist.scrollHeight);
  });

  function findLastDialogId() {
    dialogs = dialogs.sort((a, b) => {
      const a_date = new Date(
        a.date.replace(/(\d+).(\d+).(\d+){4}/, "$3/$2/$1")
      );
      const b_date = new Date(
        b.date.replace(/(\d+).(\d+).(\d+){4}/, "$3/$2/$1")
      );
      if (a_date > b_date) {
        return 1;
      } else if (a_date < b_date) {
        return -1;
      } else {
        return 0;
      }
    });
    return dialogs[0].id;
  }

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
        text: new_msg_text.split("\n"),
        date: now_datetime,
      },
    ];
  }

  function chooseDialog(dialog_id) {
    active_dialog_id = dialog_id;
    getHistory(dialog_id);
  }

  async function getHistory(dialog_id) {
    messages = await getMessages(dialog_id);
  }

  async function findDialog(event) {
    const search_string = event.detail.text.toLowerCase();
    const found_dialog = dialogs.find((element) => {
      const name = element.from.toLowerCase();
      return name.includes(search_string);
    });

    if (found_dialog) {
      const name = found_dialog.from.toLowerCase();
      const selectionStart = name.indexOf(search_string);
      chooseDialog(found_dialog.id);

      await tick();

      dialog_from.innerHTML = found_dialog.from.replace(
        new RegExp(search_string, "i"),
        `<span style="background-color:yellow;";>${event.detail.text}</span>`
      );
    } else {
      alert("Не найдено. Поиск ведётся только по ФИО.");
    }
  }
</script>

<div class="container-chat">
  <div class="inbox_msg">
    <div class="inbox_people">
      <ChatHead on:submit={findDialog} on:exit />
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
                {#if dialog.id === active_dialog_id}
                  <h5 bind:this={dialog_from}>
                    {@html dialog.from}
                    <span class="chat_date">{dialog.date}</span>
                  </h5>
                {:else}
                  <h5>
                    {@html dialog.from}
                    <span class="chat_date">{dialog.date}</span>
                  </h5>
                {/if}
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
                <p>
                  {#each message.text as line_text}
                    {line_text}<br />
                  {/each}
                </p>
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
  .container-chat {
    height: 100%;
  }
  img {
    max-width: 100%;
  }
  .inbox_people {
    background: #f8f8f8 none repeat scroll 0 0;
    float: left;
    overflow: hidden;
    width: 25%;
    border-right: 1px solid #c4c4c4;
  }
  .inbox_msg {
    border: 1px solid #c4c4c4;
    clear: both;
    height: 100%;
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
    width: 60%;
  }
  .mesgs {
    float: left;
    padding: 30px 15px 0 25px;
    width: 75%;
    height: 100%;
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
    width: 60%;
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
    height: 85%;
    overflow-y: auto;
  }
</style>
