import {
  ConjuredProductPrefixRegEx,
  ConstantProductKeyWords,
  FlexProductKeyWords,
  AgingProductKeyWords,
  NormalReduceRateBeforeSellIn,
  ReduceRateAfterSellInIndex,
  ConjuredReduceIndex,
  AgingProductIncreaseRate,
  SellInToResetQuality,
  MaxQuality,
  MinQuality,
  ConstQuality,
  ConstSellIn,
  FlexThreshold1,
  FlexThreshold2,
  FlexIncreaseRate1,
  FlexIncreaseRate2,
} from "./Constants";

class QualityUpdater {
  constructor() {}

  qualityRangeControl(product) {
    if (product.quality < MinQuality) {
      product.quality = MinQuality;
    }
    if (product.quality > MaxQuality) {
      product.quality = MaxQuality;
    }
  }

  updateConjuredProduct(product) {
    console.log(product.name + "quality conjured" + product.sellIn);
    this.qualityRangeControl(product);
    if (product.sellIn > SellInToResetQuality) {
      product.quality -= NormalReduceRateBeforeSellIn * ConjuredReduceIndex;
    } else {
      product.quality -=
        NormalReduceRateBeforeSellIn *
        ReduceRateAfterSellInIndex *
        ConjuredReduceIndex;
    }
    this.qualityRangeControl(product);
  }

  updateConstantProduct(product) {
    console.log(product.name + "quality constant" + product.sellIn);
    product.quality = ConstQuality;
  }

  updateAgingProduct(product) {
    console.log(product.name + "quality aging" + product.sellIn);
    this.qualityRangeControl(product);
    product.quality += AgingProductIncreaseRate;
    this.qualityRangeControl(product);
  }

  updateFlexProduct(product) {
    console.log(product.name + "quality flex" + product.sellIn);
    this.qualityRangeControl(product);
    if (product.sellIn > FlexThreshold1) {
      product.quality += AgingProductIncreaseRate;
    } else if (product.sellIn > FlexThreshold2) {
      product.quality += FlexIncreaseRate1;
    } else if (product.sellIn > SellInToResetQuality) {
      product.quality += FlexIncreaseRate2;
    } else {
      product.quality = MinQuality;
    }
    this.qualityRangeControl(product);
  }
  updateNormalProduct(product) {
    console.log(product.name + "quality normal" + product.sellIn);
    this.qualityRangeControl(product);
    if (product.sellIn > SellInToResetQuality) {
      product.quality -= NormalReduceRateBeforeSellIn;
    } else {
      product.quality -=
        NormalReduceRateBeforeSellIn * ReduceRateAfterSellInIndex;
    }
    this.qualityRangeControl(product);
  }
}

export default QualityUpdater;
