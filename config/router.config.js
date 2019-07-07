export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        component: './User/Login'
      },
      {
        path: '/user/register',
        component: './User/Register'
      },
      {
        path: '/user/register-result',
        component: './User/RegisterResult'
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      // dashboard
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        icon: 'home',
        component: './Home/Home',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'cloud',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/dashboard/domainmanager',
            name: 'domainmanager',
            routes: [
              {
                path: '/dashboard/domainmanager/domains',
                name: 'domains',
                component: './Dashboard/Domains',
              },
              {
                path: '/dashboard/domainmanager/create',
                name: 'create',
                component: './Dashboard/Create/Index',
                hideInMenu: true,
              },
              {
                path: '/dashboard/domainmanager/config/:id',
                name: 'config',
                component: './Dashboard/DomainConfig/DomainConfig',
                hideInMenu: true,
              },
            ],
          },
          {
            path: '/dashboard/ctmanager',
            name: 'ctmanager',
            routes: [
              {
                path: '/dashboard/ctmanager/status',
                name: 'status',
                component: './Dashboard/Status',
              },
              {
                path: '/dashboard/ctmanager/synctask',
                name: 'synctask',
                component: './Dashboard/Synctask',
              },
            ],
          },
          {
            path: '/dashboard/cdnmanager',
            name: 'cdnmanager',
            routes: [{
              path: '/dashboard/cdnmanager/edge',
              name: 'edge',
              component: './Dashboard/Edge',
            }, ],
          },
          {
            path: '/dashboard/systemmanager',
            name: 'systemmanager',
            routes: [{
                path: '/dashboard/systemmanager/account',
                name: 'account',
                component: './Dashboard/Account',
              },
              {
                path: '/dashboard/systemmanager/privelege',
                name: 'privelege',
                component: './Dashboard/Privelege',
              },
              {
                path: '/dashboard/systemmanager/role',
                name: 'role',
                component: './Dashboard/Role',
              },
              {
                path: '/dashboard/systemmanager/parameter',
                name: 'parameter',
                component: './Dashboard/Parameter',
              },
            ],
          },
        ],
      },
      {
        path: '/scandomain',
        name: 'scandomain',
        icon: 'safety',
        component: './ScanDomain/ScanDomain',
      },
      {
        path: '/cttrends',
        name: 'cttrends',
        icon: 'bar-chart',
        component: './CTTrends/CTTrends',
      },
      {
        path: '/ct',
        name: 'ct',
        icon: 'security-scan',
        component: './CT/CT',
      },
      {
        path: '/lab',
        name: 'lab',
        icon: 'experiment',
        component: './Lab/Lab',
      },
      {
        path: '/about',
        name: 'about',
        icon: 'eye',
        component: './About/About',
      },
      {
        name: 'usercenter',
        path: '/usercenter',
        hideInMenu: true,
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        component: './User/UserCenter',
      },
      {
        name: 'exception',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            hideInMenu: true,
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            hideInMenu: true,
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            hideInMenu: true,
            component: './Exception/500',
          },
        ],
      },
    ],
  },
];
