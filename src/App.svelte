<script>
  import { Router, Route } from "svelte-routing";
  import About from "./routes/About.svelte";
  import NavBar from "./components/NavBar.svelte";
  import LoginForm from "./routes/LoginForm.svelte"
  import Chat from "./routes/Chat.svelte"
  import SettingsForm from "./components/SettingsForm.svelte"

  // let login = "";
  export let url = "";

</script>

<Router url="{url}">
	  <NavBar />
    <Route path="login" component={LoginForm} />
    <Route path="about" component={About} />
	  <Route path="settings" component={SettingsForm} />
    <Route path="/" component={Chat} />
</Router>