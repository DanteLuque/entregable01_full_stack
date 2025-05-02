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

export const showCreateForm = (req, res) => {
  try{
    res.render('category/create');
  }catch(error){
    console.error('Error al cargar el formulario de creación:', error);
    res.status(500).send('Error al cargar el formulario de creación');
  }
};

export const saveCategory = async (req, res) => {
  try {
    const { nombre } = req.body;
    const category = new Category(null, nombre);

    await category.create(conexion);
    res.redirect('/categories');
  } catch (error) {
    console.error('Error al guardar categoría:', error);
    res.status(500).send('Error al guardar la categoría');
  }
};

export const showEditForm = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.getById(conexion, id);

    if (!category) {
      return res.status(404).send('Categoría no encontrada');
    }

    res.render('category/edit', { category });
  } catch (error) {
    console.error('Error al obtener categoría para editar:', error);
    res.status(500).send('Error al cargar la página de edición');
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre } = req.body;

    const category = new Category(id, nombre);
    await category.update(conexion);

    res.redirect('/categories');
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).send('Error al actualizar la categoría');
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.delete(conexion, id);
    res.redirect('/categories');
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).send('Error al eliminar la categoría');
  }
};