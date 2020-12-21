import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Artwork, DialogData} from '../../models';
import {ArtworkService} from '../../services/artwork.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  template: `
    <h1 mat-dialog-title>DELETE</h1>
    <div mat-dialog-content>
      <p>
        <strong>{{artwork.Title}}</strong>
      </p>
      <small>This action is inreversable</small>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="deleteArtwork()">OK</button>
    </div>


  `,
  styles: []
})
export class DeleteDialogComponent implements OnInit {
  artwork: Artwork = this.data.artwork;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private artworkService: ArtworkService, private snackbar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
  }

  deleteArtwork(): void {
    this.artworkService.deleteArtwork(this.artwork).subscribe(() => {
      this.snackbar.open('Deleted', 'Close', {duration: 2000});
      this.dialogRef.close();
      this.router.navigate(['artworks']);
    });
  }

}
