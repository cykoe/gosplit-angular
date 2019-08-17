import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ItemActions from './item.actions';
import { IItem, ItemState } from './models';

export const adapter: EntityAdapter<IItem> = createEntityAdapter<IItem>({
  sortComparer: (a: IItem, b: IItem): number => a.id.localeCompare(b.id),
});

export const initState: ItemState = adapter.getInitialState({
  selectItemId: null,
});

export const itemReducer = createReducer(
  initState,
  on(ItemActions.createItem, (state, {item}) => adapter.addOne(item, state)),
  on(ItemActions.updateItem, (state, {item}) => adapter.upsertOne(item, state)),
  on(ItemActions.deleteItem, (state, {id}) => adapter.removeOne(id, state)),
  on(ItemActions.listItem, (state, {items}) => adapter.addAll(items, state)),
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();

export function reducer(state: ItemState | undefined, action: Action) {
  return itemReducer(state, action);
}
