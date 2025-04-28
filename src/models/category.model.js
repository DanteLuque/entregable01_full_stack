import ModelBase from "../shared/model-base";

class Category extends ModelBase{
  constructor(
    id = null,
    nombre,
  ) {
    super();
    this.id = id;
    this.nombre = nombre;
  }
}

export default Category;
