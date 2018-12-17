import { getClass, deleteClass, searchClass } from '../services/classroom';
import Utils from '../utils/utils';
import { EDIT } from '../routes/Classroom/const';

const UPDATE_STATE = 'updateState';
const SET_LOADING = 'setLoading';
const UPDATE_CLASS_LIST = 'updateClassList';
const UPDATE_CLASS_INFO = 'updateClassInfo';
const CANCEL_EDIT = 'cancelEdit';

export default {
    namespace: 'classroom',
    state: {
        visible: false,
        loading: false,
        type: '',           //操作类型。分为'EDIT'与'ADD',
        classList: [],      //班级列表
        pagination: {
            current: 0,
            pageSize: 10
        },   //分页配置
        classroom: null     //模态框回填信息;
    },
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                classList: payload.content,
                // pagination: {
                //     total: payload.totalElements,
                //     current: payload.pageable.pageNumber + 1,
                //     pageSize: payload.pageSize
                // }    
            }
        },
        updateClassList(state, { payload }) {
            return { ...state, classList: payload }
        },
        setLoading(state, { payload }) {
            return {
                ...state,
                loading: payload
            }
        },
        updateClassInfo(state, { payload }) {
            const { visible, type, classroom = null } = payload;
            return {
                ...state,
                visible,
                type,
                classroom
            }
        },
        cancelEdit(state, { payload }) {
            const { visible, type, classroom } = payload;
            return {
                ...state,
                visible,
                type,
                classroom
            }
        }
    },
    effects: {
        *fetchClassRoomList({ payload }, { put, call }) {
            yield put({ type: SET_LOADING, payload: true })
            const res = yield call(getClass, payload);
            yield put({ type: UPDATE_STATE, payload: res })
            yield put({ type: SET_LOADING, payload: false })
        },
        *deleteClassroom({ payload }, { put, call, select }) {
            const res = yield call(deleteClass, payload);
            res ? Utils.success() : Utils.error();
            const { current, pageSize } = yield select(state => state.classroom.pagination);
            yield put({ type: 'fetchClassRoomList', payload: { current, pageSize } })
        },
        *searchClassroom({ payload }, { call, put }) {
            const res = yield (searchClass, payload);
            if (res) {
                yield put({ type: UPDATE_CLASS_LIST, payload: res.content })
            }
        },
        *editClass({ payload }, { put }) {
            const { e, type } = payload;
            let classroom;
            if (type === EDIT) {
                classroom = JSON.parse(e.currentTarget.dataset['classroom']);
                yield put({
                    type: UPDATE_CLASS_INFO,
                    payload: {
                        visible: true,
                        type,
                        classroom
                    }
                })
            } else {
                yield put({
                    type: UPDATE_CLASS_INFO,
                    payload: {
                        visible: true,
                        type
                    }
                })
            }
        },
        *cancelEditClass({ payload }, { put, call, select }) {
            yield put({ type: CANCEL_EDIT, payload });
        }
    }
}