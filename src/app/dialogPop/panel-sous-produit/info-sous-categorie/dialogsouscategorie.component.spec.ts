import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsouscategorieComponent } from './dialogsouscategorie.component';

describe('DialogsouscategorieComponent', () => {
  let component: DialogsouscategorieComponent;
  let fixture: ComponentFixture<DialogsouscategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogsouscategorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogsouscategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
