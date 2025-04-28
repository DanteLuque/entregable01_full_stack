import conexion from '../config/mysql.js';
import Category from '../models/category.model.js';

export const getAllCategory = async (req, res)=>{
  try{
    const categories = await Category.getAll(conexion);
    res.render('category/index', {categories});
  }catch(error){
    console.error('Error al obtener categorias:', error);
    res.status(500).send('Error al cargar categorias');
  }
}