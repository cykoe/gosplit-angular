import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material';

import { MaterialModule } from '../../modules/material.module';
import { TableDialogComponent } from './table-dialog.component';

describe('TableDialogComponent', () => {
  let component: TableDialogComponent;
  let fixture: ComponentFixture<TableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDialogComponent ],
      imports: [MaterialModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: [{name: 'name', split: '0'}],
         },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get shared data from the calling component', () => {
    expect(component.dataSource).toEqual([{name: 'name', split: '0'}]);
  });
});
