<script>
	import RegistrationForm from "./RegistrationForm.svelte"

	let username = "";
	let password = "";
	let waitResponse = false;

	function submit() {
		waitResponse = true;
		// request to server
		console.log(username, password);
		setTimeout(() => {
			waitResponse = false;
		}, 2000);
	}
</script>

<form on:submit|preventDefault={submit}>
	<p>Введите логин и пароль</p>
	<input type="text" placeholder="Имя пользователя" bind:value={username}>
	<input type="text" placeholder="Пароль" bind:value={password}>
	<button type="submit">Вход</button>
	{#if waitResponse}
		<p>Подождите</p>
	{/if}
</form>

<style>

</style>