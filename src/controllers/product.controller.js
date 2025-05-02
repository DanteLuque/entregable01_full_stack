import conexion from '../config/mysql.js';
import Category from '../models/category.model.js';
import Product from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll(conexion);
    res.render('product/index', { products, searchTerm: '' });
  } catch (error) {
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
  try {
    const categories = await Category.getAll(conexion);
    res.render('product/create', { categories });
  } catch (error) {
    console.error('Error al cargar el formulario de creación:', error);
    res.status(500).send('Error al cargar el formulario de creación');
  }
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

export const showEditForm = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.getById(conexion, id);
    const categories = await Category.getAll(conexion);

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    res.render('product/edit', { product, categories });
  } catch (error) {
    console.error('Error al obtener producto para editar:', error);
    res.status(500).send('Error al cargar la página de edición');
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { idCategoria, nombre, descripcion, marca, modelo, precio, descuento, precioEnvio, cuotas, current_image } = req.body;
    
    const imagen = req.file ? `/images/${req.file.filename}` : current_image;
    
    const product = new Product(
      id,
      idCategoria,
      nombre,
      descripcion,
      marca,
      modelo,
      imagen,
      parseFloat(precio),
      descuento ? parseFloat(descuento) : null,
      precioEnvio ? parseFloat(precioEnvio) : null,
      cuotas ? parseInt(cuotas) : null
    );
    
    await product.update(conexion);
    res.redirect('/products');
  } catch (error) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send('La imagen es demasiado grande, el tamaño máximo permitido es 2MB');
    }
    console.error('Error al actualizar producto:', error);
    res.status(500).send('Error al actualizar el producto');
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.delete(conexion, id);
    res.redirect('/products');
  } catch (error) {
    console.error('Error al eliminar un producto:', error);
    res.status(500).send('Error al eliminar el producto');
  }
};

export const searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const products = await Product.search(conexion, searchTerm);
    res.render('product/index', { products, searchTerm });
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).send('Error al buscar productos');
  }
};