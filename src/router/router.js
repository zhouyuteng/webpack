const routers = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/index',
        name: '首页',
        meta: {
            title: ''
        },
        component: res => require(['../views/index.vue'], res),
        children: [
            {
                path: '',
                redirect: 'user'
            },
            {
                path: 'user',
                name: '用户管理',
                component: res => require(['../views/user.vue'], res)
            },
            {
                path: 'preview',
                name: '预览',
                component: res => require(['../views/preview.vue'], res)
            },
            {
                path: 'sysSetting',
                name: '系统设置',
                component: res => require(['../views/sysSetting.vue'], res)
            }
        ]
    },
    // {
    //     path: '/login',
    //     name: '登录',
    //     meta: {
    //         title: ''
    //     },
    //     component: (resolve) => require(['../views/login.vue'], resolve)
    // },
    {
        path: '*',
        name: '404',
        meta: {
            title: '404'
        },
        component: (resolve) => require(['../views/404.vue'], resolve)
    }
];
export default routers;