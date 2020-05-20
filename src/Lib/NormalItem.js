import Item from "./Item";

class NormalItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
    this.normalQualityChangeRate = -1;
    this.afterSellInQualityChangeRate = -2;
    this.sellInDecreaseRate = -1;
    this.maxQuality = 50;
    this.minQuality = 0;
    this.thresholdSellIn = 0;
  }

  qualityRangeControl = () => {
    if (this.quality > this.maxQuality) {
      this.quality = this.maxQuality;
    }
    if (this.quality < this.minQuality) {
      this.quality = this.minQuality;
    }
  };

  update = () => {
    this.sellIn += this.sellInDecreaseRate;
    this.qualityRangeControl();
    if (this.sellIn > this.thresholdSellIn) {
      this.quality += this.normalQualityChangeRate;
    } else {
      this.quality += this.afterSellInQualityChangeRate;
    }
    this.qualityRangeControl();
  };
}

export default NormalItem;
