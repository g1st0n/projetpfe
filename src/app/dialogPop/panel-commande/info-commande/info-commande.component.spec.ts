import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCommandeComponent } from './info-commande.component';

describe('InfoCommandeComponent', () => {
  let component: InfoCommandeComponent;
  let fixture: ComponentFixture<InfoCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCommandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
