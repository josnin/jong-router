// Import the JongRouter class

import JongRouter, { IRoute } from './src/jong-router';
import { authencationGuard } from './src/guard';



// Configurable variables

const routes: IRoute[] = [

    { pattern: '/', component: import('./src/home-component') },

    { pattern: '/about', component: import('./src/about-component') },
    { pattern: '/tryguard1/:teamId', 
      component: import('./src/team-component'),
      guard: authencationGuard,
      redirect: '/unauthorized'
    },
    { pattern: '/tryguard2/:teamId', 
      redirect: '/unauthorized'
    },

    { pattern: '/unauthorized', html: ` Unauthorized user `},
    { pattern: '/profile/:username', component: import('./src/profile-component') },

];



// Create an instance of the WebComponentsRouter class

const router = new JongRouter(routes);



// Initialize the router

router.init();