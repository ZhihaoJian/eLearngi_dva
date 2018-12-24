import React from 'react';
import ReactDOM from 'react-dom';
import { Drawer, Tree, Spin, Tooltip, Popconfirm, Input } from 'antd';
import qs from 'query-string';
import { connect } from 'dva';
import { operation } from '../../../models/courseNode';
import styles from '../styles/DrawerTree.less';

const { ADD, DEL, UPDATE, ADD_FOLDER, ADD_VIDEO_RESOURCE } = operation;

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

class DrawerTree extends React.Component {

    state = {
        courseId: qs.parse(window.location.search).key,
        spinning: false
    }

    componentDidMount() {
        const { courseId } = this.state;
        this.setState({ spinning: true })
        this.props.dispatch({
            type: 'courseNode/fetchRootNode',
            payload: courseId
        }).then(() => this.setState({ spinning: false }))
    }

    onSelect = (expandedKeys, { selected, selectedNodes, node }) => {
        if (selected) {
            const { enableEditorSpinning, dispatch, updateEditorState } = this.props;
            const id = node.props.dataRef.id;
            enableEditorSpinning();
            dispatch({
                type: 'courseNode/loadFile',
                payload: {
                    id,
                    selectedId: id,
                    selectedKey: node.props.eventKey
                }
            }).then((content) => {
                updateEditorState(content);
            });
        }
    }

    onExpand = (selectedKeys, { expanded, node }) => {
        if (expanded) {
            const { courseId } = this.state;
            const nodeKey = node.props.eventKey;
            this.setState({ spinning: true })
            this.props.dispatch({
                type: 'courseNode/dynamicLoadNode',
                payload: { parentKey: nodeKey, courseId }
            }).then(() => this.setState({ spinning: false }))
        }
    }

    /**
     * 递归渲染树节点
     */
    generateTreeByData = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode
                        key={item.nodeKey}
                        dataRef={item}
                        title={item.title}
                    >
                        {this.generateTreeByData(item.children)}
                    </TreeNode>);
            }
            return <TreeNode
                key={item.nodeKey}
                dataRef={item}
                title={item.title}
                isLeaf={item.leaf}
            />;
        });
    }

     /**
     * 点击context menu
     */
    onContextMenuClick = (e) => {
        e.stopPropagation();
        
    }

    getContainer() {
        if (!this.cmContainer) {
            this.cmContainer = document.createElement('div');
            document.body.appendChild(this.cmContainer);
        }
        return this.cmContainer;
    }

    renderCm(event, menu) {
        if (this.menu) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            this.menu = null;
        }
        this.menu = (
            <Tooltip
                trigger='click'
                defaultVisible
                overlay={(
                    <div className={styles['context-menu']} onClick={(e) => this.onContextMenuClick(e)} >{menu}</div>
                )}
            >
            </Tooltip>
        );

        const container = this.getContainer();
        Object.assign(this.cmContainer.style, {
            position: 'absolute',
            left: `${event.pageX}px`,
            top: `${event.pageY + 10}px`,
        });

        ReactDOM.render(this.menu, container);
    }

    /**
     * 根据不同结点生成不同的context menu
     * @param 当前结点
     */
    generateMenuTooltip = (dataRef) => {
        let menu,
            fileName = dataRef.title;
        menu = (
            <React.Fragment>
                {
                    dataRef.leaf ? null : (
                        <React.Fragment>
                            <div className={ADD} ><span>新建文件</span></div>
                            <div className={ADD_FOLDER} ><span>新建文件夹</span></div>
                            <div className={ADD_VIDEO_RESOURCE} onClick={() => this.onUploadResource()} ><span>上传视频资源</span></div>
                        </React.Fragment>
                    )
                }
                <Popconfirm
                    title={<Input defaultValue={fileName} onChange={(e) => this.setState({ fileName: e.target.value })} />}
                    onConfirm={this.onComfirmUpdate}
                    okText='确定'
                    placement='left'
                    cancelText='取消 '
                >
                    <div className={UPDATE} ><span>修改名称</span></div>
                </Popconfirm>
                <div className={DEL} ><span>删除</span></div>
            </React.Fragment>
        )
        return menu;
    }

    onRightClick = ({ event, node }) => {
        const nodeKey = node.props.eventKey;
        let menu = this.generateMenuTooltip(node.props.dataRef);
        this.renderCm(event, menu);
    }

    render() {
        const { spinning } = this.state;
        const { name, visible, treeData } = this.props;
        return (
            <Drawer
                width={350}
                title={name}
                placement='right'
                closable={false}
                onClose={this.props.onClose}
                visible={visible}
            >
                <Spin spinning={spinning} >
                    <DirectoryTree
                        multiple
                        onSelect={this.onSelect}
                        onExpand={this.onExpand}
                        onRightClick={this.onRightClick}
                        defaultExpandAll={false}
                    >
                        {this.generateTreeByData(treeData)}
                    </DirectoryTree>
                </Spin>
            </Drawer>
        )
    }
}

function mapStateToProps(state) {
    return { ...state.courseNode }
}

export default connect(mapStateToProps)(DrawerTree);