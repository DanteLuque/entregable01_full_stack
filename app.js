import express from 'express';
import bodyParser from 'body-parser';
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

app.listen(PORT, ()=>{
  console.log(`I'M ALIVE => PORT: ${PORT}`);
})