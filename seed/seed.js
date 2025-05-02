import conexion from "../src/config/mysql.js";

const seed = async () => {
    try {
        const now = new Date();
        const categorias = ['Tecnología', 'Accesorios', 'Hogar'];

        for (const nombre of categorias) {
            await conexion.promise().query(
                'INSERT IGNORE INTO CATEGORIAS (NOMBRE, created_at, updated_at) VALUES (?, ?, ?)',
                [nombre, now, now]
            );
        }

        const [rows] = await conexion.promise().query('SELECT ID, NOMBRE FROM CATEGORIAS');
        const categoriasMap = Object.fromEntries(rows.map(cat => [cat.NOMBRE, cat.ID]));

        const productos = [
            ['Laptop Lenovo', 'Laptop con 16GB RAM', 'Lenovo', 'ThinkPad', 1500, 10, 30, 6, '/images/image-not-found.jpg', categoriasMap['Tecnología']],
            ['Mouse Logitech', 'Mouse inalámbrico', 'Logitech', 'M185', 20, 0, 10, null, '/images/image-not-found.jpg', categoriasMap['Accesorios']],
            ['Teclado Redragon', 'Teclado mecánico RGB', 'Redragon', 'K552', 55.99, 5, 15, 3, '/images/image-not-found.jpg', categoriasMap['Accesorios']],
            ['Lámpara LED', 'Lámpara de escritorio con luz blanca', 'Philips', 'DeskLight', 25, 0, 5, null, '/images/image-not-found.jpg', categoriasMap['Hogar']],
        ];

        for (const [nombre, descripcion, marca, modelo, precio, descuento, precioEnvio, cuotas, imagen, idCategoria] of productos) {
            await conexion.promise().query(
                `INSERT INTO PRODUCTOS (
                    NOMBRE, DESCRIPCION, MARCA, MODELO, PRECIO, DESCUENTO,
                    PRECIO_ENVIO, CUOTAS, IMAGEN, ID_CATEGORIA, created_at, updated_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    nombre,
                    descripcion,
                    marca,
                    modelo,
                    precio,
                    descuento,
                    precioEnvio,
                    cuotas,
                    imagen,
                    idCategoria,
                    now,
                    now
                ]
            );
        }

        console.log('✅ Seed ejecutado con éxito');
    } catch (error) {
        console.error('❌ Error al ejecutar el seed:', error);
    } finally {
        conexion.end();
    }
};

seed();
