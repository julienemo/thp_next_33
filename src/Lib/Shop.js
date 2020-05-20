class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateItems = () => {
    this.items.map((item) => item.update());
    return this.items;
  };
}

export default Shop;
