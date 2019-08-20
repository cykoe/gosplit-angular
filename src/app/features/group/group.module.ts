import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { GroupNewCardComponent } from './components/group-new-card/group-new-card.component';
import { GroupListShellComponent } from './containers/group-list-shell/group-list-shell.component';
import { GroupRoutingModule } from './group-routing.module';
import { GroupEffects } from './store/group.effects';

@NgModule({
  declarations: [
    GroupListShellComponent,
    GroupCardComponent,
    GroupNewCardComponent,
  ],
  imports: [
    SharedModule,
    GroupRoutingModule,
    EffectsModule.forFeature([GroupEffects]),
  ],
})
export class GroupModule {}
