import {
  NormalReduceRateBeforeSellIn,
  ReduceRateAfterSellInIndex,
  ConjuredReduceIndex,
  AgingProductIncreaseRate,
  SellInToResetQuality,
  MaxQuality,
  MinQuality,
  ConstQuality,
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
    product.quality = ConstQuality;
  }

  updateAgingProduct(product) {
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
