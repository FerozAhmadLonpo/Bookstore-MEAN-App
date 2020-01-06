import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { IBook } from '../IBook';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks():Observable<IBook[]> {
    return this.http.get<IBook[]>("http://localhost:3000/api/books");
  }
  getBook(id) {
    return this.http.get<any>("http://localhost:3000/api/books/" + id);
  }
  addBook(book) {
    return this.http.post<any>("http://localhost:3000/api/books/", book);
  }
  updateBook(id, book) {
    return this.http.put<any>("http://localhost:3000/api/books/"+id, book);
  }
  deleteBook(id){
    return this.http.delete<any>(`http://localhost:3000/api/books/${id}`);
  }
}
