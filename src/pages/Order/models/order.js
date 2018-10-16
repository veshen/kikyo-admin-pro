import { fakeChartData, queryOrderList, exportOrderQueryList, exportOrderQueryInterval } from '@/services/api';

export default {
  namespace: 'order',
  state: {
    queryStatusList:[{
              label:"全部",
              value:0,
          },
          {
              label:"待支付",
              value:1,
          },
          {
              label:"已支付",
              value:2,
          },
          {
              label:"到店",
              value:3,
          },
          {
              label:"离店",
              value:4,
          },
          {
              label:"用户取消",
              value:5,
          },
          {
              label:"超时取消",
              value:6,
          },
          {
              label:"系统取消",
              value:7,
          },
          {
              label:"预约成功到店支付",
              value:8,
          }
      ],
    orderList : [],
    total : 0
  },

  effects: {
    *queryOrderList(action, { call, put }) {
      const response = yield call(queryOrderList,action.data);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *exportOrderQueryList(action, { call, put }) {
      const response = yield call(exportOrderQueryList,action.data);
    },
    *exportOrderQueryInterval(action, { call, put }) {
      const response = yield call(exportOrderQueryInterval,action.data);
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
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};
