
function authencationGuard(this: any): boolean {
  const isAuthenticated = true;

  console.log(`call authenticationGuard ${isAuthenticated}`)

  return isAuthenticated;

}

function sessionGuard(this: any): boolean {
  const wSession = true;

  console.log(`call sessionGuard ${wSession}`)

  // not recommended to have a navigation inside this function?
  // example > this.navigateTo('/about');
  // it can lead to some complexity & negative effects
  // do it in the routes.redirect

  return wSession;

}

export { authencationGuard, sessionGuard }