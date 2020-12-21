import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkDisplayComponent } from './artwork-display.component';

describe('ArtworkDisplayComponent', () => {
  let component: ArtworkDisplayComponent;
  let fixture: ComponentFixture<ArtworkDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtworkDisplayComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
