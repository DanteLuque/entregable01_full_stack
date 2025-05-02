# Tienda Online - CRUD de Productos y Categorías

Sistema completo de gestión de productos y categorías desarrollado con **Node.js**, **Express**, **MySQL** y **EJS**.

## 🔄 Características

-   Gestión CRUD para productos y categorías.
    
-   Carga de imagen de productos con validaciones.
    
-   Catálogo público con filtros por búsqueda, categoría y precio.
    
-   Confirmaciones con SweetAlert para guardar/editar/eliminar.
    
-   Interfaz responsiva con Bootstrap 5.
    

## 📅 Requisitos previos

-   Node.js (v16 o superior)
    
-   MySQL (v5.7 o superior)
    
-   npm (incluido con Node.js)
    

## 📚 Instalación

1.  Clona este repositorio:
    

```
git clone https://github.com/DanteLuque/entregable01_full_stack.git
cd entregable01_full_stack
```

2.  Instala las dependencias:
    

```
npm install
```

3.  Crea un archivo `.env` basado en `.env.example`:
    

```
# SERVER
PORT=3000

# DATABASE
HOST=localhost
USER=tu_usuario_mysql
PASSWORD=tu_contrasena_mysql
DB=ENTREGABLE01
```

4.  Crea la base de datos ejecutando estos scripts SQL:
    

```
# Dentro de MySQL
SOURCE src/config/database/mysql-base.sql;
SOURCE src/config/database/mysql-views.sql;
```

5.  Ejecuta el seed para agregar datos de prueba:
    

```
npm run seed
```

## 🚀 Ejecución

### Modo desarrollo

```
npm run dev
```

### Modo producción

```
npm start
```

Abre tu navegador en:

```
http://localhost:3000/
```

## 📁 Estructura del proyecto

```
danteluque-entregable01_full_stack/
├── app.js
├── package.json
├── .env.example
├── public/
│   ├── images/               # Imágenes subidas
│   └── js/                   # JS del cliente (preview, alerts, validaciones)
├── seed/
│   └── seed.js               # Script para insertar datos de prueba
└── src/
    ├── config/
    │   ├── mysql.js          # Conexión a base de datos
    │   └── database/         # Scripts SQL base y vistas
    ├── controllers/          # Lógica de controladores
    ├── middlewares/          # Middleware para uploads
    ├── models/               # Modelos de productos y categorías
    ├── routes/               # Rutas de productos y categorías
    ├── shared/               # Modelo base
    └── views/                # Vistas EJS para frontend
```

## 📝 Contribución

1.  Haz un fork del repositorio
    
2.  Crea una rama nueva (`git checkout -b feature/nueva-funcionalidad`)
    
3.  Realiza tus cambios
    
4.  Haz commit (`git commit -m 'Agregar nueva funcionalidad'`)
    
5.  Sube tus cambios (`git push origin feature/nueva-funcionalidad`)
    
6.  Abre un Pull Request