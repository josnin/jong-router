// index.ts
import JongRouter, { IRoute } from './src/jong-router'
import { authencationGuard } from './src/guard'

const routes: IRoute[] = [
  { pattern: '/about', html: `<h2>About Page</h2>` },
  { pattern: '/profile/:username', component: import('./samples/profile/profile-component') },
  { pattern: '/tryguard1/:teamId', component: import('./samples/guards/team-component'), guards: [authencationGuard], redirect: '/login' },
  { pattern: '/login', html: `<h2>Login Page</h2>` },
    {
    pattern: "/programmatic",
    component: import("./samples/programmatic/programmatic-navigation"),
  },

  {
  pattern: '/nested',
  component: import('./samples/nested/sample-nested'),
  children: [
    { pattern: '/nested/c1', html: '<p>Nested C1 Page</p>' },
    { pattern: '/nested/c2', html: '<p>Nested C2 Page</p>' },
    { pattern: '/nested/c3', html: '<p>Nested C3 Page</p>' },
    { pattern: '**', html: '<p>Nested 404</p>' }
  ]
},
  { pattern: '**', html: `<h2>404 Page</h2>` }
]

export const router = new JongRouter(routes, document.getElementById('app')!, '', true)
router.init()

