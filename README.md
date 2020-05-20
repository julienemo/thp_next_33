### Project: Refactoring the Gilded Rose shop management

Julie Kwok 20200520

---

To see results

1. download repo
2. `npm install`
3. `npm test`

---

**Classes**

- `Item` is isolated in a dedicated file but intact
- `Shop` calls the `update()` function of each item wthout any condition
- `NormalItem`, `ConjuredItem`, `AgingFreshItem` and `LegendaryItem` are four new classes that each has its own updating logic and constants. They extend `Item` by using its `name`, `sellIn` and `quality` attributes.

---

**Attention**

The category determining the update logic of a product depends totally on which sub-class the product is declared in. Name is not a criteria. Ex, a "conjured duck" declared as LegendaryItem will no depreciate.

I would very much like to let the program to decide "automatically" on the category with regEx, but it seems to violate the open-closed principle.

---

**Discovery**

Jasmine doesn't speak ES6. [This](https://www.npmjs.com/package/jasmine-es6) can help with the translation.
