import Item from "../src/Item";
import Shop from "../src/Shop";

describe("GildedRose shop manager", () => {
  var listItems;

  beforeEach(() => {
    listItems = [];
  });

  it("For a normal product before sellIn, reduces the sellIn and quality of a normal product by ONE", () => {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 2, 6));

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
    listItems.push(new Item("Conjured Vest", 10, 20));
    listItems.push(new Item("Conjured Cake", 2, 6));

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
    listItems.push(new Item("+5 Dexterity Vest", -1, 20));
    listItems.push(new Item("Mana Cake", -2, 6));

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
    listItems.push(new Item("Conjured Vest", -1, 20));
    listItems.push(new Item("Conjured Cake", -2, 6));

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

  it("For normal and conjured product, quality doesn't drop to negative", () => {
    listItems.push(new Item("+5 Dexterity Vest", -1, 2));
    listItems.push(new Item("Mana Cake", 3, 1));
    listItems.push(new Item("Conjured Vest", -1, 2));
    listItems.push(new Item("Conjured Cake", 3, 1));

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

  it("For Aged Brie, reduces sellIn by ONE, raises the quality by one, but never higher than 50", () => {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Aged Brie", 20, 49));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateItems();
    const gildedRoseDay2 = new Shop(items);
    const itemsDay2 = gildedRoseDay2.updateItems();

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
    listItems.push(new Item("Sulfuras Hand of Ragnaros", 3, 77));

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

  it("For backstage passes with sellIn > 10, sellIn reduces by ONE and quality raises by ONE, but never over 50", () => {
    listItems.push(new Item("Backstage passes concert1", 20, 30));
    listItems.push(new Item("Backstage passes concert2", 20, 50));

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

  it("For backstage passes with sellIn <= 10 > 5 , sellIn reduces by ONE and quality raises by TWO, but never over 50", () => {
    listItems.push(new Item("Backstage passes concert3", 9, 30));
    listItems.push(new Item("Backstage passes concert4", 9, 50));

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

  it("For backstage passes with sellIn <= 5 > 0 , sellIn reduces by ONE and quality raises by THREE, but never over 50", () => {
    listItems.push(new Item("Backstage passes concert3", 4, 30));
    listItems.push(new Item("Backstage passes concert4", 4, 48));

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

  it("For backstage passes after sellIn, sellIn reduces by ONE and quality becomes ZERO and never drops below", () => {
    listItems.push(new Item("Backstage passes concert3", 0, 30));
    listItems.push(new Item("Backstage passes concert4", 0, 48));

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
