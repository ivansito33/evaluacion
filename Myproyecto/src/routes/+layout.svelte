<script>
  
    import '../app.css';
  </script>
  
  <div class="navbar bg-blue-500 p-4">
    <div class="flex items-center justify-between">
      <a href="/" class="text-white font-bold text-xl">Mi Layado</a>
      
      <ul class="flex space-x-4">
        <li><a href="/" class="text-white">Inicio</a></li>
        <li><a href="/peliculas" class="text-white">peliculas</a></li>
        <li><a href="/productos" data-sveltekit-prefecth class="text-white">productos</a></li>
      </ul>
    </div>
  </div>
  <slot/>