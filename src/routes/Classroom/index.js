import React from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layout/PageHeaderLayout';
import { Button, Icon, Popover, Popconfirm, Input } from 'antd';
import CardList from '../../components/CardList/CardList';
import EditModal from './edit-modal';
import { ADD, EDIT, DEFAULT_TYPE } from './const';

const Search = Input.Search;

class ClassRoom extends React.Component {

    componentDidMount() {
        this.fetchClassRoom();
    }

    /**
     * 加载班级列表
     */
    fetchClassRoom = (current = 0, pageSize = 8) => {
        this.props.dispatch({
            type: 'classroom/fetchClassRoomList',
            payload: { current, pageSize }
        })
    }

    /**
     * 删除指定班级
     */
    deleteClassroom = (e, id) => {
        this.props.dispatch({
            type: 'classroom/deleteClassroom',
            payload: { id }
        })
    }

    /**
     * 模糊搜索
     */
    onSearch = value => {
        this.props.dispatch({
            type: 'classroom/searchClassroom',
            payload: value
        })
    }

    /**
     * 编辑课程基本信息 
     */
    editClass = (e, type) => {
        e.stopPropagation();
        this.props.dispatch({
            type: 'classroom/editClass',
            payload: { e, type }
        })
    }

    /**
     * 编辑提交
     * @param {Object} data
     */
    onEditSubmit = data => {
        const { type, classroom } = this.props;
        data = { ...classroom, ...data };
        // if (type === EDIT) {
        //     modifyClassInfo(data).then(res => {
        //         this.onEditSubmitCallBack();
        //     })
        // } else if (type === ADD) {
        //     addClass(data).then(res => {
        //         this.onEditSubmitCallBack();
        //     })
        // }
    }

    /**
     * 渲染分页
     */
    rendePagination = () => {
        const { pagination } = this.props;
        const that = this;
        let paginationInfo = Object.assign({ showQuickJumper: true }, pagination);
        paginationInfo.onChange = function (page, pageSize) {
            that.fetchClassRoom(page - 1);
        }
        return paginationInfo;
    }

    /**
     * 编辑/新建 成功回调
     */
    onEditSubmitCallBack = () => {
        this.props.dispatch({
            type: 'classroom/cancelEditClass',
            payload: {
                visible: false,
                type: DEFAULT_TYPE,
                classroom: null
            }
        })
    }

    /**
     * 渲染action图标
     */
    renderActions = (item) => {
        const id = item.id;
        return [
            <Popconfirm
                placement="bottom"
                title={'确定要删除该班级?'}
                okType='danger'
                onConfirm={e => this.deleteClassroom(e, id)}
                okText="我确定"
                cancelText="再想想"
            >
                <Icon type="delete" title='删除班级' />,
            </Popconfirm>,
            <Icon type="edit" title='编辑' data-classroom={JSON.stringify(item)} onClick={e => this.editClass(e, EDIT)} />,
            <Popover
                placement='bottomLeft'
                title='分享至'
                content={(
                    <div className='opera-icon' >
                        <Icon type="qq" title='分享到QQ' />
                        <Icon type="wechat" title='分享给微信好友' />
                        <Icon type="google-plus" title='分享到 Google Plus 社区' />
                    </div>
                )}
            >
                <Icon type="share-alt" title='分享' />
            </Popover>
        ]
    }

    render() {
        const { classroom, classList, visible, type, loading } = this.props;
        return (
            <PageHeaderLayout
                title='班级列表'
                breadcrumbList={this.props.breadcrumbList}
                extraContent={(<Button type='primary' onClick={e => this.editClass(e, ADD)} >新建班级</Button>)}
                action={(
                    <Search
                        placeholder="输入检索内容，然后回车"
                        onSearch={value => this.onSearch(value)}
                        style={{ width: 200 }}
                    />
                )}
            >
                <CardList
                    actions={this.renderActions}
                    data={classList}
                    pagination={this.rendePagination()}
                    loading={loading}
                />
                <EditModal
                    classroom={classroom}
                    type={type}
                    visible={visible}
                    onSubmit={data => this.onEditSubmit(data)}
                    onCancel={this.onEditSubmitCallBack.bind(this)}
                />
            </PageHeaderLayout>
        )
    }
}

function mapStateToProps(state) {
    return { ...state.classroom }
}

export default connect(mapStateToProps)(ClassRoom)