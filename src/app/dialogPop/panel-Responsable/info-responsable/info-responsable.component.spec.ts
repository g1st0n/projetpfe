import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoResponsableComponent } from './info-responsable.component';

describe('InfoResponsableComponent', () => {
  let component: InfoResponsableComponent;
  let fixture: ComponentFixture<InfoResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoResponsableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
