import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ValidateService {
  constructor() {}

  validateBook(book): boolean {
    if (
      book.title == undefined ||
      book.genre == undefined ||
      book.description == undefined ||
      book.author == undefined ||
      book.publisher == undefined ||
      book.pages == undefined ||
      book.image_url == undefined ||
      book.buy_url == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }
}
