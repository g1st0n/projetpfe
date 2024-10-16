import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableResponsableComponent } from './table-responsable.component';

describe('TableResponsableComponent', () => {
  let component: TableResponsableComponent;
  let fixture: ComponentFixture<TableResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableResponsableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
