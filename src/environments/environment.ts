// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBBsmc_seBCdBBDPfDskYKQAtXyJLVoOtg",
    authDomain: "fir-course-recording-be876.firebaseapp.com",
    projectId: "fir-course-recording-be876",
    storageBucket: "fir-course-recording-be876.appspot.com",
    messagingSenderId: "111695350487",
    appId: "1:111695350487:web:1ce940ff09d5f17ee3fe92",
  },
  api: {},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import "zone.js/plugins/zone-error"; // Included with Angular CLI.
