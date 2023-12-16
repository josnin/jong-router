// Import the JongRouter class

import JongRouter, { IRoute } from './src/jong-router';
import { authencationGuard, sessionGuard } from './src/guard';



// Configurable variables

const routes: IRoute[] = [

    { pattern: '/', component: import('./src/home-component') },

    { pattern: '/about', component: import('./src/about-component') },
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
    { pattern: '**', component: import('./src/profile-component') },

];



// Create an instance of the WebComponentsRouter class

const router = new JongRouter(routes, 'app');



// Initialize the router

router.init();