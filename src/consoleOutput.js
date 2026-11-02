export function printTitle(text) {
  console.log(`\n=== ${text} ===`);
}

export function printProductNames(products) {
  for (const product of products) {
    console.log(`- ${product.name}`);
  }
}
