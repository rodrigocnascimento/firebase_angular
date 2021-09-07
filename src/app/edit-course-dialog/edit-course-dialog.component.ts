import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "edit-course-dialog",
  templateUrl: "./edit-course-dialog.component.html",
  styleUrls: ["./edit-course-dialog.component.css"],
})
export class EditCourseDialogComponent {
  form: FormGroup;

  course: Course;

  constructor(
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private courseService: CoursesService
  ) {
    this.course = course;
    this.form = this.fb.group({
      description: [course.description, Validators.required],
      longDescription: [course.longDescription, Validators.required],
      promo: [course.promo],
    });
  }

  saveForm() {
    const changes = this.form.value;

    this.courseService.updateCourse(this.course.id, changes).subscribe(() => {
      this.dialogRef.close(changes);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
