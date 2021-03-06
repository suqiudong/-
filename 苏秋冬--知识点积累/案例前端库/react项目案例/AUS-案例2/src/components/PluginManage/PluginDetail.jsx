/**
 *插件查看组件
 * User: jiaomx
 * Date: 2017/02/20
 * Time: 13:20
 */

import React, { Component } from 'react';
import createList from 'UTIL/baseList';

class PluginDetail extends Component {
	constructor(props) {
        super(props);
        this.returnHander = this.returnHander.bind(this);
    }

    componentWillMount() {
        // let pluginName = this.props.pluginManage.pluginData.pluginName;
        let pluginName = this.props.params.pluginName;
        this.props.lastPluginInfo(pluginName);
        this.props.jobPluginInfo(pluginName);
    }

    componentDidMount() {
        this.createTable(this.props.pluginManage.lastPluginData.result.detail.collectors, this.props.pluginManage.jobList.result);
        let data = this.props.pluginManage.lastPluginData.result.detail.collectors;
        let td = $('#collectorsList tbody td');
        for (let i = 0; i < data.length; i++) {
            td.eq(3 * i + 2).attr('title', data[i].description);
        }
    }

    componentDidUpdate() {

    }

    createTable(data, data2) {
        // 构造列表配置项
        let tableConfig = {};

        tableConfig.id = 'collectorsList';

        // 定义用户列字段数据
        tableConfig.columns = [
            { data: 'collectorName', 'defaultContent': '-' },
            { data: 'clazzName', 'defaultContent': '-' },
            { data: 'description', 'defaultContent': '-' }
        ];
        tableConfig.scrollX = false;

        // 定义搜索
        tableConfig.searching = false;
        
        // 是否分页
        tableConfig.paging = false;
        
        // 是否左下角的信息
        tableConfig.info = false;

        // 是否排序
        tableConfig.ordering = false;

        // 获取用户列表内数据列
        tableConfig.data = data;

        // 生成插件列表
        createList(tableConfig);

        let tableConfig2 = {};

        tableConfig2.id = 'jobList';

        // 定义用户列字段数据
        for (let i = 0; i < data2.length; i++) {
            data2[i].scheduleStrategy == 'CYCLE' ? data2[i].scheduleStrategy = '周期' : data2[i].scheduleStrategy = '一次'
        }
        tableConfig2.columns = [
            { data: 'jobName', 'defaultContent': '-' },
            { data: 'owner', 'defaultContent': '-' },
            { data: 'schStatus', 'defaultContent': '-' },
            { data: 'scheduleStrategy', 'defaultContent': '-' }
        ];
        tableConfig2.scrollX = false;

        // 定义搜索
        tableConfig2.searching = false;
        
        // 是否分页
        tableConfig2.paging = false;
        
        // 是否左下角的信息
        tableConfig2.info = false;

        // 是否排序
        tableConfig2.ordering = false;

        // 获取用户列表内数据列
        tableConfig2.data = data2;

        // 生成插件列表

        createList(tableConfig2);
    }
   
    returnHander() {
        this.props.history.replace('/plugin');
    }

   
	render() {
		return (
			<div id="pluginDetail">
                <div className="box box-primary">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box-header">
                                
                            </div>
                            <div className="box-body row">
                                <div><span>插件名：</span><p>{this.props.pluginManage.lastPluginData.result.detail.pluginName}</p></div>
                                <div><span>jar包名：</span><p>{this.props.pluginManage.lastPluginData.result.detail.jarName}</p></div>
                                <div><span>所有者：</span><p>{this.props.pluginManage.lastPluginData.result.detail.owner}</p></div>
                                <div><span>开发者：</span><p>{this.props.pluginManage.lastPluginData.result.detail.developer}</p></div>
                                <div><span>描述信息：</span><p style={{marginLeft: '70px'}}>{this.props.pluginManage.lastPluginData.result.detail.description}</p></div>
                                <div><span>版本号：</span><p>{this.props.pluginManage.lastPluginData.result.detail.version}</p></div>
                                <div className='col-md-12' style={{padding: '0'}}><span style={{width: '80px'}}>采集器：</span>
                                    <div className='col-md-10 col-lg-8'>
                                        <table id="collectorsList" className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>采集器名称</th>
                                                    <th>class名</th>
                                                    <th>描述信息</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>

                                <div className='col-md-12' style={{padding: '0'}}><span>作业列表：</span>
                                    <div className='col-lg-8 col-md-10'>
                                        <table id="jobList" className="table table-striped table-bordered ">
                                            <thead>
                                                <tr>
                                                    <th>作业名称</th>
                                                    <th>所有者</th>
                                                    <th>调度状态</th>
                                                    <th>调度方式</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                                
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary " onClick={ this.returnHander}>返回</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
		)
	}
}
export default PluginDetail;
