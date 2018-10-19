import { queryFeedbackList, updateEventStatus , deldteEventStatus } from '@/services/api';

export default {
  namespace: 'feedback',
  state: {
      total : 0,
      feedBackList : []
  },

  effects: {
    *getFeedbackList(action, { call, put }) {
      const response = yield call(queryFeedbackList,action.data);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *updateEventStatus(action, { call, put }) {
      const response = yield call(updateEventStatus,action.data);
    },
    *deldteEventStatus(action, { call, put }) {
      const response = yield call(deldteEventStatus,action.data);
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
          total : 0,
          feedBackList : []
      };
    },
  },
};
