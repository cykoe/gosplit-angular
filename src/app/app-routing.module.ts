import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptDetailComponent } from './components/receipt-detail/receipt-detail.component';
import { LibraryComponent } from './components/library/library.component';

const routes: Routes = [
  {path: 'library/:id', component: ReceiptDetailComponent},
  {path: '', component: LibraryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
