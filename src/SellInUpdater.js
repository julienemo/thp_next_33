import {
  ConjuredProductPrefixRegEx,
  ConstantProductKeyWords,
  FlexProductKeyWords,
  AgingProductKeyWords,
  NormalReduceRateBeforeSellIn,
  ReduceRateAfterSellInIndex,
  ConjuredReduceIndex,
  SellInToResetQuality,
  MaxQuality,
  MinQuality,
  ConstQuality,
  ConstSellIn,
  FlexThreshold1,
  FlexThreshold2,
  FlexAugmentationIndex1,
  FlexAugmentationIndex2,
} from "./Constants";

class SellInUpdater {
  constructor() {}

  updateConstantProduct(product) {
    console.log(product.name + "sellin constant" + product.sellIn);
    product.sellIn = ConstSellIn;
  }

  updateNormalProduct(product) {
    console.log(product.name + "sellin normal" + product.sellIn);
    product.sellIn -= NormalReduceRateBeforeSellIn;
  }
}

export default SellInUpdater;
