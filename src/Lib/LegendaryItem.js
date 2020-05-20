import Item from "./Item";

class LegendaryItem extends Item {
  constructor(name) {
    super(name);
    this.sellIn = null;
    this.quality = 80;
  }

  update() {
    return;
  }
}

export default LegendaryItem;
