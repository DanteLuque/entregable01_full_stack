import conexion from '../config/mysql.js';
import Product from '../models/product.model.js';

export const getAllProducts = async (req, res)=>{
  try{
    const products = await Product.getAll(conexion);
    res.render('product/index', {products, searchTerm: ''});
  }catch(error){
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al cargar productos');
  }
}

export const getAllProductsToCatalog = async (req, res) => {
  try {
      const products = await Product.getAll(conexion);
      res.render('catalog/index', { products });
  } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).send('Error al cargar productos');
  }
}

