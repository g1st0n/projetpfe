import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatierePremiereComponent } from './add-matiere-premiere.component';

describe('AddMatierePremiereComponent', () => {
  let component: AddMatierePremiereComponent;
  let fixture: ComponentFixture<AddMatierePremiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMatierePremiereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMatierePremiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
