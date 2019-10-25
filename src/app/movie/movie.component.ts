import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MovieService } from 'src/app/movie.service';
import { Http } from '@angular/http';
import { firebase } from '../services/auth.service';
// import firebase from 'firebase';


// const firebaseConfig = {
//   apiKey: "AIzaSyD27G4rarO5xXVX7A6xGMJePUydOKJyEVg",
//   authDomain: "buildworkshackathon.firebaseapp.com",
//   databaseURL: "https://buildworkshackathon.firebaseio.com",
//   projectId: "buildworkshackathon",
//   storageBucket: "buildworkshackathon.appspot.com",
//   messagingSenderId: "572407078825"
//   }

// const DB_config = {
//   apiKey: firebaseConfig.apiKey,
//   authDomain: firebaseConfig.authDomain,
//   databaseURL: firebaseConfig.databaseURL,
//   storageBucket: firebaseConfig.storageBucket
// };
// firebase.initializeApp(DB_config);

@Component({ 
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: any;
  in:string;
  userEmail:string;
  id: number; 
  
  constructor(private router: ActivatedRoute,private movieService: MovieService,private http:Http) { }
  
  
  ngOnInit() {
    this.userEmail = localStorage.getItem('email');
    this.router.params.subscribe((params) => {
      this.id = params['movieid'];
      this.movieService.getMovie(this.id).subscribe(data => {
        this.movie = JSON.parse(data._body);
      });
    });
    
  }

  Submit() {
    console.log(this.in);
    // this.userEmail = localStorage.getItem('email');
    const saveMovieRef = firebase.database().ref('movie/'+ this.id);
    saveMovieRef.push({ 
      comments: this.in,
      email: this.userEmail
      date: new Date().toISOString()
    });
   }
}





