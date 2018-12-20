import React from 'react';
import { Drawer, Tree } from 'antd';
import qs from 'query-string';
import { connect } from 'dva';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

class DrawerTree extends React.Component {

    state = {
        courseId: qs.parse(window.location.search).key
    }

    componentDidMount() {
        const { courseId } = this.state;
        this.props.dispatch({
            type: 'courseNode/fetchRootNode',
            payload: courseId
        })
    }

    onSelect = (expandedKeys, { selected, selectedNodes, node }) => {
        const nodeKey = node.props.eventKey;
    }

    onExpand = (selectedKeys, { expanded, node }) => {
        if (expanded) {
            const { courseId } = this.state;
            const nodeKey = node.props.eventKey;
            this.props.dispatch({
                type: 'courseNode/dynamicLoadNode',
                payload: { key: nodeKey, courseId }
            })
        }
    }

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
                isLeaf
            />;
        });
    }

    onRightClick = ({ event, node }) => {
        const nodeKey = node.props.eventKey;
    }

    render() {
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
                <DirectoryTree
                    multiple
                    defaultExpandAll
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                    onRightClick={this.onRightClick}
                >
                    {/* <TreeNode title="React基本介绍" key="0-0">
                        <TreeNode title="前端的历史进程" key="0-0-0" isLeaf />
                        <TreeNode title="React和其余框架的对比" key="0-0-1" isLeaf />
                    </TreeNode>
                    <TreeNode title="搭建React开发环境" key="0-1">
                        <TreeNode title="安装NodeJS" key="0-1-0" isLeaf />
                        <TreeNode title="使用NPM安装create-react-app" key="0-1-1" isLeaf />
                    </TreeNode> */}
                    {this.generateTreeByData(treeData)}
                </DirectoryTree>
            </Drawer>
        )
    }
}

function mapStateToProps(state) {
    return { ...state.courseNode }
}

export default connect(mapStateToProps)(DrawerTree);