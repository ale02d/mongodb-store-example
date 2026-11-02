const MIN_STARS = 1;
const MAX_STARS = 5;

export class ProductRepository {
  constructor(collection) {
    this._collection = collection;
  }

  async clear() {
    await this._collection.deleteMany({});
  }

  async insertMany(products) {
    await this._collection.insertMany(products);
  }

  async count() {
    return this._collection.countDocuments({});
  }

  async findAllNames() {
    return this._findNames({});
  }

  async findNamesByMinRam(minRamGb) {
    return this._findNames({ "specs.ram_Gb": { $gte: minRamGb } });
  }

  async findNamesBySize(size) {
    return this._findNames({ sizes: size });
  }

  async findByName(productName) {
    return this._collection.findOne({ name: productName }, { projection: { _id: 0 } });
  }

  async addReview(productName, review) {
    const hasValidStars = review.stars >= MIN_STARS && review.stars <= MAX_STARS;
    if (!review.user || !hasValidStars) {
      throw new Error("La resena necesita un usuario y estrellas entre 1 y 5.");
    }
    await this._collection.updateOne({ name: productName }, { $push: { reviews: review } });
  }

  async decreaseStock(productName, amount) {
    if (!(amount > 0)) {
      throw new Error("La cantidad a descontar debe ser mayor que cero.");
    }
    await this._collection.updateOne({ name: productName }, { $inc: { stock: -amount } });
  }

  async averagePriceByCategory() {
    const pipeline = [
      {
        $group: {
          _id: "$category",
          productCount: { $sum: 1 },
          averagePrice: { $avg: "$price" },
        },
      },
      { $sort: { averagePrice: -1 } },
    ];
    return this._collection.aggregate(pipeline).toArray();
  }

  async deleteByName(productName) {
    await this._collection.deleteOne({ name: productName });
  }

  async _findNames(query) {
    return this._collection.find(query, { projection: { _id: 0, name: 1 } }).toArray();
  }
}
