var { Shop, Item } = require("../src/gilded_rose.js");

const normalProductBeforeSellin1 = new Item("+5 Dexterity Vest", 10, 20);
const normalProductBeforeSellin2 = new Item("Mana Cake", 2, 6);
const normalProductAfterSellin1 = new Item("+5 Dexterity Vest", -1, 20);
const normalProductAfterSellin2 = new Item("Mana Cake", -2, 6);
const normalProductLowQuality1 = new Item("+5 Dexterity Vest", -1, 2);
const normalProductLowQuality2 = new Item("Mana Cake", 3, 1);

const conjuredProductBeforeSellin1 = new Item("Conjured Vest", 10, 20);
const conjuredProductBeforeSellin2 = new Item("Conjured Cake", 2, 6);
const conjuredProductAfterSellin1 = new Item("Conjured Vest", -1, 20);
const conjuredProductAfterSellin2 = new Item("Conjured Cake", -2, 6);
const conjuredProductLowQuality1 = new Item("Conjured Vest", -1, 2);
const conjuredProductLowQuality2 = new Item("Conjured Cake", 3, 1);

const agingProductNormalQuality = new Item("Aged Brie", 20, 30);
const agingProductHighQuality = new Item("Aged Brie", 20, 49);

const constantProduct = new Item("Sulfuras, Hand of Ragnaros", 3, 77);

const flexProductNormalSellin1 = new Item(
  "Backstage passes to a TAFKAL80ETC concert",
  20,
  30
);

const flexProductNormalSellin2 = new Item(
  "Backstage passes to a TAFKAL80ETC concert",
  20,
  50
);

const flexProductPeriod1Sellin1 = new Item(
  "Backstage passes to a TAFKAL80ETC concert",
  9,
  30
);

const flexProductPeriod1Sellin2 = new Item(
  "Backstage passes to a TAFKAL80ETC concert",
  9,
  49
);

const flexProductPeriod2Sellin1 = new Item(
  "Backstage passes to a TAFKAL80ETC concert",
  4,
  30
);

const flexProductPeriod2Sellin2 = new Item(
  "Backstage passes to a TAFKAL80ETC concert",
  4,
  48
);

const flexProductAfterSellin1 = new Item(
  "Backstage passes to a TAFKAL80ETC concert",
  0,
  30
);

const flexProductAfterSellin2 = new Item(
  "Backstage passes to a TAFKAL80ETC concert",
  0,
  48
);

describe("GildedRose shop manager", () => {
  var listItems;

  beforeEach(() => {
    listItems = [];
  });

  it("For a normal product before sellIn, reduces the sellIn and quality of a normal product by ONE", () => {
    listItems.push(normalProductBeforeSellin1);
    listItems.push(normalProductBeforeSellin2);

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 },
    ];

    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For a conjured product before sellIn, reduces the sellIn by ONE and quality by TWO", () => {
    listItems.push(conjuredProductBeforeSellin1);
    listItems.push(conjuredProductBeforeSellin2);

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 9, quality: 18 },
      { sellIn: 2, quality: 4 },
    ];

    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For a normal product after sellIn, reduces the sellIn by ONE and quality by TWO of a normal product by ONE", () => {
    listItems.push(normalProductAfterSellin1);
    listItems.push(normalProductAfterSellin2);

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

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
    listItems.push(conjuredProductAfterSellin1);
    listItems.push(conjuredProductAfterSellin2);

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: -2, quality: 16 },
      { sellIn: -3, quality: 2 },
    ];

    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For normal and conjured product, quality doesn't drop to negative", () => {
    listItems.push(normalProductLowQuality1);
    listItems.push(normalProductLowQuality2);
    listItems.push(conjuredProductLowQuality1);
    listItems.push(conjuredProductLowQuality2);

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();
    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateQuality();

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

  it("For Aged Brie, reduces sellIn by ONE, raises the quality by one, but never higher than 50", () => {
    listItems.push(agingProductNormalQuality);
    listItems.push(agingProductHighQuality);

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();
    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateQuality();

    const expected = [
      { sellIn: 18, quality: 32 },
      { sellIn: 18, quality: 50 },
    ];
    expected.forEach((testCase, idx) => {
      expect(itemsDay2[idx].quality).toBe(testCase.quality);
      expect(itemsDay2[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For Sulfuras, doesn't change sellIn, keeps quality at 80", () => {
    listItems.push(constantProduct);

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [{ sellIn: 3, quality: 80 }];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateQuality();

    const expectedDay2 = [{ sellIn: 3, quality: 80 }];

    expectedDay2.forEach((testCase, idx) => {
      expect(itemsDay2[idx].quality).toBe(testCase.quality);
      expect(itemsDay2[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For backstage passes with sellIn > 10, sellIn reduces by ONE and quality raises by ONE, but never over 50", () => {
    listItems.push(flexProductNormalSellin1);
    listItems.push(flexProductNormalSellin2);

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 50 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateQuality();

    const expectedDay2 = [
      { sellIn: 18, quality: 32 },
      { sellIn: 18, quality: 50 },
    ];

    expectedDay2.forEach((testCase, idx) => {
      expect(itemsDay2[idx].quality).toBe(testCase.quality);
      expect(itemsDay2[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For backstage passes with sellIn <= 10 > 5 , sellIn reduces by ONE and quality raises by TWO, but never over 50", () => {
    listItems.push(flexProductPeriod1Sellin1);
    listItems.push(flexProductPeriod1Sellin2);

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 8, quality: 32 },
      { sellIn: 8, quality: 50 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateQuality();

    const expectedDay2 = [
      { sellIn: 7, quality: 34 },
      { sellIn: 7, quality: 50 },
    ];

    expectedDay2.forEach((testCase, idx) => {
      expect(itemsDay2[idx].quality).toBe(testCase.quality);
      expect(itemsDay2[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For backstage passes with sellIn <= 5 > 0 , sellIn reduces by ONE and quality raises by THREE, but never over 50", () => {
    listItems.push(flexProductPeriod2Sellin1);
    listItems.push(flexProductPeriod2Sellin2);

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: 3, quality: 33 },
      { sellIn: 3, quality: 50 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateQuality();

    const expectedDay2 = [
      { sellIn: 2, quality: 36 },
      { sellIn: 2, quality: 50 },
    ];

    expectedDay2.forEach((testCase, idx) => {
      expect(itemsDay2[idx].quality).toBe(testCase.quality);
      expect(itemsDay2[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("For backstage passes after sellIn, sellIn reduces by ONE and quality becomes ZERO and never drops below", () => {
    listItems.push(flexProductAfterSellin1);
    listItems.push(flexProductAfterSellin2);

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { sellIn: -1, quality: 0 },
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach((testCase, idx) => {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });

    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateQuality();

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
