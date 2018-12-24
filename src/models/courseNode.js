import {
    fetchRootNode,
    dynamicLoadNode,
    updateNodeName,
    loadFile,
    deleteNode,
    updateFileContent
} from '../services/courseNode';
import { message } from 'antd';

export const operation = {
    ADD: 'ADD',
    DEL: 'DEL',
    UPDATE: 'UPDATE'
}

export default {
    namespace: 'courseNode',
    state: {
        treeData: [],
        selectedKey: '',
        selectedId: ''
    },
    effects: {
        /**
         * 将旧数据和新数据合并，成为新的树 
         * 
         * 1.parentNode === null && node !== null 删除、更新操作
         * 2.parentNode !== null && node === null 添加|删除、更新（后两个需要将parentNode与node位置交换）
         * 
         * @param {object} parentNode 节点对象，可为父节点或者当前新增节点(parentNode为新增子节点则两个变量交换)
         * @param {object} node 节点对象，子节点
         * @param {string} type 操作类型 可能为ADD|DEL|UPDATE
         * @param {object} params 针对CRUD的参数
         */
        *updateTree({ parentNode, node, type, params }, { put, call, select }) {
            const { ADD, UPDATE, DEL } = operation;

            if (type === ADD && parentNode) {
                //添加节点操作
                //获取点击节点的子节点列表
                //根据子节点列表计算新节点的nodeKey -- 注意为子节点列表为空的时候
                //插入到父节点的children下
                const keys = parentNode.children.map(v => v.props.eventKey);
                const childrenKeys = keys.length ? keys.forEach((v) => {
                    const r = v.split('-');
                    return Number.parseInt(r[r.length - 1], 10);
                }) : [0];
                const maxKey = Math.max(...childrenKeys) + 1;
                const nodeKey = `${parentNode.props.eventKey}-${maxKey}`;
                //TODO:
            } else if (type === DEL && (parentNode || node)) {
                //删除操作，找到当前结点的父节点，父节点children清空
                if (parentNode && node == null) {
                    node = parentNode;
                    parentNode = null;
                }
                //叶子节点，则找到父节点，删除自身
                //否则删除整个子节点
                let id, //子节点自身id
                    p_id;   //父节点自身id

                parentNode = yield put({ type: 'fetchParentNode', node });
                if (parentNode) {
                    //记录删除节点的父节点id,方便做父节点children刷新
                    p_id = parentNode.props.id;
                    id = node.props.id;

                    //TODO: 获取节点id将其删除
                    yield call(deleteNode, id);
                    //加载已删除节点的children
                    yield call(dynamicLoadNode, { id: p_id })
                } else {
                    yield put({ type: 'fetchRootNode', payload: { ...params } })
                }

            } else if (type === UPDATE && (parentNode || node)) {
                if (node && parentNode == null) {
                    parentNode = yield put({ type: 'fetchParentNode', node });
                }
                //更新节点名称
                yield call(updateNodeName, {
                    id: node.props.id,
                    ...params
                });
                //刷新父节点
                yield call(dynamicLoadNode, { id: parentNode.props.id })
            }
        },
        /**
         * 给定一个节点，查询它的父节点，如果返回null，则代表是根节点
         * @param {object} node 
         * @returns {object|null} 父节点 | null
         */
        *fetchParentNode({ node }, { put, call, select }) {
            if (node.isRoot) return null;

            let parentNode;
            const treeData = yield select(state => state.courseNode.treeData);
            let cachedParentNode = [...treeData];   //记录循环子节点的父节点

            // 例如 [0,0,1] 代表第0层第2个节点，第0层是0-0，第0层第1个事0-0-0，第0层第2个事0-0-1
            // 实际上我们会从keyArray下标为1位置开始遍历 --> [0,1]
            const keys = node.event.key.split('-').map(v => Number.parseInt(v, 10));
            const keyArray = keys.slice(1, keys.length);

            keyArray.forEach(r => {
                parentNode = cachedParentNode[r];
                cachedParentNode = parentNode.children;
            });

            return parentNode;
        },
        //加载根节点
        *fetchRootNode({ payload }, { put, call }) {
            const res = yield call(fetchRootNode, payload);
            if (res) {
                yield put({
                    type: 'updateState',
                    payload: { treeData: res }
                })
            }
        },
        // 更新指定节点，更新Redux中的树
        *updateNode({ node }, { select, put }) {
            if (node == null) return;

            let parentNode;
            const oldTreeData = yield select(state => state.courseNode.treeData);
            let cachedData = [...oldTreeData];

            const _updateNode = (node) => {
                //查找父节点
                const key = node.event ? node.event.keys : node.parentKey;
                const keys = key.split('-').map(v => Number.parseInt(v, 10));
                //获取指定节点的node key 数组，从1开始
                const keyArray = keys.slice(1, keys.length);
                let cachedParentNode = cachedData;

                keyArray.forEach(r => {
                    parentNode = cachedParentNode[r];
                    cachedParentNode = parentNode.children;
                });

                //更新节点到父节点下
                if (parentNode.children) {
                    let tmpIdx; // 缓存相同结果的位置

                    const hasSameNode = parentNode.children.filter((v, idx) => {
                        const p_key = v.event ? v.event.keys : v.nodeKey,
                            q_key = node.event ? node.event.keys : node.nodeKey;
                        if (p_key === q_key) {
                            tmpIdx = idx;
                            return true;
                        }
                        return false;
                    }).length > 0;
                    //替换原先的node节点
                    if (hasSameNode) parentNode.children[tmpIdx] = node;
                    else parentNode.children.push(node);
                } else {
                    parentNode.children = [node];
                }
            }

            //如果是数组，则一定是后台请求回来，否则是用户点击界面的treenode对象
            if (Object.prototype.toString.call(node) === "[object Array]") {
                node.forEach(v => _updateNode(v));
            } else
                _updateNode(node);

            yield put({ type: 'updateState', payload: { treeData: cachedData } });
        },
        //根据父节点，加载子节点
        *dynamicLoadNode({ payload }, { call, put }) {
            const res = yield call(dynamicLoadNode, payload);
            if (res) {
                yield put({ type: 'updateNode', node: res });
            }
        },
        //根据节点，加载文本
        *loadFile({ payload }, { call, put }) {
            const { id, selectedKey, selectedId } = payload
            const res = yield call(loadFile, id);
            yield put({ type: 'updateState', payload: { selectedKey, selectedId } })
            if (res) {
                return res.content;
            }
        },
        *updateFileContent({ payload }, { put, call }) {
            const res = yield call(updateFileContent, payload);
            if (res) {
                message.success('更新成功')
            }
        }
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    }
}