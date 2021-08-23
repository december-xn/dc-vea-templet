import Layout from '@/layout'

const manageRouter = {
    path: '/personnel/manage',
    component: Layout,
    redirect: 'noRedirect',
    name: 'PersonnelManage',
    meta: {
        title: '人员管理',
        icon: 'chart'
    },
    roles: 1100
}

export default manageRouter
