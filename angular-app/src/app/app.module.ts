import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FlashMessagesModule } from "angular2-flash-messages";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";

import { AddbookComponent } from "./components/addbook/addbook.component";
import { BookdetailsComponent } from "./components/bookdetails/bookdetails.component";
import { BooksComponent } from "./components/books/books.component";
import { EditbookComponent } from "./components/editbook/editbook.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

import { BooksService } from "./services/books.service";
import { ValidateService } from "./services/validate.service";

const routes: Routes = [
  { path: "", redirectTo:'/books', pathMatch:'full' },
  { path: "books", component: BooksComponent },
  { path: "details/:id", component: BookdetailsComponent },
  { path: "add", component: AddbookComponent },
  { path: "edit/:id", component: EditbookComponent }
];

@NgModule({
  declarations: [
    AppComponent,

    AddbookComponent,
    BookdetailsComponent,
    BooksComponent,
    EditbookComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot()
  ],
  providers: [BooksService, ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule {}
