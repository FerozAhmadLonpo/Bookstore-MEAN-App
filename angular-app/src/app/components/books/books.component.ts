import { Component, OnInit } from "@angular/core";
import { BooksService } from "../../services/books.service";
import { Router, ActivatedRoute } from "@angular/router";
import { IBook } from "src/app/IBook";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"]
})
export class BooksComponent implements OnInit {
  photoPath: "assets/img/pic1.jpg";
  books: IBook[];
  constructor(
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.booksService.getBooks().subscribe(
      books => {
        this.books = books;
        //this.books.push(books);
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }
  showDetails(id: any) {
    this.router.navigate(["/details", id]);
  }
}
