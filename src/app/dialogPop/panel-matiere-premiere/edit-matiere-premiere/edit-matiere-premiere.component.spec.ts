import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMatierePremiereComponent } from './edit-matiere-premiere.component';

describe('EditMatierePremiereComponent', () => {
  let component: EditMatierePremiereComponent;
  let fixture: ComponentFixture<EditMatierePremiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMatierePremiereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMatierePremiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
