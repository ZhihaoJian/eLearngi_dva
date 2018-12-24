import React from 'react';
import { Drawer, Tree, Spin } from 'antd';
import qs from 'query-string';
import { connect } from 'dva';

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

    onRightClick = ({ event, node }) => {
        const nodeKey = node.props.eventKey;
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