<script>
  import { Link } from "svelte-routing";
  export const urls = [
    {path: "/", name: "Чат"},
    {path: "/settings", name: "Настройки"},
    {path: "/about", name: "О нас"},
  ]
</script>

<header>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          {#each urls as {path, name}}
          <li class="nav-item">
            <Link to={path} class="nav-link active" aria-current="page">{name}</Link>
          </li>
          {/each}
        <ul class="navbar-nav d-flex">
          <li class="nav-item">
            <Link to="/login"class="nav-link active" aria-current="page">Выход</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
