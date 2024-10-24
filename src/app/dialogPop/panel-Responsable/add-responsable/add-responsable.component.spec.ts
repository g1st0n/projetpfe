import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResponsableComponent } from './add-responsable.component';

describe('AddResponsableComponent', () => {
  let component: AddResponsableComponent;
  let fixture: ComponentFixture<AddResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResponsableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
