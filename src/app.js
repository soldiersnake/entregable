import express from "express";
import ProductsRoutes from './Routes/productsRouter.js';
import CarsRoutes from './Routes/carsRouter.js';

const app = express();
const PORT = 8087;

app.use(express.json());
app.use(express.urlencoded({ extended:true} ));
app.use(express.static('public'));

app.use('/api/products', ProductsRoutes);
app.use('/api/cars', CarsRoutes);



app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})