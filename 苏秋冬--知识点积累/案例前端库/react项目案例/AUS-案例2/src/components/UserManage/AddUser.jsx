/**
 *用户添加组件
 * User: jiaomx
 * Date: 2016/12/21
 * Time: 19:52
 */

import React, { Component } from 'react';
import md5 from 'UTIL/md5';
import { baseValidate } from 'UTIL/baseValidate';

class Adduser extends Component {
	constructor(props) {
        super(props);
        this.returnHandler = this.returnHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            if (e && e.keyCode == 13) {
                this.addHandler();
            }
        });
    }

    // 返回事件
    returnHandler() {
        this.props.history.replace('/usermanage');
    }

    // 确定
    addHandler() {
        let constraints = {
            password: {
                presence: {
                    message: '密码不能为空'
                },
                length: {
                    minimum: 6,
                    maximum: 20,
                    message: '密码6-20位有效字符'
                },
                format: {
                    // 字母和数字
                    pattern: '[a-z0-9]+',
                    message: '只能包含字母和数字'
                }
            },
            userName: {
                // 必填
                presence: {
                    message: '用户名不能为空'
                },
                // 长度限制
                length: {
                    minimum: 3,
                    maximum: 20,
                    message: '长度3-20位字符'
                },
                format: {
                    // 字母和数字
                    pattern: '[a-z0-9]+',
                    message: '只能包含字母和数字'
                }
            },
            confirmPasswd: {
                presence: {
                    message: '确认密码不能为空'
                },
                equality: {
                    attribute: 'password',
                    message: '两次输入密码不一致'
                }
            },
            email: {
                email: {
                    message: '请输入正确的邮箱格式'
                }
            },
            tel: {
                format: {
                    // 字母和数字
                    pattern: /^[0][0-9]{2,3}-\d{7,8}|^1[34578]\d{9}$/,
                    message: '请输入正确号码格式,例如"010-XXXXXXXX或者131XXXXXXXX"'
                },
                length: {
                    minimum: 11,
                    maximum: 13,
                    message: '请输入正确号码长度'
                }
            },
            name: {
                // 长度限制
                length: {
                    maximum: 20,
                    message: '长度20位字符以内'
                }
            },
            department: {
                // 长度限制
                length: {
                    maximum: 20,
                    message: '长度20位字符以内'
                }
            },
            position: {
                // 长度限制
                length: {
                    maximum: 20,
                    message: '长度20位字符以内'
                }
            }
        };
        this.refs.save.disabled = true;
        let addUserinfo = {};
        addUserinfo.userName = this.refs.operator.value;
        addUserinfo.passwd = md5(this.refs.passwd.value).toUpperCase();
        addUserinfo.confirmPasswd = this.refs.confirmPasswd.value;
        addUserinfo.name = this.refs.name.value;
        addUserinfo.email = this.refs.email.value;
        addUserinfo.phoneNo = this.refs.tel.value;
        addUserinfo.department = this.refs.department.value;
        addUserinfo.position = this.refs.position.value;
        let isValidate = baseValidate($('#addUser'), constraints);
        if (!isValidate) {
            (async () => {
                await this.props.addUser(addUserinfo);
                debugger;
                if (this.props.usermanage.isAddSuccess.code == 0) {
                    this.refs.save.disabled = false;
                    setTimeout(() => {
                        this.props.history.replace('/usermanage');
                    }, 1000);
                    // window.location.reload();
                } else {
                    this.refs.save.disabled = false;
                }
            })();

        }else {
            this.refs.save.disabled = false;
            return;
        }
    }
	render() {
		return (
			<div id="addUser" className="box box-primary" >
                <div className="row">
                    <div className="col-md-12 box-body">
                        <div className="col-md-5">
                            <div className="form-group col-md-12">
                                <span className='star'>*</span>
                                <label htmlFor="exampleInputOperator">用户名：</label><span className="messages"></span>
                                <input type="text" maxLength={20} ref="operator" name="userName" className="form-control" id="exampleInputOperator" placeholder="请输入账号" />
                            </div>
                            <div className="form-group col-md-12">
                                <span className='star'>*</span>
                                <label htmlFor="exampleInputPasswd">密码：</label><span className="messages"></span>
                                <input type="password" maxLength={20} ref="passwd" name="password" className="form-control" id="exampleInputPasswd" placeholder="请输入密码" />
                            </div>
                            <div className="form-group col-md-12">
                                <span className='star'>*</span>
                                <label htmlFor="exampleInputConfirmPasswd">确认密码：</label><span className="messages"></span>
                                <input type="password" maxLength={20} ref="confirmPasswd" name="confirmPasswd" className="form-control" id="exampleInputConfirmPasswd" placeholder="请再次输入密码" />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputName">姓名：</label>
                                <input type="text" maxLength={20} ref="name" name="name" className="form-control" id="exampleInputName" placeholder="请输入姓名" />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputEmail1">邮箱：</label><span className="messages"></span>
                                <input type="email" maxLength={30} ref="email" name="email" className="form-control" id="exampleInputEmail1" placeholder="请输入邮箱" />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputTel">电话：</label><span className="messages"></span>
                                <input type="text" maxLength={13} ref="tel" name="tel" className="form-control" id="exampleInputTel" placeholder="请输入电话" />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputDepartment">部门：</label><span className="messages"></span>
                                <input type="text" maxLength={20} ref="department" name="department" className="form-control" id="exampleInputDepartment" placeholder="请输入部门" />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputPosition">职位：</label><span className="messages"></span>
                                <input type="text" maxLength={20} ref="position" name="position" className="form-control" id="exampleInputPosition" placeholder="请输入职位" />
                            </div>
                        </div>
                        <div className="box-button col-md-12">
                            <button className="btn btn-primary" onClick={this.returnHandler}>返回</button>
                            <button className="btn btn-primary" ref="save" onClick={this.addHandler}>保存</button>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
}
export default Adduser;
