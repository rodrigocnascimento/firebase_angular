import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { UserRoles } from "../model/user-roles";

@Injectable({
  providedIn: "root",
})
export class UserService {
  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  userPictureUrl$: Observable<string>;

  roles$: Observable<UserRoles>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    this.userPictureUrl$ = afAuth.authState.pipe(
      map((user) => user?.photoURL || null)
    );

    this.roles$ = this.afAuth.idTokenResult.pipe(
      map((token) => <any>token?.claims ?? { admin: false })
    );
  }

  logOut() {
    this.afAuth.signOut();
    this.router.navigateByUrl("/login");
  }
}
