import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MoviesComponent } from './movies/movies.component';
import { SigninComponent } from './signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule} from '@angular/forms';
//import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
//import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule }from 'angularfire2/auth';
//import { AngularFireModule } from 'angularfire2/database'
import { AuthService } from './services/auth.service';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MovieComponent } from './movie/movie.component';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieService } from 'src/app/movie.service';
import { NavbarComponent } from './navbar/navbar.component';

const appRoutes: Routes=[
  {path:'', component:MoviesComponent},
  {path:'movie/:movieid', component:MovieComponent},
  {path:'login',component:SigninComponent},
  // {path:'/signup',component:SignupComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MoviesComponent,
    SigninComponent,
    MovieComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),
    // AngularFireModule.initializeApp(environment.firebase, 'buildworkshackathon'),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [HttpClientModule,HttpModule, AuthService,MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
