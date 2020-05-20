class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateItems() {
    let list = this.items;
    list.forEach((item) => {
      item.update();
    });
    return list;
  }
}

export default Shop;
