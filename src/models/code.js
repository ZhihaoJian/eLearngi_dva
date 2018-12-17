import { STATUS_CODES, STATUS_TITLE } from '../routes/CodeDetect/_var';
import { fetchProcessQueryStatus, detectCode } from '../services/code';
import { delay } from 'dva/saga';

const UPDATE_DETECTIVE_STATUS = 'updateDetectiveStatus';
const {
    PENDING,
    SUCCESS,
    DEFAULT,
    PROGRESS,
    ERROR
} = STATUS_CODES;
const {
    PENDING_TITLE,
    PROGRESS_TITLE,
    ERROR_TITLE
} = STATUS_TITLE;
export default {
    namespace: 'code',
    state: {
        status: DEFAULT, //检测状态
        title: PENDING_TITLE,
        stepsStatus: '', //步骤条状态 error
        current: 0,  //检测步骤
        fileList: []    //上传文件
    },
    effects: {
        /**
         * 条件渲染step的检测title
         */
        *renderProcessStepTitle({ status }, { put }) {
            if (status === PENDING || status === DEFAULT) {
                yield put({ type: UPDATE_DETECTIVE_STATUS, payload: PENDING_TITLE });
            } else if (status === PROGRESS || status === SUCCESS) {
                yield put({ type: UPDATE_DETECTIVE_STATUS, payload: PROGRESS_TITLE })
            } else if (status === ERROR) {
                yield put({ type: UPDATE_DETECTIVE_STATUS, payload: ERROR_TITLE })
            }
        },
        *stepsShowError(_, { put }) {
            yield put({ type: 'stepError' })
        },
        //轮询查询检测情况
        *fetchProcessQueryStatus({ payload }, { put, call, select }) {
            try {
                //如果不存在URL在steps报错
                if (!payload) throw new Error();

                const res = yield call(fetchProcessQueryStatus, payload);
                const { state } = res;
                yield put({ type: 'renderProcessStepTitle', status: state });
                const title = yield select(state => state.code.title);

                if (state !== SUCCESS) {
                    yield call(delay, 2000);
                    yield put({
                        type: 'updateState',
                        payload: { data: res, title, status: state }
                    });
                    yield put({ type: 'fetchProcessQueryStatus', payload })
                } else {
                    const current = yield select(state => state.code.current);
                    yield put({
                        type: 'updateState', payload: {
                            data: res,
                            current: current + 1,
                            status: state,
                            title
                        }
                    })
                }
            } catch (error) {
                yield put({ type: 'stepError' })
            }
        },
        *addFileToList({ payload }, { put, select }) {
            const fileList = yield select(state => state.code.fileList);
            const newFileList = [...fileList, payload];
            yield put({
                type: 'updateState', payload: {
                    fileList: newFileList
                }
            })
        },
        *removeFileFromList({ payload }, { put, call, select }) {
            const fileList = yield select(state => state.code.fileList);
            const index = fileList.indexOf(payload);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            yield put({
                type: 'updateState', payload: {
                    fileList: newFileList
                }
            })
        },
        *uploadFile({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload: {
                    current: 0,
                    status: '',
                    stepsStatus: '',
                    data: null,
                    title: PENDING_TITLE
                }
            });
            //根据查重的规则，发送请求
            const { fileList, current } = yield select(state => state.code);
            const formData = new FormData();
            fileList.forEach((file) => {
                formData.append('files[]', file);
            });
            formData.append('level', payload.level);

            const url = yield call(detectCode, formData);
            yield put({ type: 'fetchProcessQueryStatus', payload: { url } });
            yield put({
                type: 'updateState', payload: {
                    current: current + 1,
                    status: PENDING
                }
            })
        }
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        },
        updateDetectiveStatus(state, { payload }) {
            return { ...state, status: payload }
        },
        stepError(state) {
            return {
                ...state,
                stepsStatus: 'error',
                status: ERROR,
                title: ERROR_TITLE
            }
        },
    }
}