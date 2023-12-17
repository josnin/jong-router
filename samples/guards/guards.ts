
function authGuard(this: any): boolean {
  const isAuthenticated = true;

  return isAuthenticated;

}

function sessionGuard(this: any): boolean {
  const wSession = true;


  // not recommended to have a navigation inside this function?
  // example > this.navigateTo('/about');
  // it can lead to some complexity & negative effects
  // do it in the routes.redirect

  return wSession;

}

export { authGuard, sessionGuard }