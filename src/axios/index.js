import axios from 'axios';
import { get, post, postExport } from './tools';
import * as config from './config';

axios.defaults.withCredentials = true;
/*
    common
*/
export const getIndexModel = () => get({url:config.GET_INDEX_MODEL});   //首页模块
export const login = (data) => post({url:config.LOGIN,data});    //登陆

export const getIndexDetailList = () => get({url:config.INDEX_MODEL_LIST});   //首页大盘 豆腐块
export const getIndexSaleList = () => get({url:config.INDEX_SALE_LIST});   //首页大盘 销售额
export const getIndexOrderList = () => get({url:config.INDEX_ORDER_LIST});   //首页大盘 订单数

export const getOrderList = (data) => post({url: config.ORDER_LIST,data});//订单查询
export const getFeedbackList = (data) => post({url: config.QUERY_FEEDBACK_LIST,data});//查询反馈列表
export const updateEventStatus = (data) => post({url: config.UPDATE_EVENT_STATUS,data});//查询反馈列表
export const deldteEventStatus = (data) => post({url: config.DELDTE_EVENT_STATUS,data});//删除反馈列表

export const exportOrderQueryList = (data) => postExport({
    url: config.ORDER_LIST_EXPORT,
    data
}); //订单查询查询导出

export const exportOrderQueryInterval = (data) => postExport({
    url: config.ORDER_INTERVAL_EXPORT,
    data
}); //订单查询查询导出
