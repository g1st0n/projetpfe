import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMatierePremiereComponent } from './info-matiere-premiere.component';

describe('InfoMatierePremiereComponent', () => {
  let component: InfoMatierePremiereComponent;
  let fixture: ComponentFixture<InfoMatierePremiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoMatierePremiereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoMatierePremiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
