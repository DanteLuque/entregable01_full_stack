import express from 'express';
import categoryRouter from './src/routes/category.route.js';
import productRouter from './src/routes/product.route.js';
import dotenv from "dotenv";

dotenv.config();
const PORT=process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/', async (req, res) => {
  try{
    res.render('home/index');
  }catch(error){
    console.error('Error al cargar la página de inicio:', error);
    res.status(500).send('Error al cargar la página de inicio');
  }
});

app.use(categoryRouter);
app.use(productRouter);

app.listen(PORT, ()=>{
  console.log(`🕺 I'M ALIVE => PORT: ${PORT}`);
})