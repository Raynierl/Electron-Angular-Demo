import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxElectronModule } from 'ngx-electron';
import { AppComponent } from './app.component';
import { CameraComponent } from './components/camera/camera.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { ScreenselectComponent } from './windows/screenselect/screenselect.component';
import { HttpClientModule } from '@angular/common/http';
import { ApidemoComponent } from './windows/apidemo/apidemo.component';
import {ConnectionServiceModule} from 'ngx-connection-service';
import { NavbarComponent } from './components/navbar/navbar.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: CameraComponent},
  { path: 'selectScreen', component: ScreenselectComponent },
  { path: 'apidemo', component: ApidemoComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    ScreenselectComponent,
    ApidemoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ConnectionServiceModule,
    NgxElectronModule,
    RouterModule.forRoot(routes, {useHash: true}),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
