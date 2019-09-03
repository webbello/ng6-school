// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // URL of production API
  apiUrl: 'http://192.168.17.35:3000',
  phpApiUrl: 'http://192.168.17.35/quizApi/public/api'

  // apiUrl: 'https://eclass.iirs.gov.in:3000',
  // phpApiUrl: 'https://eclass.iirs.gov.in/quizApi/public/api'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
