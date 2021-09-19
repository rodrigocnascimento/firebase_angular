import { AngularFireStorage } from "@angular/fire/storage";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { from, Observable } from "rxjs";
import { concatMap, filter, map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { environment } from "../environments/environment";
import { AuthTokenService } from "./services/auth-token.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    public user: UserService,
    private readonly afStorage: AngularFireStorage,
    private readonly token: AuthTokenService
  ) {
    if (environment.useEmulators) {
      this.afStorage.storage.useEmulator("localhost", 9199);
    }
  }

  ngOnInit() {}

  logOut() {
    this.user.logOut();
  }
}
