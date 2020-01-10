import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BooksService } from "src/app/services/books.service";
import { NgForm } from "@angular/forms";
import { ValidateService } from "src/app/services/validate.service";
import { IBook } from "src/app/IBook";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-editbook",
  templateUrl: "./editbook.component.html",
  styleUrls: ["./editbook.component.css"]
})
export class EditbookComponent implements OnInit {
  id: any;
  book: IBook;

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.id = id;
    this.bookService.getBook(id).subscribe(book => {
      this.book = book;
    });
  }

  onUpdateSubmit() {
    // Required Fields
    if (!this.validateService.validateBook(this.book)) {
      this.flashMessages.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      this.router.navigate(["/add"]);
      return false;
    }
    const newBook: IBook = Object.assign({}, this.book);
    this.bookService.updateBook(this.id, newBook).subscribe(book => {
      if (book != null) {
        this.flashMessages.show("Successfully Edited The Book", {
          cssClass: "alert-success",
          timeout: 4000
        });
        this.router.navigate(["/books"]);
      } else {
        this.flashMessages.show(
          "Something went wrong, failed to Edit The Book",
          {
            cssClass: "alert-danger",
            timeout: 4000
          }
        );
        this.router.navigate(["/edit"]);
      }
    });
  }
}
