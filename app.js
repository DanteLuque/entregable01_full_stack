import express from 'express';
import bodyParser from 'body-parser';
import homeRouter from './src/routes/home.route.js';
import categoryRouter from './src/routes/category.route.js';
import productRouter from './src/routes/product.route.js';
import dotenv from "dotenv";
dotenv.config();
const PORT=process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express(express.json));
app.use(homeRouter);
app.use(categoryRouter);
app.use(productRouter);

app.listen(PORT, ()=>{
  console.log(`I'M ALIVE => PORT: ${PORT}`);
})