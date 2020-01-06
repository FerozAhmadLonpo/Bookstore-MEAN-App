import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BooksService } from "src/app/services/books.service";
import { NgForm } from "@angular/forms";
import { ValidateService } from "src/app/services/validate.service";
import { IBook } from 'src/app/IBook';

@Component({
  selector: "app-editbook",
  templateUrl: "./editbook.component.html",
  styleUrls: ["./editbook.component.css"]
})
export class EditbookComponent implements OnInit {
   id:any;
  validationFailed: boolean = false;
  book: IBook;

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
    private validateService: ValidateService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.id = id;
    this.bookService.getBook(id).subscribe(book => {
      this.book = book;
    });
  }

  onUpdateSubmit() {
    const newBook:IBook = Object.assign({} ,this.book)
    this.bookService.updateBook(this.id, newBook).subscribe(book => {
      if (book != null) {
        this.router.navigate(["/books"]);
      } else {
        this.router.navigate(["/edit"]);
      }
    });
  }
}
