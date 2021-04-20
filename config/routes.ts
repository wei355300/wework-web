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
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
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
   name: 'employee',
    icon: 'table',
    path: '/employee',
    routes: [
      {
        path: '/employee/list',
        name: 'employee-list',
        icon: 'smile',
        component: './employee',
      },
      {
        path: '/employee/account',
        name: 'account-list',
        icon: 'smile',
        component: './employee/Account',
      },
    ]
  },
  {
    path: '/',
    redirect: '/welcome',
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
