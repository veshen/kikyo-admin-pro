//easy-mock模拟数据接口地址

// PRODUCTION
const HOST                         = 'https://kk.sa-green.cn/';


// test
// const SYSTEM                    = 'http://test.sa-green.cn:8080/'
// const HOST                      = 'https://kt.sa-green.cn/';

/*
    common
*/

//登陆
export const LOGIN = HOST + 'business/user/login';
//首页模块
export const GET_INDEX_MODEL = HOST + 'business/dashboard/load';
//首页大盘 豆腐块
export const INDEX_MODEL_LIST = HOST + 'business/dashboard/detail';
//首页大盘 销售额
export const INDEX_SALE_LIST = HOST + 'business/dashboard/saleList';
//首页大盘 订单数
export const INDEX_ORDER_LIST = HOST + 'business/dashboard/orderList';

// 订单
export const ORDER_LIST = HOST + 'business/order/list';
//订单查询导出1
export const ORDER_LIST_EXPORT = HOST + 'business/order/list/export';
//订单查询导出2
export const ORDER_INTERVAL_EXPORT = HOST + 'business/order/interval/export';

//查询反馈列表
export const QUERY_FEEDBACK_LIST = HOST + 'business/feedback/get'
//更新处理状态
export const UPDATE_EVENT_STATUS = HOST + 'business/feedback/updateStatus'
//删除
export const DELDTE_EVENT_STATUS = HOST + 'business/feedback/delete'
