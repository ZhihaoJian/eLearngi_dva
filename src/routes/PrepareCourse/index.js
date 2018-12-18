import React from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layout/PageHeaderLayout';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Button, List, Card } from 'antd';
import AddNoteForm from './components/AddNoteForm';
import ListItem from './components/ListItem';


const { Description } = DescriptionList;

class PrepareCourse extends React.Component {

    state = {
        tabActiveKey: '1',
        cachedCourseList: [],
        loadingMore: false,
        visible: false
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'prepareCourse/fetchList',
            payload: { current: 1, pageSize: 10 }
        })
    }

    onOk = (newData) => {
        const { visible, data } = newData;
        this.props.dispatch({
            type: 'prepareCourse/addCourse',
            payload: { data }
        }).then(() => this.setState({ visible }))
    }

    onCancel = visible => {
        this.setState(visible)
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
            type: 'prepareCourse/deleteCourse',
            payload: { id }
        })
    }

    onAddCourse = () => {
        this.setState({ visible: true })
    }

    render() {
        const { tabActiveKey, loadMore, visible } = this.state;
        const { cachedCourseList, courseList, loading, confirmLoading, fileList } = this.props;
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
        const uploadConfig = {
            name: 'files',
            fileList: fileList,
            beforeUpload: (file) => {
                this.props.dispatch({
                    type: 'prepareCourse/beforeUploadFile',
                    payload: { file }
                })
                return false;
            },
            onRemove: (file) => {
                this.props.dispatch({
                    type: 'prepareCourse/removeFile',
                    payload: { file }
                })
            }
        };
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
                    <Button type='primary' onClick={this.onAddCourse} >新增备课</Button>
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
                            <ListItem item={item} onDeleteCourse={this.onDeleteCourse.bind(this)} />
                        )}
                    />
                    <AddNoteForm
                        uploadConfig={uploadConfig}
                        visible={visible}
                        confirmLoading={confirmLoading}
                        onOk={data => this.onOk(data)}
                        onCancel={visible => this.onCancel(visible)}
                    />
                </Card>
            </PageHeaderLayout>
        )
    }
}

function mapStateToProps(state) {
    return { ...state.prepareCourse }
}

export default connect(mapStateToProps)(PrepareCourse);