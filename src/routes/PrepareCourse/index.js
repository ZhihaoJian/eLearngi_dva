import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PageHeaderLayout from '../../layout/PageHeaderLayout';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Button, List, Card, Popconfirm } from 'antd';

const { Description } = DescriptionList;

class PrepareCourse extends React.Component {

    state = {
        tabActiveKey: '1',
        cachedCourseList: [],
        loadingMore: false
    }

    componentDidMount(){
        this.props.dispatch({
            type:'prepareCourse/fetchList',
            payload:{ current:1,pageSize:10 }
        })
    }

    onTabChange = (tabActiveKey) => {
        this.setState({ tabActiveKey });
        this.props.dispatch({
            type: 'prepareCourse/tabChange',
            payload: tabActiveKey
        })
    }

    onDeleteCourse = id => {
        this.props.dispatch({
            type:'prepareCourse/deleteCourse',
            payload: {id}
        })
    }

    render() {
        const { tabActiveKey, loadMore } = this.state;
        const { cachedCourseList, courseList ,loading } = this.props;
        const tabList = [{
            key: '1',
            tab: '备课记录',
        }, {
            key: '2',
            tab: '未发布',
        },
        {
            key: '3',
            tab: '已发布',
        }];
        const description = (
            <DescriptionList size="small" col="3" layout="horizontal">
                <Description term="课程数量">{courseList.length}</Description>
                <Description term="已发布">{courseList.filter(v => v.isRelease === 1).length}</Description>
                <Description term="未发布">{courseList.filter(v => v.isRelease === 0).length}</Description>
            </DescriptionList>
        );
        return (
            <PageHeaderLayout
                title='备课区'
                tabList={tabList}
                content={description}
                tabActiveKey={tabActiveKey}
                onTabChange={key => this.onTabChange(key)}
                action={(
                    <Button type='primary'>新增备课</Button>
                )}
            >
                <Card
                    bordered={false}
                    className='prepare-course-container'
                >
                    <List
                        className="prepare-course-list"
                        loading={loading}
                        size='large'
                        itemLayout="vertical"
                        pagination={{ pageSize: 5 }}
                        loadMore={loadMore}
                        dataSource={cachedCourseList}
                        renderItem={item => (
                            <List.Item
                                extra={(<img width={272} alt="cover" src={`${item.coverURL}`} />)}
                                actions={
                                    [
                                        <Link to={`/prepare-course/edit?type=edit&key=${item.id}&name=${encodeURIComponent(item.name)}`}>编辑</Link>,
                                        <Popconfirm
                                            title='确认要删除改备课信息?'
                                            onConfirm={() => this.onDeleteCourse(item.id)}
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
                                                <div style={{ marginTop: 10 }} >标签：<a>{item.type || '无'}</a></div>
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
                        )}
                    />
                    {/* <AddNoteForm
                        visible={this.state.visible}
                        confirmLoading={this.state.confirmLoading}
                        onOk={data => this.onOk(data)}
                        onCancel={visible => this.onCancel(visible)}
                    /> */}
                </Card>
            </PageHeaderLayout>
        )
    }
}

function mapStateToProps(state) {
    return { ...state.prepareCourse }
}

export default connect(mapStateToProps)(PrepareCourse);