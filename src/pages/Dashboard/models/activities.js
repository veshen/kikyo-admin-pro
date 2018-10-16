import { queryActivities, getIndexDetailList, getIndexSaleList, getIndexOrderList } from '@/services/api';

export default {
  namespace: 'activities',

  state: {
    list: [],
    dashBoard : [],
    day : '',
    saleListDate : [],
    saleListTurnover : [],
    orderListDate : [],
    orderListTurnover : []
  },

  effects: {
    *fetchIndexDetailList(_, { call, put }) {
      const response = yield call(getIndexDetailList);
      console.log(123,response);
      yield put({
        type: 'saveList',
        payload: response.data,
      });
    },
    *getIndexSaleList(_, { call, put }) {
      const response = yield call(getIndexSaleList);
      const saleListDate = response.data.date;
      const saleListTurnover = response.data.turnover;
      yield put({
        type: 'saveList',
        payload: {saleListDate,saleListTurnover},
      });
    },
    *getIndexOrderList(_, { call, put }) {
      const response = yield call(getIndexOrderList);
      const orderListDate = response.data.date;
      const orderListTurnover = response.data.turnover;
      yield put({
        type: 'saveList',
        payload: {orderListDate,orderListTurnover},
      });
    },
  },

  reducers: {
    saveList(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
