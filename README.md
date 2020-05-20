### Project: Refactoring the Gilded Rose shop management

Julie Kwok 20200520

* * *

To see results
1. download repo
2. `npm install`
3. `npm test`

* * *
**Classes**
- `Item` go isolated in a dedicated file but intact
- `Shop` class now only calls the `update()` function of each item, there is no more condition
- `NormalItem`, `ConjuredItem`, `AgingFreshItem` and `LegendaryItem` are four new classes that each has its own updating logic and constants. They extend `Item` by using the `name`, `sellIn` and `quality` attributes.

* * *
**Attention**
The category that will determine update logic of a product depends totally in which sub-class the product is declared. Name is not a criteria. Ex, a "conjured duck" declared as LegendaryItem will no depreciate. I would very much like to let the program to decide "automatically" which category to put a project with something like a regEx, but I think it violates the open-closed principle.