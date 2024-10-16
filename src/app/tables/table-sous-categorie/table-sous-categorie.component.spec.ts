import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSousCategorieComponent } from './table-sous-categorie.component';

describe('TableSousCategorieComponent', () => {
  let component: TableSousCategorieComponent;
  let fixture: ComponentFixture<TableSousCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSousCategorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSousCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
