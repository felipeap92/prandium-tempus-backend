import 'reflect-metadata';

import { UserSeed } from './user.seed';

(async () => {
  Promise.all([
    UserSeed.CreateUsers(),
  ]).then(() => {
    // tslint:disable-next-line: no-console
    console.log('Seed execution completed!');
  }).catch((error) => {
    // tslint:disable-next-line: no-console
    console.log(error);
  });
})();
