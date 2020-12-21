import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkModifyComponent } from './artwork-modify.component';

describe('ArtworkModifyComponent', () => {
  let component: ArtworkModifyComponent;
  let fixture: ComponentFixture<ArtworkModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtworkModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
