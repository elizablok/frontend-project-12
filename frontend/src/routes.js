const host = '';

export default {
  signInPagePath: () => [host, 'login'].join('/'),
  chatPage: () => '/',
  missingPagePath: () => [host, '404'].join('/'),
};
