import React from 'react';
import { Link } from 'dva/router';
import { List, Popconfirm, Icon, Divider } from 'antd';
import PropTypes from 'prop-types';

/**
 * 备课区列表item
 */
export default class ListItem extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <List.Item
                extra={(<img width={272} alt="cover" src={`${item.coverURL}`} />)}
                actions={
                    [
                        <Link to={`/prepare-course/edit?type=edit&key=${item.id}&name=${encodeURIComponent(item.name)}`}>编辑</Link>,
                        <Popconfirm
                            title='确认要删除改备课信息?'
                            onConfirm={() => this.props.onDeleteCourse(item.id)}
                            placement='right'
                        >
                            <a>删除</a>
                        </Popconfirm>
                    ]
                }
            >
                <List.Item.Meta
                    title={<Link to={`/prepare-course/edit?key=${item.id}`}>{item.name}</Link>}
                    description={(
                        <React.Fragment>
                            <div style={{ padding: '12px 0' }} >
                                <div>{item.description}</div>
                                <div style={{ marginTop: 10 }}>备注：{item.remark}</div>
                                <div style={{ marginTop: 10 }} ><Icon type='tag' /> 标签：{(
                                    item.type.map((v, idx) => (
                                        <React.Fragment key={idx} >
                                            <a>{v}</a>
                                            <Divider type="vertical" />
                                        </React.Fragment>
                                    ))
                                )}</div>
                            </div>
                        </React.Fragment>
                    )}
                />
                <div className='course-info'>
                    发布状态：
                                    <a>{item.isRelease ? '已发布' : '未发布'}</a>
                </div>
                <div className='course-info' >
                    修改时间：<span style={{ paddingLeft: 6 }} >{(new Date()).toLocaleDateString(item.createTime)}</span>
                </div>
            </List.Item>
        )
    }
}

ListItem.propTypes = {
    item: PropTypes.object.isRequired
}