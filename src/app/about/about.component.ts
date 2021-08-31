import { Component, OnInit } from "@angular/core";

import "firebase/firestore";

import { AngularFirestore } from "@angular/fire/firestore";
import { COURSES, findLessonsForCourse } from "./db-data";
import { first, take } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent {
  constructor(private db: AngularFirestore) {}

  async uploadData() {
    const coursesCollection = this.db.collection("courses");
    const courses = await this.db.collection("courses").get();
    for (let course of Object.values(COURSES)) {
      const newCourse = this.removeId(course);
      const courseRef = await coursesCollection.add(newCourse);
      const lessons = await courseRef.collection("lessons");
      const courseLessons = findLessonsForCourse(course["id"]);
      console.log(`Uploading course ${course["description"]}`);
      for (const lesson of courseLessons) {
        const newLesson = this.removeId(lesson);
        delete newLesson.courseId;
        await lessons.add(newLesson);
      }
    }
  }

  removeId(data: any) {
    const newData: any = { ...data };
    delete newData.id;
    return newData;
  }
  // O get normal, recupera o valor, quando chamado
  // onReadDoc() {
  //   this.db
  //     .doc("/courses/2MAC7G8Jqkawrtd7psT0")
  //     .get()
  //     .subscribe((snap) => {
  //       console.log(snap.id);
  //       console.log(snap.data());
  //     });
  // }

  // o snapshotChanges, basicamente é um socket que recebe atualização sempre que um valor da collection é modificado
  // onReadDoc() {
  //   this.db
  //     .doc("courses/2MAC7G8Jqkawrtd7psT0")
  //     .snapshotChanges()
  //     .subscribe((snap) => {
  //       console.log(snap.payload.id);
  //       console.log(snap.payload.data());
  //     });
  // }

  // o values changes é igual ao snapshotChanges mas retorna a collection direto, ao invés de payload
  // uma desvantagem de usar esse soperadores de socket é que eles ficam rodando por baixo dos panos,
  // consumindo memória, então o ideial é usar uma função que chame só uma vez (com pipe()) ou dar um unsubscribe
  onReadDoc() {
    this.db
      .doc("courses/2MAC7G8Jqkawrtd7psT0")
      .valueChanges()
      .pipe(
        take(1) // pode usar o take 1 pra treazer somente uma vez
        // ou pode usar o first
        //first()
      )
      .subscribe((course) => {
        console.log(course);
      });
  }
  onReadCollection() {
    this.db
      .collection("/courses", (ref) =>
        ref
          .where("seqNo", "<=", 20)
          .where("url", "==", "angular-forms-course")
          .orderBy("seqNo")
      )
      .get()
      .subscribe((collection) => {
        collection.forEach((snap) => {
          console.log(snap.id);
          console.log(snap.data());
        });
      });
  }
  onReadCollectionGroup() {
    this.db
      .collectionGroup("lessons", (ref) => ref.where("seqNo", "==", 1))
      .get()
      .subscribe((collection) => {
        collection.forEach((snap) => {
          console.log(snap.id);
          console.log(snap.data());
        });
      });
  }
}
