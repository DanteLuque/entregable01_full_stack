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
        "SELECT * FROM VIEW_PRODUCTS_WITH_CATEGORY WHERE deleted_at IS NULL;",
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    });
  }

  static getById(conexion, id) {
    return new Promise((resolve, reject) => {
      conexion.query(
        "SELECT * FROM VIEW_PRODUCTS_WITH_CATEGORY WHERE ID=? AND deleted_at IS NULL;",
        [id],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result[0]);
        }
      );
    });
  }

  static delete(conexion, id) {
    return new Promise((resolve, reject) => {
      const now = new Date();
      conexion.query(
        "UPDATE PRODUCTOS SET deleted_at = ? WHERE ID = ? AND deleted_at IS NULL",
        [now, id],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    });
  }

  static hardDelete(conexion, id) {
    return new Promise((resolve, reject) => {
      conexion.query(
        "DELETE FROM PRODUCTOS WHERE ID = ?",
        [id],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    });
  }

  create(conexion) {
    return new Promise((resolve, reject) => {
      const now = new Date();
      this.created_at = now;
      this.updated_at = now;

      conexion.query(
        `INSERT INTO PRODUCTOS (
          ID_CATEGORIA, NOMBRE, DESCRIPCION, MARCA, MODELO, IMAGEN, PRECIO, DESCUENTO, PRECIO_ENVIO, CUOTAS, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          this.idCategoria,
          this.nombre,
          this.descripcion,
          this.marca,
          this.modelo,
          this.imagen,
          this.precio,
          this.descuento,
          this.precioEnvio,
          this.cuotas,
          this.created_at,
          this.updated_at,
        ],
        (error, result) => {
          if (error) return reject(error);
          this.id = result.insertId;
          return resolve(result);
        }
      );
    });
  }

  update(conexion) {
    return new Promise((resolve, reject) => {
      this.updated_at = new Date();

      conexion.query(
        `UPDATE PRODUCTOS SET 
          ID_CATEGORIA = ?, 
          NOMBRE = ?, 
          DESCRIPCION = ?, 
          MARCA = ?, 
          MODELO = ?, 
          IMAGEN = ?, 
          PRECIO = ?, 
          DESCUENTO = ?, 
          PRECIO_ENVIO = ?, 
          CUOTAS = ?, 
          updated_at = ?
        WHERE ID = ? AND deleted_at IS NULL`,
        [
          this.idCategoria,
          this.nombre,
          this.descripcion,
          this.marca,
          this.modelo,
          this.imagen,
          this.precio,
          this.descuento,
          this.precioEnvio,
          this.cuotas,
          this.updated_at,
          this.id,
        ],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    });
  }

  static search(conexion, searchTerm) {
    return new Promise((resolve, reject) => {
      const term = `%${searchTerm}%`;
      conexion.query(
        "SELECT * FROM VIEW_PRODUCTS_WITH_CATEGORY WHERE (NOMBRE LIKE ? OR MARCA LIKE ? OR MODELO LIKE ?) AND deleted_at IS NULL",
        [term, term, term],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    });
  }

  static searchAdvanced(conexion, searchTerm = '', sort = '', category = '') {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM VIEW_PRODUCTS_WITH_CATEGORY WHERE deleted_at IS NULL`;
      const params = [];
  
      if (searchTerm) {
        query += ` AND (NOMBRE LIKE ? OR MARCA LIKE ? OR MODELO LIKE ?)`;
        const term = `%${searchTerm}%`;
        params.push(term, term, term);
      }
  
      if (category) {
        query += ` AND ID_CATEGORIA = ?`;
        params.push(category);
      }
  
      if (sort === 'asc') {
        query += ` ORDER BY PRECIO ASC`;
      } else if (sort === 'desc') {
        query += ` ORDER BY PRECIO DESC`;
      }
  
      conexion.query(query, params, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  }
  

}

export default Product;
