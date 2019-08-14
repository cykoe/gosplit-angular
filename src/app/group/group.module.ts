import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GroupNewCardComponent } from './components/group-new-card/group-new-card.component';
import { SharedModule } from '../shared/shared.module';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { GroupListShellComponent } from './containers/group-list-shell/group-list-shell.component';
import { GroupRoutingModule } from './group-routing.module';
import { GroupEffects } from './state/group.effects';
import * as fromGroups from './state/group.reducer';

@NgModule({
  declarations: [
    GroupListShellComponent,
    GroupCardComponent,
    GroupNewCardComponent,
  ],
  imports: [
    SharedModule,
    GroupRoutingModule,
    StoreModule.forFeature(fromGroups.groupFeatureKey, fromGroups.reducer),
    EffectsModule.forFeature([GroupEffects]),
  ],
})
export class GroupModule {
}
