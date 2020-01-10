import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BooksService } from "src/app/services/books.service";
import { from } from "rxjs";
import { IBook } from "src/app/IBook";
import { FlashMessagesService } from "angular2-flash-messages";

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
    private router: Router,
    private flashMessages: FlashMessagesService
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
      if (book != null) {
        this.flashMessages.show("Successfully Deleted A Book", {
          cssClass: "alert-success",
          timeout: 4000
        });
        this.router.navigate(["/books"]);
      } else {
        this.flashMessages.show(
          "Something went wrong, failed to Delete The Book",
          {
            cssClass: "alert-danger",
            timeout: 4000
          }
        );
        this.router.navigate(["/details/" + id]);
      }
    });
  }
}
