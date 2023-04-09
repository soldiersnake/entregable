import fs from "fs/promises";

class ProductManager {
  autoID = 1;
  constructor() {
    this.products = [];
    this.path = "./products.json";
  }
  async getProduct() {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      return JSON.parse(productFile);
    } catch (error) {
      await fs.writeFile(this.path, "[]");
      return [];
    }
  }

  async AddProduct(prod) {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let newProduct = JSON.parse(productFile);
      const inValid = newProduct.find(
        (p) => p.id === prod.id || p.code === prod.code
      );

      if (inValid) {
        throw "Revise alguno de los campos, que no sean repetidos o validos";
      }
      if (newProduct.length > 0) {
        const lastProduct = newProduct[newProduct.length - 1];
        this.autoID = lastProduct.id + 1;
      }
      newProduct.push({
        id: this.autoID++,
        ...prod,
      });
      await fs.writeFile(this.path, JSON.stringify(newProduct, null, 2));
      return `Se ha creado el producto ${prod.title} con el ID: ${
        this.autoID - 1
      }`;
    } catch (e) {
      throw "No se puede crear el producto";
    }
  }

  async getProductById(id) {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let idProduct = JSON.parse(productFile);
      const searchProduct = await idProduct.find((p) => p.id == id);
  
      if (!searchProduct) {
        return `No se encontro el producto con el ID ${id}`;
      }
      
      return searchProduct;
    } catch (e) {
      return `No se encontro el producto con el ID ${id}`
    }

  }

  async updateProductsById(id, data) {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let products = JSON.parse(productFile);
      const searchIndexProduct = await products.findIndex((p) => p.id == id);

      products.splice(searchIndexProduct, 1, { id, ...data });

      await fs.writeFile(this.path, JSON.stringify(products, null, 2));

      return `Producto ${data.title} con ID: ${id}, ha sido modificado correctamente`;
    } catch (error) {
      return `No existe producto con ID: ${id}`;
    }
  }

  async deleteProducts(id) {
    try {
      const productFile = await fs.readFile(this.path, "utf-8");
      let products = JSON.parse(productFile);
      const searchIndexProduct = await products.find((p) => p.id == id);

      if (!searchIndexProduct) {
        throw `No existe ID: ${id}`;
      }

      const deleteProducts = await products.filter((p) => p.id != id);
      await fs.writeFile(this.path, JSON.stringify(deleteProducts, null, 2));
      return `Producto con ID: ${id}, ha sido eliminado correctamente`;
    } catch (e) {
      return `No existe producto con ID: ${id}`;
    }
  }
}

// const pm = new ProductManager();

// const product1 = {
//   title: "Manza Roja del bosque",
//   description: "Fruto muy rico con mucho color",
//   price: 123,
//   thumbnail: "sin foto",
//   code: "13123lkjlkjasd",
//   stock: 654654,
// }

// const main = async() =>{
//   console.log( await pm.getProduct());
//   console.log( await pm.AddProduct({...product1}));
// };

// main()

export default ProductManager;
