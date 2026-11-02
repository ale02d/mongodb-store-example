# MongoDB: ejemplo de una tienda

## ¿Qué hace este ejemplo?

 Es una base de datos que no usa tablas con columnas fijas: guarda **documentos** (parecidos a JSON), y cada documento puede tener campos distintos aunque estén en el mismo lugar.

Para verlo lo simulamos con el catálogo de una tienda con tres productos que no se parecen en nada:

- Un portátil, que tiene RAM, procesador y pantalla.
- Una camiseta, que tiene tallas y colores.
- Un libro, que tiene autor y reseñas.

Los tres viven en la misma colección. En una tabla tradicional eso sería un enredo, y en MongoDB sale natural.

Al correrlo, el programa hace cinco cosas y las va mostrando en la terminal:

1. Guarda los tres productos.
2. Busca dentro de ellos: portátiles con 16 GB de RAM o más y camisetas talla M.
3. Modifica un producto: le agrega una reseña al libro y le resta 1 al stock.
4. Calcula el precio promedio de cada categoría.
5. Borra un producto (la camiseta).

Usamos la versión gratuita de MongoDB Atlas (plan M0) y Node.js.

## Lo que necesitas

- [Node.js](https://nodejs.org) 18 o superior (trae npm incluido).
- [Git](https://git-scm.com) para descargar el proyecto.
- Una cuenta gratis en [MongoDB Atlas](https://www.mongodb.com/atlas).

## Cómo correrlo

### 1. Crea tu base de datos en Atlas

1. Crea una cuenta y un cluster **M0 (Free)**.
2. En **Database Access**, crea un usuario con contraseña (mejor solo letras y números, para evitar problemas).
3. En **Network Access**, agrega tu IP actual.
4. En **Connect > Drivers**, copia la cadena de conexión (empieza con `mongodb+srv://`) y cambia `<db_password>` por tu contraseña, sin los símbolos `<` ni `>`.

### 2. Descarga el proyecto

```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO
npm install
```

### 3. Pon tu cadena de conexión

Copia el archivo de ejemplo:

```bash
copy .env.example .env
```

En Mac o Linux es `cp .env.example .env`.

Abre `.env` y cambia el valor de `MONGO_URI` por la cadena que copiaste de Atlas. Ese archivo no se sube a GitHub, así tu contraseña no queda a la vista.

### 4. Ejecútalo

```bash
npm start
```

Lo puedes correr las veces que quieras: el programa limpia la colección cada vez que empieza.

## Lo que deberías ver

```
=== 1. Insertar productos con estructuras distintas ===
- Portatil Pro 14
- Camiseta basica
- Narnia
Los tres estan en la misma coleccion, pero cada uno tiene campos diferentes.

=== 2. Consultar datos anidados y listas ===
Productos con 16 GB de RAM o mas (campo specs.ramGb):
- Portatil Pro 14

Productos disponibles en talla M (lista sizes):
- Camiseta basica

=== 3. Actualizar parte de un documento ===
{
  name: 'Narnia',
  category: 'libros',
  price: 58000,
  stock: 29,
  author: 'C.S. Lewis',
  reviews: [ { user: 'ana', stars: 5 }, { user: 'luis', stars: 4 } ]
}

=== 4. Agregacion: resumen por categoria ===
- tecnologia: 1 producto(s), precio promedio $3,200,000
- libros: 1 producto(s), precio promedio $58,000
- ropa: 1 producto(s), precio promedio $45,000

=== 5. Eliminar un documento ===
Productos restantes: 2
```

Al final, en Atlas queda la base `store_demo` con 2 productos: el portátil y el libro.

## Qué hace cada archivo

| Arquitectura y funcion de cada archivo
|---|---|
| `index.js` | Es el que se ejecuta: conecta y corre los cinco pasos. |
| `src/config.js` | Lee el archivo `.env`. |
| `src/database.js` | Abre la conexión con Atlas. |
| `src/productRepository.js` | Guarda, busca, modifica y borra productos. |
| `src/sampleData.js` | Los tres productos de ejemplo. |
| `src/demoSteps.js` | Los cinco pasos que se muestran. |
| `src/consoleOutput.js` | Imprime los títulos y las listas. |