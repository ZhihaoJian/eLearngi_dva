import { fetchProvinceList } from "../services/global";

export default {
    namespace: 'global',
    state: {
        province: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            dispatch({ type: 'fetchProvinceList' })
        }
    },
    effects: {
        *fetchProvinceList(_, { put, call, select }) {
            const province = yield select(state => state.global.province);
            if (province.length) return;
            const res = yield call(fetchProvinceList);
            if (res) {
                yield put({ type: 'updateProvinceList', payload: res.content })
            }
        }
    },
    reducers: {
        updateProvinceList(state, { payload }) {
            return { ...state, province: payload }
        }
    }
}