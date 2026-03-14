import { GuardContext } from '../../src/jong-router'

export function authencationGuard(ctx?: GuardContext): boolean {
  console.log('Guard check', ctx)
  if (ctx?.params?.teamId === 'blocked') return false
  return true
}