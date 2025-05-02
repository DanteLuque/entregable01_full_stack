import conexion from '../config/mysql.js';
import Category from '../models/category.model.js';
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

export const viewProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.getById(conexion, id);

    if (!product) {
      return res.status(404).send('producto no encontrado');
    }

    res.render('product/view', { product });
  } catch (error) {
    console.error('Error al obtener detalles del producto:', error);
    res.status(500).send('Error al cargar los detalles del producto');
  }
};

export const showCreateForm = async (req, res) => {
  const categories = await Category.getAll(conexion);
  res.render('product/create', {categories});
};

export const saveProduct = async (req, res) => {
  try {
    const { idCategoria, nombre, descripcion, marca, modelo, precio, descuento, precioEnvio, cuotas } = req.body;
    const imagen = req.file ? `/images/${req.file.filename}` : null;

    const product = new Product(
      null,
      idCategoria,
      nombre,
      descripcion,
      marca,
      modelo,
      imagen,
      parseFloat(precio),
      parseFloat(descuento),
      parseFloat(precioEnvio),
      parseInt(cuotas)
    );

    await product.create(conexion);
    res.redirect('/products');
  } catch (error) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send('La imagen es demasiado grande, el tamaño máximo permitido es 2MB');
    }
    console.error('Error al guardar producto:', error);
    res.status(500).send('Error al guardar el producto');
  }
};