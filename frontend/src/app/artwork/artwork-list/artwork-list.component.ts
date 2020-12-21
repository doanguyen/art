import {Component, OnInit, ViewChild} from '@angular/core';
import {ArtworkService} from '../../services/artwork.service';
import {combineLatest, Observable} from 'rxjs';
import {ArtworkResponse, DisplayMode} from '../../models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {ArtistService} from '../../services/artist.service';
import {ArtworkModifyComponent} from '../artwork-modify/artwork-modify.component';


@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss']
})
export class ArtworkListComponent implements OnInit {
  artworksResponse$: Observable<ArtworkResponse>;
  displayMode = DisplayMode.Card;
  nationality$ = this.artistService.listNationality$;
  page: number;
  keyword: string;
  nationality: string;

  filterFormGroup: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private artworkService: ArtworkService, private fb: FormBuilder,
              private route: ActivatedRoute, private router: Router,
              private artistService: ArtistService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.artworksResponse$ = combineLatest([this.route.queryParams]).pipe(
      tap(([params]) => {
        // tslint:disable-next-line:prefer-const
        let {page, keyword, nationality} = params;
        this.page = page - 1;
        this.keyword = keyword;
        this.nationality = nationality;
      }),
      switchMap(([params]) => this.artworkService.queryArtworks(params)
      )
    );
    this.filterFormGroup = this.fb.group({
      keyword: [''],
      nationality: ['']
    });
  }

  gotoFilter(): void {
    const queryParams = {
      keyword: this.filterFormGroup.get('keyword').value,
      nationality: this.filterFormGroup.get('nationality').value
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: '',
    });
  }

  gotoPage($event: PageEvent): void {
    const page = $event.pageIndex;
    const queryParams = {page: page + 1};
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  showModifyDialog(): void {
    this.dialog.open(ArtworkModifyComponent, {width: '500px', data: {artwork: null}});
  }

}
