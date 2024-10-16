import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousCategorieAddComponent } from './sous-categorie-add.component';

describe('SousCategorieAddComponent', () => {
  let component: SousCategorieAddComponent;
  let fixture: ComponentFixture<SousCategorieAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SousCategorieAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SousCategorieAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
