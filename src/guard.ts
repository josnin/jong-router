
function authencationGuard(this: any): boolean {
  const isAuthenticated = false;

  console.log(this.navigateTo('/about'))

  return isAuthenticated;

}


export { authencationGuard }