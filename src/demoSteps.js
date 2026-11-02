import { printProductNames, printTitle } from "./consoleOutput.js";
import { BOOK_NAME, SAMPLE_PRODUCTS, SHIRT_NAME } from "./sampleData.js";

const MIN_RAM_GB = 16;
const SEARCH_SIZE = "M";
const NEW_REVIEW = { user: "luis", stars: 4 };
const STOCK_SOLD = 1;

export async function insertProducts(repository) {
  printTitle("1. Insertar productos con estructuras distintas");
  await repository.insertMany(SAMPLE_PRODUCTS);
  printProductNames(await repository.findAllNames());
  console.log("Los tres estan en la misma coleccion, pero cada uno tiene campos diferentes.");
}

export async function queryNestedData(repository) {
  printTitle("2. Consultar datos anidados y listas");
  console.log(`Productos con ${MIN_RAM_GB} GB de RAM o mas (campo specs.ram_gb):`);
  printProductNames(await repository.findNamesByMinRam(MIN_RAM_GB));
  console.log(`\nProductos disponibles en talla ${SEARCH_SIZE} (lista sizes):`);
  printProductNames(await repository.findNamesBySize(SEARCH_SIZE));
}

export async function updateDocument(repository) {
  printTitle("3. Actualizar parte de un documento");
  await repository.addReview(BOOK_NAME, NEW_REVIEW);
  await repository.decreaseStock(BOOK_NAME, STOCK_SOLD);
  console.log(await repository.findByName(BOOK_NAME));
}

export async function showCategorySummary(repository) {
  printTitle("4. Agregacion: resumen por categoria");
  for (const row of await repository.averagePriceByCategory()) {
    const formattedPrice = Math.round(row.averagePrice).toLocaleString("en-US");
    console.log(`- ${row._id}: ${row.productCount} producto(s), precio promedio $${formattedPrice}`);
  }
}

export async function deleteDocument(repository) {
  printTitle("5. Eliminar un documento");
  await repository.deleteByName(SHIRT_NAME);
  console.log(`Productos restantes: ${await repository.count()}`);
}
