<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let search;

  function handleKeyPress(e) {
    if (e.which === 13) {
      dispatch("submit", {
        text: search,
      });
      search = "";
    }
  }
  function exit(e) {
    dispatch("exit");
  }
</script>

<div class="headind_srch">
  <div class="recent_heading">
    <button type="button" class="btn btn-light" on:click={exit}>Выход</button>
  </div>
  <div class="srch_bar">
    <div class="stylish-input-group">
      <input
        type="text"
        class="search-bar"
        placeholder="Поиск"
        bind:value={search}
        on:keypress={handleKeyPress}
      />
      <span class="input-group-addon">
        <button type="button">
          <i class="fa fa-search" aria-hidden="true" />
        </button>
      </span>
    </div>
  </div>
</div>

<style>
  .headind_srch {
    padding: 10px 29px 10px 20px;
    overflow: hidden;
    border-bottom: 1px solid #c4c4c4;
  }
  .recent_heading {
    float: right;
    width: 15%;
  }
  .srch_bar {
    display: inline-block;
    text-align: right;
    width: 85%;
  }
  .srch_bar input {
    float: left;
    border: 1px solid #cdcdcd;
    border-width: 0 0 1px 0;
    width: 70%;
    padding: 2px 0 4px 6px;
    background: none;
  }
  .srch_bar .input-group-addon button {
    background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
    border: medium none;
    padding: 0;
    color: #707070;
    font-size: 18px;
  }
  .srch_bar .input-group-addon {
    margin: 0 0 0 -27px;
  }
</style>
