import * as functions from "firebase-functions";

(function cloudFunctionInit() {
  return functions.runWith({
    timeoutSeconds: 300,
    memory: "128MB",
  });
})();

async function runTrigger(trigger: string, data: any, context: any) {
  const result = await (await import(trigger)).default(data, context);

  functions.logger.info(`${trigger} result:`, result);

  return result;
}

export const onAddCourseUpdatePromoCounter = functions.firestore
  .document("courses/{courseId}")
  .onCreate(
    async (snap, context) =>
      await runTrigger("./promotions-counter/on-add-course", snap, context)
  );

export const onCourseUpdatedUpdatePromoCounter = functions.firestore
  .document("courses/{courseId}")
  .onUpdate(
    async (changes, context) =>
      await runTrigger(
        "./promotions-counter/on-update-course",
        changes,
        context
      )
  );

export const onCourseDeleteUpdatePromoCounter = functions.firestore
  .document("courses/{courseId}")
  .onDelete(
    async (snap, context) =>
      await runTrigger("./promotions-counter/on-delete-course", snap, context)
  );

// https://firebase.google.com/docs/functions/typescript
// transactions are good for concurrency on database
//      return db.runTransaction(async (transaction) => {
//        const counterRef = db.doc("courses/stats");
//
//        const snap = await transaction.get(counterRef);
//
//        const stats = snap.data() ?? { totalPromo: 0 };
//
//        stats.totalPromo += 1;
//
//        transaction.set(counterRef, stats);
//      });
