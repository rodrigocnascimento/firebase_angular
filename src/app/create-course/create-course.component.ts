import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Course } from "../model/course";
import { catchError, concatMap, last, map, take, tap } from "rxjs/operators";
import { from, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "create-course",
  templateUrl: "create-course.component.html",
  styleUrls: ["create-course.component.css"],
})
export class CreateCourseComponent implements OnInit {
  courseId: string;

  form = this.fb.group({
    description: ["", Validators.required],
    category: ["BEGGINER", Validators.required],
    url: ["", Validators.required],
    longDescription: ["", Validators.required],
    promo: [false],
    promoStart: [null],
  });

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private afs: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.courseId = this.afs.createId();
  }

  onCreateCourse() {
    const formValues = this.form.value;

    const newCourse: Partial<Course> = {
      description: formValues.description,
      url: formValues.url,
      longDescription: formValues.longDescription,
      promo: formValues.promo,
      categories: [formValues.category],
    };

    newCourse.promoStartAt = Timestamp.fromDate(this.form.value.promoStart);

    console.table(newCourse);

    this.courseService
      .createCourse(newCourse, this.courseId)
      .pipe(
        tap((course) => {
          console.log("New created course", course);
          this.router.navigateByUrl("/courses");
        }),
        catchError((error) => {
          console.error(error);
          alert("we could not create the course");
          return throwError(error);
        })
      )
      .subscribe();
  }

  uploadThumbnail(event) {
    const file: File = event.target.files[0];
    console.log(file);

    const filePath = `courses/${this.courseId}/${file.name}`;

    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public",
    });
    console.log(task);

    task.snapshotChanges().subscribe();
  }
}
