import { fetchPrepareCourseList, deleteCourse } from "../services/preparecourse";
import {message} from 'antd';

const UPDATE_STATE = 'updateState';

export default {
    namespace: 'prepareCourse',
    state: {
        loading: false,
        courseList: [],
        cachedCourseList: []
    },
    effects: {
        *tabChange({ payload }, { put, select }) {
            const { courseList } = yield select(state => state.prepareCourse);

            if (payload === '2') {
                yield put({
                    type: UPDATE_STATE, payload: {
                        cachedCourseList: courseList.filter(v => v.isRelease === 0)
                    }
                })
            } else if (payload === '3') {
                yield put({
                    type: UPDATE_STATE, payload: {
                        cachedCourseList: courseList.filter(v => v.isRelease === 1)
                    }
                })
            } else {
                yield put({ type: UPDATE_STATE, payload: { cachedCourseList: courseList } })
            }
        },
        *deleteCourse({payload},{put,call}){
            yield call(deleteCourse,payload);
            message.success('删除成功!');
            yield put({type:'fetchList'})
        },
        // 获取备课列表
        *fetchList({ payload }, { put, call }) {
            yield put({type: UPDATE_STATE, payload: { loading: true }})
            const res = yield call(fetchPrepareCourseList, payload);
            yield put({type: UPDATE_STATE, payload:{ 
                courseList: res,
                cachedCourseList: res,
                loading: false
            }})
        }
    },
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }
}