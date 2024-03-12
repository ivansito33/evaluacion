
<script>
    import TablaProductos from '$lib/components/Tablaproductos.svelte';
    export let data;
    export let form;
    console.log(form);
  </script>
  
  <form method="POST" action="?/create" class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
    <label class="block mb-4">
      <span class="text-gray-700">Nombre:</span>
      <input
        name="Name"
        type="text"
        placeholder="Nombre del producto"
        class="border w-full p-2 mt-2"
        required
      />
    </label>
    <label class="block mb-4">
      <span class="text-gray-700">Descripción:</span>
      <textarea
        name="Description"
        placeholder="Descripción del producto"
        class="border w-full p-2 mt-2"
        required
      ></textarea>
    </label>
    <label class="block mb-4">
      <span class="text-gray-700">Precio:</span>
      <input
        name="Price"
        type="number"
        step="0.01"
        placeholder="Precio del producto"
        class="border w-full p-2 mt-2"
        required
      />
    </label>
    <button type="submit" class="bg-blue-500 text-white p-2 w-full">Crear Producto</button>
  </form>
  
  <!-- Utilizando el componente TablaProductos para mostrar productos -->
  <TablaProductos productos={data?.productos} />
  