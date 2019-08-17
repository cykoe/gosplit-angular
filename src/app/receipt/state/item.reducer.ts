import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IItem } from '../../constants/models';
import * as ItemActions from './item.actions';

export interface ItemState extends EntityState<IItem> {
  selectedItemId: string | null;
}

export function sortById(a: IItem, b: IItem): number {
  return a.id.localeCompare(b.id);
}

export const adapter: EntityAdapter<IItem> = createEntityAdapter<IItem>({
  sortComparer: sortById,
});

export const initState: ItemState = adapter.getInitialState({
  selectedItemId: null,
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

export const itemFeatureKey = 'item';
