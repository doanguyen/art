import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Artwork, ArtworkDialogData} from '../../models';
import {ArtworkService} from '../../services/artwork.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-artwork-modify',
  templateUrl: './artwork-modify.component.html',
  styleUrls: ['./artwork-modify.component.scss']
})
export class ArtworkModifyComponent implements OnInit {
  artwork: Artwork = this.data.artwork;
  artworkForm = this.fb.group({
    Title: [this.artwork?.Title, [Validators.required]],
    ThumbnailURL: [this.artwork?.ThumbnailURL],
    CreditLine: [this.artwork?.CreditLine],
    Date: [this.artwork?.Date],
    Medium: [this.artwork?.Medium],
    Classification: [this.artwork?.Classification],
    Department: [this.artwork?.Department],
    DateAcquired: [this.artwork?.DateAcquired],
    URL: [this.artwork?.URL]
  });

  constructor(private dialogRef: MatDialogRef<ArtworkModifyComponent>, @Inject(MAT_DIALOG_DATA) public data: ArtworkDialogData,
              private artworkService: ArtworkService, private snackbar: MatSnackBar, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  createArtwork(): void {
    this.artworkService.createArtwork(this.artworkForm.value).subscribe(() => this.modifySuccess(), () => this.modifyFail());
  }

  updateArtwork(): void {
    this.artworkService.updateArtwork(this.artwork.id, this.artworkForm.value)
      .subscribe(() => this.modifySuccess(), () => this.modifyFail());
  }

  modifySuccess(): void {
    this.snackbar.open(`Artwork is ${this.artwork ? 'updated' : 'created'}`, 'Close', {duration: 2000});
  }

  modifyFail(): void {
    this.snackbar.open(`Artwork is failed to ${this.artwork ? 'updat' : 'create'}`, 'Close', {duration: 2000});
  }
}
