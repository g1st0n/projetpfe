import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DechetDialogComponent } from './dechet-dialog.component';

describe('DechetDialogComponent', () => {
  let component: DechetDialogComponent;
  let fixture: ComponentFixture<DechetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DechetDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DechetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
