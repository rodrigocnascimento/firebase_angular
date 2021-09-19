const admin = require("firebase-admin");

const serviceAccountPath = process.argv[2];
const userUid = process.argv[3];

console.log(`service accout=${serviceAccountPath}, uid=${userUid}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

async function initAdmin(adminUid) {
  await admin.auth().setCustomUserClaims(adminUid, { admin: true });
  console.log("User is now admin");
}

initAdmin(userUid).then(() => {
  console.log("Finished");
  process.exit();
});
