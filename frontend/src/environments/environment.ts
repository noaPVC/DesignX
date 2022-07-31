// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  refreshTokensTimeSpan: 15 * 60000,
  defaults: {
    user: { _id: null, firstname: 'User', lastname: 'Not found', email: 'usernotfound@gmail', bio: '-', avatarProfileSource: null, username: 'usernotfound', joined: new Date().toString() },
    registrationForm: { firstname: '', lastname: '', username: '', email: '', bio: '', password: '', passwordConfirmation: '' },
    designItem: { metadata: { _userId: 'none', createdAt: '-', creatorImageSource: 'none', creatorName: 'None', hasAccess: false }, _id: 'none', caption: 'None', description: '-', coverImageSource: 'none', likes: 0, views: 0, tags: [] }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
