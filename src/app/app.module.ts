import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RequestsService } from './requests.service';
import './rxjs-extensions';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { Page404Component } from './page404/page404.component';
import { ShowShotsComponent } from './show-shots/show-shots.component';

const appRoutes: Routes = [
                           {path: '', redirectTo: '/show-shots', pathMatch: 'full'},
                           {path: 'show-shots', component: ShowShotsComponent},
                           {path: '**', component: Page404Component}
                           ]


@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    ShowShotsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,
    InfiniteScrollModule,
    FormsModule
  ],
  providers: [RequestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
