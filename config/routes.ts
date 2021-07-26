export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'chat',
    icon: 'table',
    path: '/chat',
    routes: [
      {
        path: '/chat/list',
        name: 'chat-list',
        icon: 'smile',
        component: './chat',
      },
    ]
  },
  {
    name: 'contact',
    icon: 'table',
    path: '/contact',
    routes: [
      {
        path: '/contact/account/list',
        name: 'account-list',
        icon: 'smile',
        component: './contact/Account',
      },
      {
        path: '/contact/employee/list',
        name: 'employee-list',
        icon: 'smile',
        component: './contact/employee',
      },
    ]
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    hideInMenu: true,
    component: './Welcome',
  },
  // {
  //   name: '分析页',
  //   icon: 'smile',
  //   path: '/dashboardanalysis',
  //   component: './DashboardAnalysis',
  // },
  {
    component: './404',
  },
];
