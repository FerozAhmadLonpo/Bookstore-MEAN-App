import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BooksService } from "src/app/services/books.service";
import { from } from "rxjs";
import { IBook } from "src/app/IBook";

@Component({
  selector: "app-bookdetails",
  templateUrl: "./bookdetails.component.html",
  styleUrls: ["./bookdetails.component.css"]
})
export class BookdetailsComponent implements OnInit {
  book: IBook;
  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");

    this.booksService.getBook(id).subscribe(
      book => {
        this.book = book;
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  removeBook(id) {
    this.booksService.deleteBook(id).subscribe(book => {
      if (book != null) this.router.navigate(["/books"]);
      else this.router.navigate(["/details/" + id]);
    });
  }
}
