import FilterSet, { Filter } from "./FilterSet";

/** TODO: Document FilterMultiMap */
export class FilterMultiMap<T> {
  private sets = new Map<Filter<T, any>, FilterSet<T, any>>();

  addFilter<T2 extends T>(filter: Filter<T, T2>, all: Iterable<T> = []) {
    if (!this.sets.has(filter)) {
      const set = new FilterSet(filter);

      for (const item of all) {
        set.addIfValid(item);
      }

      this.sets.set(filter, set);
    }
  }

  removeFilter(filter: Filter<T, any>) {
    this.sets.delete(filter);
  }

  addItem(item: T) {
    for (const list of this.sets.values()) {
      list.addIfValid(item);
    }
  }

  removeItem(item: T) {
    for (const list of this.sets.values()) {
      list.remove(item);
    }
  }

  getItems<T2 extends T>(filter: Filter<T, T2>): FilterSet<T, T2> | undefined {
    return this.sets.get(filter);
  }
}
