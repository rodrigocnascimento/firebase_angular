import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { CourseComponent } from "./course/course.component";
import { LoginComponent } from "./login/login.component";
import { CreateCourseComponent } from "./create-course/create-course.component";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  customClaims,
} from "@angular/fire/auth-guard";
import { CreateUserComponent } from "./create-user/create-user.component";
import { CourseResolver } from "./services/course.resolve";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const adminOnly = () =>
  pipe(
    customClaims,
    map((claim) => claim.admin === true)
  );

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: "create-course",
    component: CreateCourseComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: adminOnly,
    },
  },
  {
    path: "create-user",
    component: CreateUserComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: adminOnly,
    },
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "courses/:courseUrl",
    component: CourseComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    resolve: {
      course: CourseResolver,
    },
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
