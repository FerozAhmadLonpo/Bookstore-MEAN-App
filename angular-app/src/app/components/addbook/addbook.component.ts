import { Component, OnInit, ViewChild } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
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
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit() {}
  onSaveSubmit() {
    // Required Fields
    if (!this.validateService.validateBook(this.book)) {
      this.flashMessages.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      this.router.navigate(["/add"]);
      return false;
    }
    this.booksService.addBook(this.book).subscribe(
      book => {
        if (book != {}) {
          this.flashMessages.show("Successfully Added a New Book", {
            cssClass: "alert-success",
            timeout: 4000
          });
          this.router.navigate(["/books"]);
        } else {
          this.flashMessages.show(
            "Something went wrong, failed to add new Book",
            {
              cssClass: "alert-danger",
              timeout: 4000
            }
          );
          this.router.navigate(["/add"]);
        }
      },
      err => console.log(err)
    );
  }
}
