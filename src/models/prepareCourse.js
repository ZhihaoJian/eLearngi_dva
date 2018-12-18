import { fetchPrepareCourseList, addCourse, deleteCourse } from "../services/preparecourse";
import { message } from 'antd';
import { routerRedux } from "dva/router";

const UPDATE_STATE = 'updateState';

export default {
    namespace: 'prepareCourse',
    state: {
        loading: false,
        courseList: [],
        cachedCourseList: [],
        fileList: [],
        confirmLoading: false
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
        *deleteCourse({ payload }, { put, call }) {
            yield call(deleteCourse, payload);
            message.success('删除成功!');
            yield put({ type: 'fetchList' })
        },
        // 获取备课列表
        *fetchList({ payload }, { put, call }) {
            yield put({ type: UPDATE_STATE, payload: { loading: true } })
            const res = yield call(fetchPrepareCourseList, payload);
            yield put({
                type: UPDATE_STATE, payload: {
                    courseList: res,
                    cachedCourseList: res,
                    loading: false
                }
            })
        },
        *addCourse({ payload }, { put, call, select }) {
            yield put({ type: UPDATE_STATE, payload: { confirmLoading: true } });
            const { data } = payload;
            const { fileList } = yield select(state => state.prepareCourse);
            const formData = new FormData();
            Object.keys(data).forEach(item => {
                if (item === 'coverURL') {
                    /* eslint-disabled */
                    fileList.length ? formData.append('coverURL', fileList[0]) : null;
                } else {
                    formData.append([item], data[item]);
                }
            })
            const res = yield call(addCourse, formData);
            if (res) {
                message.success('正在为您准备备课区, 请耐心等待!');
                yield put({ type: UPDATE_STATE, payload: { confirmLoading: false, fileList: [] } });
                yield put(routerRedux.push(`/prepare-course/edit?key=${res.id}&type=add`))
            }
        },
        *beforeUploadFile({ payload }, { put, select }) {
            const { file } = payload;
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                message.error('只能上传jpg或png格式的图片!');
            } else {
                yield put({
                    type: UPDATE_STATE, payload: {
                        fileList: [file]
                    }
                })
            }
        },
        *removeFile({ payload }, { put, select }) {
            const { file } = payload;
            const { fileList } = yield select(state => state.prepareCourse);
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice().splice(index, 1);
            yield put({ type: UPDATE_STATE, payload: { fileList: newFileList } })
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