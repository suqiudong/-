import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
    ({dataSourceConf, router }) => ({dataSourceConf, router }), // mapStateToProps
    require('ACTION/dataSourceConf').default               // mapActionCreators
);

/*
 ������ԴȨ����һ�ַ�ʽ
 const connectComponent1 = createContainer(
 ({ resPrivilege, router }) => ({ resPrivilege, router }), // mapStateToProps
 require('ACTION/resPrivilege').default               // mapActionCreators
 );
 */
export default {
    path: 'dataSourceConf',
    indexRoute: { // ��Ӧ /msg
        getComponent (nextState, cb) {
            require.ensure([], (require) => {
                cb(null, connectComponent(require('COMPONENT/DataSourceConf/DataSourceConf').default))
            }, 'DataSourceConf')
        }
    },

    childRoutes: [
        /*
         { // ��Ӧ /accredit:datasetName
         path: 'accredit/:datasetName',
         getComponent (nextState, cb) {
         require.ensure([], (require) => {
         cb(null, connectComponent1(require('COMPONENT/ResPrivilege/ResPrivilege').default))
         }, 'resPrivilege')
         }
         },
         */
        { // ��Ӧ /msg/detail/:datasetName
            path: 'detail/:dataSourceName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/DataSourceConf/DataSourceConfDetail').default))
                }, 'DataSourceConfDetail')
            }
        },
        { // ��Ӧ /msg/add
            path: 'add',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/DataSourceConf/DataSourceConfAdd').default))
                }, 'DataSourceConfAdd')
            }
        },
        { // ��Ӧ /msg/:datasetName
            path: 'update/:dataSourceName',
            getComponent (nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, connectComponent(require('COMPONENT/DataSourceConf/DataSourceConfUpdate').default))
                }, 'DataSourceConfUpdate')
            }
        }]
}
