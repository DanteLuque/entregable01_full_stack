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
}

export default Category;
