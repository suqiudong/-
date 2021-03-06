import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({ jobManage, router }) => ({jobManage, router}),
    require('ACTION/jobManage').default
);

export default {
    path: 'job',

    indexRoute: { // 对应 /plugin
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/JobManage/JobManage').default))
            }, 'JobManage')
        }
    },

    childRoutes: [
        { // 对应 /Job/add
            path: 'add',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/JobManage/JobAdd').default))
                }, 'JobAdd')
            }
        },
        { // 对应 /plugin/detail
            path: 'detail/:jobName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/JobManage/JobDetail').default))
                }, 'JobDetail')
            }
        },
        { // 对应 /Job/update
            path: 'update/:jobName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/JobManage/JobUpdate').default))
                }, 'JobDetail')
            }
        }
    ]
}
