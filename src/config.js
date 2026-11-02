import dotenv from "dotenv";

const VALID_URI_PREFIXES = ["mongodb://", "mongodb+srv://"];
const DEFAULT_DATABASE_NAME = "store_demo";
const DEFAULT_COLLECTION_NAME = "products";

export function loadSettings() {
  dotenv.config();
  const mongoUri = (process.env.MONGO_URI ?? "").trim();
  const hasValidPrefix = VALID_URI_PREFIXES.some((prefix) => mongoUri.startsWith(prefix));
  if (!hasValidPrefix) {
    throw new Error(
      "MONGO_URI no existe o no es valida. Copia .env.example a .env y escribe tu cadena de conexion."
    );
  }
  return {
    mongoUri,
    databaseName: process.env.MONGO_DB_NAME ?? DEFAULT_DATABASE_NAME,
    collectionName: process.env.MONGO_COLLECTION_NAME ?? DEFAULT_COLLECTION_NAME,
  };
}
