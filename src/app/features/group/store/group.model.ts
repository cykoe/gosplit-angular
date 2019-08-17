import { EntityState } from '@ngrx/entity';

export interface IGroup {
  id: string;
  name: string;
  people: string[];
}

export interface GroupState extends EntityState<IGroup> {
  selectGroupId: string | null;
  isLoading?: boolean;
  error?: any;
}
