import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Artwork} from '../../models';
import {switchMap} from 'rxjs/operators';
import {ArtworkService} from '../../services/artwork.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DeleteDialogComponent} from './delete-dialog.component';

@Component({
  selector: 'app-artwork-display',
  templateUrl: './artwork-display.component.html',
  styleUrls: ['./artwork-display.component.scss']
})
export class ArtworkDisplayComponent implements OnInit {
  artwork$: Observable<Artwork>;

  constructor(private route: ActivatedRoute, private artworkService: ArtworkService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.artwork$ = this.route.paramMap.pipe(
      switchMap(params => this.artworkService.queryArtwork(params.get('id')))
    );
  }

  openDeleteDialog(artwork: Artwork): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {width: '450px', data: {artwork}});
  }

}

