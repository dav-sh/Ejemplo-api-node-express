const express = require("express");
const app = express();
const port = 3000;
//Mensajes en consola acerca del estado del servidor
const morgan = require("morgan");
app.use(morgan("tiny"));
//Para usar json
app.use(express.json());
//Array para simular operaciones CRUD
var products = [{ id: 1, name: "laptop", price: 100 }];

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/products", (req, res) => {
  console.log("Solicitando productos");
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  console.log(`Solicitando producto id: ${req.params.id}`);
  const prod = products.find((p) => p.id === parseInt(req.params.id));
  res.json(prod ? prod : { message: "Product not found" });
});
app.get("/products", (req, res) => {
  console.log("Solicitando productos");
  res.json(products);
});
app.post("/products", (req, res) => {
  console.log("enviando producto para ser agregado");
  //Yo le agrego el id
  const p_withID = { ...req.body, id: products.length + 1 };
  products.push(p_withID);
  res.json(req.body).status(200);
});
app.put("/products/:id", (req, res) => {
  console.log(`Buscando producto con id: ${req.params.id}`);
  var prod = products.find((p) => p.id === parseInt(req.params.id));

  if (!prod) {
    return res.status(404).json({ message: "Product not found" });
  }

  console.log(`producto encontrado id: ${req.params.id}`);
  prod = { ...prod, ...req.body };
  console.log(prod);
  res.status(200).json({ message: "Product updated successfully" });
});
app.delete("/products/:id", (req, res) => {
  console.log(`eliminando producto id: ${req.params.id}`);
  const prod = products.find(
    (product) => product.id === parseInt(req.params.id)
  );

  if (!prod) {
    return res.status(404).json({ message: "Product not found" });
  }
  products = products.filter((product) => prod.id !== parseInt(req.params.id));
  res.json({ message: "Product deleted successfully" }).status(204);
});

app.listen(port, () =>
  console.log(`Servidor corriendo / escuchando en puerto: ${port}!`)
);
