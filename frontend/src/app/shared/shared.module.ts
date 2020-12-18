import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';

const MaterialModules = [
  MatToolbarModule
];

const CommonSharedModules = [CommonModule, RouterModule, MatIconModule, MatButtonModule, HttpClientModule, ...MaterialModules];

@NgModule({
  imports: CommonSharedModules,
  exports: CommonSharedModules
})
export class SharedModule {
}
