import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/Operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  data:any=[];
  private movieUrl = "https://api.themoviedb.org/3/";
  private movie_string:string;
  movie:any;
  result:any;

  constructor(private http:Http,private router:Router) {

    this.getPopularMovie();
    this.getData();
  }
  ngOnInit() {

  }

    getPopularMovie(){
       return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=c4cca45db1f1811785a5c1cd626798c8&language=en-US')
        .pipe(map((res: Response) => res.json()));
    }

    getData(){
      this.getPopularMovie().subscribe(res => this.data = res);
      console.log(this.data);
    }

    searchMovies(movie:string){
      this.movie_string = movie;
      return this.http.get(this.movieUrl+'search/movie?query='+this.movie_string+'&api_key=c4cca45db1f1811785a5c1cd626798c8')
      .pipe(map((res: Response) => res.json()));
    }

    search(){
        this.searchMovies(this.movie).subscribe(res => {
          this.result = res['results'];
          console.log(this.result);
        });
      }

      getMovie(id: number) {
        return this.http.get(this.movieUrl + 'movie/' + id + '?api_key=c4cca45db1f1811785a5c1cd626798c8');
      }

      // onSelect(d){
      //   this.router.navigate(['/movie',d.id])
      // }
    
  
}

