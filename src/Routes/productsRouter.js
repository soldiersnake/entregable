import { Router } from "express";
import ProductManager from "../../data/ProductManager.js";

const router = Router();
const pm = new ProductManager();

router.get('/', async (req, res) => {

    const productos = await pm.getProduct();
  
  res.send({productos});
});

router.get('/:id', async(req, res) => {
    let producto = await pm.getProductById(Number(req.params.id));
    console.log(producto);

    res.send(producto);
});


export default router;