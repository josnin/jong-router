// Import the JongRouter class

import JongRouter, { IRoute } from './src/jong-router';
import { authencationGuard, sessionGuard } from './src/guard';



// Configurable variables

const routes: IRoute[] = [


    { pattern: '/nestedroutes/c1', component: import('./samples/nestedroutes/child-routes') },
    { pattern: '/tryguard1/:teamId', 
      component: import('./src/team-component'),
      guards: [authencationGuard, sessionGuard],
      redirect: '/login'
    },
    { pattern: '/tryguard2/:teamId', 
      component: import('./src/team-component'),
      redirect: '/login'
    },

    { pattern: '/login', html: ` Pls login first! `},
    { pattern: '/profile/:username', 
      component: import('./src/profile-component'),
      data: { abc: 1}
    },
    { pattern: '**', html: ` Page not found!` }

];



// Create an instance of the WebComponentsRouter class

const router = new JongRouter(routes, document.getElementById('app'));



// Initialize the router

router.init();