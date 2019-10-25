import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movie_url = 'https://api.themoviedb.org/3/';
  private movie_string: string;
  private id: number;

  constructor(private http:Http) { }

  getMovie(id: number) {
    return this.http.get(this.movie_url + 'movie/' + id + '?api_key=c4cca45db1f1811785a5c1cd626798c8');
  }
}
