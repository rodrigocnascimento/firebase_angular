import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  userPictureUrl$: Observable<string>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    this.userPictureUrl$ = afAuth.authState.pipe(
      map((user) => user?.photoURL || null)
    );
  }

  logOut() {
    this.afAuth.signOut();
    this.router.navigateByUrl("/login");
  }
}
