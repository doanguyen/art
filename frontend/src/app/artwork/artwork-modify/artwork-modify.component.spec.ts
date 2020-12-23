import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkModifyComponent } from './artwork-modify.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ArtworkService } from '../../services/artwork.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('ArtworkModifyComponent', () => {
  let component: ArtworkModifyComponent;
  let fixture: ComponentFixture<ArtworkModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        { provide: ArtworkService, useValue: {} }
      ],
      declarations: [ArtworkModifyComponent]
    }).compileComponents();
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
