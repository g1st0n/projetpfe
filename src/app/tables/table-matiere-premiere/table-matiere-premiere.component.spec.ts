import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatierePremiereComponent } from './table-matiere-premiere.component';

describe('TableMatierePremiereComponent', () => {
  let component: TableMatierePremiereComponent;
  let fixture: ComponentFixture<TableMatierePremiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableMatierePremiereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableMatierePremiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
