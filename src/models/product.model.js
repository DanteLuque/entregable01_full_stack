import ModelBase from "../shared/model-base.js";

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

  static getAll(conexion) {
    return new Promise((resolve, reject) => {
      conexion.query(
        "SELECT * FROM PRODUCTOS WHERE deleted_at IS NULL",
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    });
  }
}

export default Product;
