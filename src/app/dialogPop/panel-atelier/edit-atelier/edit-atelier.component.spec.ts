import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAtelierComponent } from './edit-atelier.component';

describe('EditAtelierComponent', () => {
  let component: EditAtelierComponent;
  let fixture: ComponentFixture<EditAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAtelierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
