import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAtelierComponent } from './info-atelier.component';

describe('InfoAtelierComponent', () => {
  let component: InfoAtelierComponent;
  let fixture: ComponentFixture<InfoAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoAtelierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
