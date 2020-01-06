import { Component, OnInit, ViewChild } from "@angular/core";
import { BooksService } from "src/app/services/books.service";
import { Router } from "@angular/router";
import { ValidateService } from "src/app/services/validate.service";
import { NgForm } from "@angular/forms";
import { IBook } from "src/app/IBook";

@Component({
  selector: "app-addbook",
  templateUrl: "./addbook.component.html",
  styleUrls: ["./addbook.component.css"]
})
export class AddbookComponent implements OnInit {
  @ViewChild('bookForm',{static:true} ) public addBookForm:NgForm
  validationFailed: boolean = false;
  book: IBook = {
    title: null,
    genre: null,
    description: null,
    author: null,
    publisher: null,
    pages: null,
    image_url: null,
    buy_url: null
  };

  constructor(
    private booksService: BooksService,
    private validateService: ValidateService,
    private router: Router
  ) {}

  ngOnInit() {}
  onSaveSubmit() {
    // Required Fields
    if (!this.validateService.validateBook(this.book)) {
      this.validationFailed = true;
      this.router.navigate(["/add"]);
      return false;
    }
    this.booksService.addBook(this.book).subscribe(
      book => {
        if (book != {}) {
          this.router.navigate(["/books"]);
        } else {
          this.router.navigate(["/add"]);
        }
      },
      err => console.log(err)
    );
  }
}
