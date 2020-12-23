import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkListComponent } from './artwork-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ArtworkService } from '../../services/artwork.service';
import { ArtistService } from '../../services/artist.service';
import { of } from 'rxjs';

describe('ArtworkListComponent', () => {
  let component: ArtworkListComponent;
  let fixture: ComponentFixture<ArtworkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule],
      providers: [
        FormBuilder,
        { provide: ArtworkService, useValue: { queryArtworks: () => of([]) } },
        {
          provide: ArtistService,
          useValue: { listNationality$: of(['France']) }
        }
      ],
      declarations: [ArtworkListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
