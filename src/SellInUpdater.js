import { NormalReduceRateBeforeSellIn, ConstSellIn } from "./Constants";

class SellInUpdater {
  constructor() {}

  updateConstantProduct(product) {
    product.sellIn = ConstSellIn;
  }

  updateNormalProduct(product) {
    product.sellIn -= NormalReduceRateBeforeSellIn;
  }
}

export default SellInUpdater;
