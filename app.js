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

app.get('/home', async (req, res) => {
  res.render('home/index');
});

app.use(categoryRouter);
app.use(productRouter);

app.listen(PORT, ()=>{
  console.log(`🕺 I'M ALIVE => PORT: ${PORT}`);
})