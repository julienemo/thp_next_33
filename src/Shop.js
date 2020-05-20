import QualityUpdater from "./QualityUpdater";
import SellInUpdater from "./SellInUpdater";
import {
  ConjuredProductPrefixRegEx,
  ConstantProductKeyWords,
  FlexProductKeyWords,
  AgingProductKeyWords,
} from "./Constants";

class Shop {
  constructor(items = []) {
    this.items = items;
    this.qualityUpdater = new QualityUpdater();
    this.sellInUpdater = new SellInUpdater();
  }

  updateSingleProductQuality(product) {
    let name = product.name.toLowerCase();
    if (ConjuredProductPrefixRegEx.test(name)) {
      this.qualityUpdater.updateConjuredProduct(product);
    } else if (
      ConstantProductKeyWords.some((word) => name.split(" ").includes(word))
    ) {
      this.qualityUpdater.updateConstantProduct(product);
    } else if (
      AgingProductKeyWords.some((word) => name.split(" ").includes(word))
    ) {
      this.qualityUpdater.updateAgingProduct(product);
    } else if (FlexProductKeyWords.some((word) => word.test(name))) {
      this.qualityUpdater.updateFlexProduct(product);
    } else {
      this.qualityUpdater.updateNormalProduct(product);
    }
  }

  updateSingleProductSellIn(product) {
    let name = product.name.toLowerCase();
    if (
      ConstantProductKeyWords.some((word) => name.split(" ").includes(word))
    ) {
      this.sellInUpdater.updateConstantProduct(product);
    } else {
      this.sellInUpdater.updateNormalProduct(product);
    }
  }

  updateItems() {
    let list = this.items;
    list.forEach((item) => {
      this.updateSingleProductQuality(item);
      this.updateSingleProductSellIn(item);
    });
    return list;
  }
}

export default Shop;
