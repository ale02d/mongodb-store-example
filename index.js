import { loadSettings } from "./src/config.js";
import { createClient } from "./src/database.js";
import {
  deleteDocument,
  insertProducts,
  queryNestedData,
  showCategorySummary,
  updateDocument,
} from "./src/demoSteps.js";
import { ProductRepository } from "./src/productRepository.js";

async function runDemo(repository) {
  await repository.clear();
  await insertProducts(repository);
  await queryNestedData(repository);
  await updateDocument(repository);
  await showCategorySummary(repository);
  await deleteDocument(repository);
}

async function main() {
  let client;
  try {
    const settings = loadSettings();
    client = await createClient(settings);
    const collection = client.db(settings.databaseName).collection(settings.collectionName);
    await runDemo(new ProductRepository(collection));
  } catch (error) {
    console.error(`Error al ejecutar el ejemplo: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await client?.close();
  }
}

main();
