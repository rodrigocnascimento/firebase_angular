import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Course } from "../model/course";
import { convertSnaps } from "../services/db-utils";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  loadCoursesByCategory(category: string): Observable<Course[]> {
    return this.db
      .collection("courses", (ref) =>
        ref.where("categories", "array-contains", category).orderBy("seqNo")
      )
      .get()
      .pipe(map((result) => convertSnaps<Course>(result)));
  }
}
