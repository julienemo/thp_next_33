const {
  NormalItem,
  ConjuredItem,
  LegendaryItem,
  AgingFreshItem,
  Shop,
} = require("../src/GildedRose.js");

describe("GildedRose shop manager", () => {
  let listItems;

  beforeEach(() => {
    listItems = [];
  });

  it("For a normal product before sellIn, reduces the sellIn and quality of a normal product by ONE", () => {
    listItems.push(new NormalItem("+5 Dexterity Vest", 10, 20));
    listItems.push(new NormalItem("Mana Cake", 2, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems();

    const expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 1, quality: 5 },
    ];

    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For a conjured product before sellIn, reduces the sellIn by ONE and quality by TWO", () => {
    listItems.push(new ConjuredItem("Conjured Vest", 10, 20));
    listItems.push(new ConjuredItem("Conjured Cake", 2, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems();

    const expected = [
      { sellIn: 9, quality: 18 },
      { sellIn: 1, quality: 4 },
    ];

    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For a normal product after sellIn, reduces the sellIn by ONE and quality by TWO of a normal product by ONE", () => {
    listItems.push(new NormalItem("+5 Dexterity Vest", -1, 20));
    listItems.push(new NormalItem("Mana Cake", -2, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems();

    const expected = [
      { sellIn: -2, quality: 18 },
      { sellIn: -3, quality: 4 },
    ];

    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For a conjured product after sellIn, reduces the sellIn by ONE and quality by FOUR", () => {
    listItems.push(new ConjuredItem("Conjured Vest", -1, 20));
    listItems.push(new ConjuredItem("Conjured Cake", -2, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems();

    const expected = [
      { sellIn: -2, quality: 16 },
      { sellIn: -3, quality: 2 },
    ];

    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For a normal or conjured product, quality doesn't drop to negative", () => {
    listItems.push(new NormalItem("+5 Dexterity Vest", -1, 2));
    listItems.push(new NormalItem("Mana Cake", 3, 1));
    listItems.push(new ConjuredItem("Conjured Vest", -1, 2));
    listItems.push(new ConjuredItem("Conjured Cake", 3, 1));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems();
    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateItems();

    const expected = [
      { sellIn: -3, quality: 0 },
      { sellIn: 1, quality: 0 },
      { sellIn: -3, quality: 0 },
      { sellIn: 1, quality: 0 },
    ];

    expected.forEach((testCase, idx) => {
      expect(itemsDay2[idx].quality).toBe(testCase.quality);
      expect(itemsDay2[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For a legendary product, doesn't change sellIn, keeps quality at 80", () => {
    listItems.push(new LegendaryItem("Sulfuras Hand of Ragnaros", 3, 77));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems();

    const expected = [{ sellIn: null, quality: 80 }];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateItems();

    const expectedDay2 = [{ sellIn: null, quality: 80 }];

    expectedDay2.forEach((testCase, idx) => {
      expect(itemsDay2[idx].quality).toBe(testCase.quality);
      expect(itemsDay2[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For volatile products with sellIn > 10, sellIn reduces by ONE and quality raises by ONE, but never over 50", () => {
    listItems.push(new AgingFreshItem("Backstage passes concert1", 20, 30));
    listItems.push(new AgingFreshItem("Aged Brie", 20, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems();

    const expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 50 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateItems();

    const expectedDay2 = [
      { sellIn: 18, quality: 32 },
      { sellIn: 18, quality: 50 },
    ];

    expectedDay2.forEach((testCase, idx) => {
      expect(itemsDay2[idx].quality).toBe(testCase.quality);
      expect(itemsDay2[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For volatile products with sellIn <= 10 > 5 , sellIn reduces by ONE and quality raises by TWO, but never over 50", () => {
    listItems.push(new AgingFreshItem("Backstage passes concert3", 9, 30));
    listItems.push(new AgingFreshItem("Aged Brie", 9, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems();

    const expected = [
      { sellIn: 8, quality: 32 },
      { sellIn: 8, quality: 50 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateItems();

    const expectedDay2 = [
      { sellIn: 7, quality: 34 },
      { sellIn: 7, quality: 50 },
    ];

    expectedDay2.forEach((testCase, idx) => {
      expect(itemsDay2[idx].quality).toBe(testCase.quality);
      expect(itemsDay2[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For volatile products with sellIn <= 5 > 0 , sellIn reduces by ONE and quality raises by THREE, but never over 50", () => {
    listItems.push(new AgingFreshItem("Backstage passes concert3", 4, 30));
    listItems.push(new AgingFreshItem("Aged Brie", 4, 48));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems();

    const expected = [
      { sellIn: 3, quality: 33 },
      { sellIn: 3, quality: 50 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateItems();

    const expectedDay2 = [
      { sellIn: 2, quality: 36 },
      { sellIn: 2, quality: 50 },
    ];

    expectedDay2.forEach((testCase, idx) => {
      expect(itemsDay2[idx].quality).toBe(testCase.quality);
      expect(itemsDay2[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For volatile products after sellIn, sellIn reduces by ONE and quality becomes ZERO and never drops below", () => {
    listItems.push(new AgingFreshItem("Backstage passes concert3", 0, 30));
    listItems.push(new AgingFreshItem("Aged Brie", 0, 48));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems();

    const expected = [
      { sellIn: -1, quality: 0 },
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateItems();

    const expectedDay2 = [
      { sellIn: -2, quality: 0 },
      { sellIn: -2, quality: 0 },
    ];

    expectedDay2.forEach((testCase, idx) => {
      expect(itemsDay2[idx].quality).toBe(testCase.quality);
      expect(itemsDay2[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});
