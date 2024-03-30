import { db } from './db/index.js';
import express from 'express';
import morgan from 'morgan';
import * as schema from "./db/schema.js";
import { eq } from 'drizzle-orm';

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  app.get("/", (req, res) => {
    res.json({ message: "hello world!" });
  });

  app.get("/products", async (req, res) => {
    const products = await db.query.products.findMany();
    res.json(products);
  });

  app.post("/products", async (req, res) => {
    let { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required!" });
    }
    let product = await db.query.products.findFirst({
      where: eq(schema.products.name, name)
    });
    if (product) {
      return res.status(409).json({ message: "Product already exists!" });
    }

    name = name.trim().toUpperCase();
    product = await db.insert(schema.products).values({ name, price }).returning();
    console.log("Product created", product);
    res.json(product);
  });

app.delete('/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const deletedProduct = await db.delete(schema.products).where(eq(schema.products.id, productId)).returning();
  if (deletedProduct.length === 0) {
    return res.status(404).json({ message: "Product not found!" });
  }
  console.log("Product deleted", deletedProduct);
  res.json(deletedProduct);
});

app.put("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  let  { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required!" });
  }

  const existingProduct = await db.query.products.findFirst({
    where: eq(schema.products.id, productId)
  });

  if (!existingProduct) {
    return res.status(404).json({ message: "Product not found!" });
  }

   name = name.trim().toUpperCase();
  const updatedProduct = await db.update(schema.products).set({ name, price }).where(eq(schema.products.id, productId)).returning();
  console.log("Product updated", updatedProduct);
  res.json(updatedProduct);
});



  

  
  console.log(`Server is running on port ${PORT} 🚀`);
});
