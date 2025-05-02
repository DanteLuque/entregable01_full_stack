import ModelBase from "../shared/model-base.js";

class Category extends ModelBase{
  constructor(
    id = null,
    nombre,
  ) {
    super();
    this.id = id;
    this.nombre = nombre;
  }

  static getAll(conexion) {
    return new Promise((resolve, reject) => {
      conexion.query(
        "SELECT * FROM CATEGORIAS WHERE deleted_at IS NULL",
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
        "SELECT * FROM CATEGORIAS WHERE ID = ? AND deleted_at IS NULL",
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
        "UPDATE CATEGORIAS SET deleted_at = ? WHERE ID = ? AND deleted_at IS NULL",
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
        "DELETE FROM CATEGORIAS WHERE ID = ?",
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
        "INSERT INTO CATEGORIAS (NOMBRE, created_at, updated_at) VALUES (?, ?, ?)",
        [this.nombre, this.created_at, this.updated_at],
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
        "UPDATE CATEGORIAS SET NOMBRE = ?, updated_at = ? WHERE ID = ? AND deleted_at IS NULL",
        [this.nombre, this.updated_at, this.id],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    });
  }
}

export default Category;
