const host = '';
const prefix = 'api/v1';

export default {
  signInPagePath: () => [host, 'login'].join('/'),
  signInPath: () => [host, prefix, 'login'].join('/'),
  dataPath: () => [host, prefix, 'data'].join('/'),
  chatPage: () => '/',
  missingPagePath: () => [host, '404'].join('/'),
};
