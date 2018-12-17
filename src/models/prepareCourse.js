const UPDATE_STATE = 'updateState';

export default {
    namespace: 'prepareCourse',
    state: {
        courseList: [],
        cachedCourseList: []
    },
    effects: {
        *tabChange({ payload }, { put, select }) {
            const { courseList, cachedCourseList } = yield select(state => state.prepareCourse);

            if (payload === '2') {
                yield put({
                    type: UPDATE_STATE, payload: {
                        courseList: courseList.filter(v => v.isRelease === 0)
                    }
                })
            } else if (payload === '3') {
                yield put({
                    type: UPDATE_STATE, payload: {
                        courseList: courseList.filter(v => v.isRelease === 1)
                    }
                })
            } else {
                yield put({ type: UPDATE_STATE, payload: { courseList: cachedCourseList } })
            }
        }
    },
    reducers: {
        updateState(state, payload) {
            return {
                ...state,
                ...payload
            }
        }
    }
}