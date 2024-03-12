<script>
    import { onMount } from 'svelte';
  
    export let productos = [
      {
        Id: 'mau',
        Name: 'hola',
        Description: 'queloque',
        Price: '45',
        // Agrega una propiedad avatar con una URL de imagen aleatoria de Lorem Picsum
        avatar: `https://picsum.photos/50/50?random=${Math.random()}`,
      },
    ];
  
    // Función para generar una URL de imagen aleatoria para el avatar
    function generateRandomAvatar() {
      return `https://picsum.photos/50/50?random=${Math.random()}`;
    }
  
    onMount(() => {
      // Genera avatares aleatorios para cada producto
      productos = productos.map(producto => ({
        ...producto,
        avatar: generateRandomAvatar(),
      }));
    });
  </script>
  
  <div class="p-4">
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">id</th>
          <th class="py-2 px-4 border-b">Avatar</th>
          <th class="py-2 px-4 border-b">name</th>
          <th class="py-2 px-4 border-b">description</th>
          <th class="py-2 px-4 border-b">price</th>
          <th class="py-2 px-4 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {#each productos as product}
          <tr>
            <td class="py-2 px-4 border-b">{product.Id}</td>
            <td class="py-2 px-4 border-b">
              <!-- Muestra la imagen del avatar -->
              <img src={product.avatar} alt="Avatar" class="w-10 h-10 rounded-full">
            </td>
            <td class="py-2 px-4 border-b">{product.Name}</td>
            <td class="py-2 px-4 border-b">{product.Description}</td>
            <td class="py-2 px-4 border-b">{`$${product.Price}`}</td>
            <td class="py-2 px-4 border-b">
              <form method="POST" action="?/delete">
                <input type="hidden" name="Id" hidden value="{product.Id}">
                <button class="bg-red-500 text-white p-2">Eliminar</button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  