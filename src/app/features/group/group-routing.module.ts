import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../core/guards';
import { GroupListShellComponent } from './containers/group-list-shell/group-list-shell.component';

const routes: Routes = [
  {
    path: '',
    component: GroupListShellComponent,
    // TODO: add auth guard
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class GroupRoutingModule {}
