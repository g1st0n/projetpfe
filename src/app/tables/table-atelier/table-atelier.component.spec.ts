import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAtelierComponent } from './table-atelier.component';

describe('TableAtelierComponent', () => {
  let component: TableAtelierComponent;
  let fixture: ComponentFixture<TableAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAtelierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
