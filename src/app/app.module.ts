import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RequestsService } from './requests.service';
import { ParamentrosService } from './parametros.service';
import './rxjs-extensions';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { Ng2Bs3ModalModule  } from 'ng2-bs3-modal/ng2-bs3-modal';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { Page404Component } from './page404/page404.component';
import { ShowShotsComponent } from './show-shots/show-shots.component';
import { ViewShotComponent } from './view-shot/view-shot.component';
import { DataPipe } from './data.pipe';
import { ComentarioComponent } from './comentario/comentario.component';

const appRoutes: Routes = [
                           {path: '', redirectTo: '/show-shots', pathMatch: 'full'},
                           {path: 'show-shots/:id', component: ViewShotComponent},
                           {path: 'show-shots', component: ShowShotsComponent},
                           {path: '**', component: Page404Component}
                           ]


@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    ShowShotsComponent,
    ViewShotComponent,
    DataPipe,
    ComentarioComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,
    InfiniteScrollModule,
    FormsModule,
    Ng2Bs3ModalModule 
  ],
  providers: [RequestsService, ParamentrosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
