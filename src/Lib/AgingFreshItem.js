import Item from "./Item";

class AgingFreshItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
    this.qualityChangeRate1 = 1;
    this.qualityChangeRate2 = 2;
    this.qualityChangeRate3 = 3;
    this.thresholdSellIn1 = 10;
    this.thresholdSellIn2 = 5;
    this.thresholdSellIn = 0;
    this.maxQuality = 50;
    this.minQuality = 0;
    this.sellInDecreaseRate = -1;
  }

  qualityRangeControl() {
    if (this.quality > this.maxQuality) {
      this.quality = this.maxQuality;
    }
    if (this.quality < this.minQuality) {
      this.quality = this.minQuality;
    }
  }

  update() {
    this.sellIn += this.sellInDecreaseRate;
    this.qualityRangeControl();
    if (this.sellIn > this.thresholdSellIn1) {
      this.quality += this.qualityChangeRate1;
    } else if (this.sellIn > this.thresholdSellIn2) {
      this.quality += this.qualityChangeRate2;
    } else if (this.sellIn > this.thresholdSellIn) {
      this.quality += this.qualityChangeRate3;
    } else {
      this.quality = this.minQuality;
    }
    this.qualityRangeControl();
  }
}

export default AgingFreshItem;
