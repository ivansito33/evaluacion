let productos = [{
    Id:'12',
    Name:'ivan',
    Description:'mauricio',
    Price:'12.05'
  
  }
      
  ];
  
  export const load = () => {
    return {
      productos,
    };
  };
  
  export const actions = {
    create: async({ request})=> {
      const formData = await request.formData();
      const Name = formData.get('Name');
      const Description = formData.get('Description');
      const Price = formData.get('Price');
      const Id= crypto.randomUUID()
  
      const product = {
        Name,
        Description,
        Price,
        Id
      };
  
      productos.push(product);
  
      return {
        body: {
          success: true,
        },
      };
    },


     delete: async({request})=>{
        const formData= await request.formData()
        const Id= formData.get('Id')
        console.log(Id)

        productos=productos.filter(producto=>producto.Id !=Id)
        
     }      
  };