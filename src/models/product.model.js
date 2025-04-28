import ModelBase from "../shared/model-base";

class Product extends ModelBase{
  constructor(
    id = null,
    idCategoria,
    nombre,
    descripcion,
    marca = null,
    modelo = null,
    imagen = null,
    precio,
    descuento = null,
    precioEnvio = null,
    cuotas = null
  ) {
    super();
    this.id = id;
    this.nombre = nombre;
    this.idCategoria = idCategoria;
    this.descripcion = descripcion;
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.descuento = descuento;
    this.precioEnvio = precioEnvio;
    this.cuotas = cuotas;
    this.imagen = imagen;
  }
}

export default Product;
