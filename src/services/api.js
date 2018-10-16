import { stringify } from 'qs';
import request from '@/utils/request';
import { postExport } from './tools'
// import * as http from './../axios/index';

/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => () => {
    // !stateName && (stateName = funcName);
    return http[funcName](params).then(res => res);
};



function markUrl(link,data){
    if (typeof data != "undefined" && data != "") {
        var paramArr = [];
        for (var attr in  data) {
            paramArr.push(attr + '=' +  data[attr]);
        }
        link += '?' + paramArr.join('&');
    }
    return link;
}

//-------------------->
//查询订单接口
export async function queryOrderList(params) {
  return request('https://kk.sa-green.cn/business/order/list', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
//首页大盘 豆腐块
export async function getIndexDetailList() {
  return request('https://kk.sa-green.cn/business/dashboard/detail');
}
//首页大盘 豆腐块
export async function getIndexSaleList() {
  return request('https://kk.sa-green.cn/business/dashboard/saleList');
}
//首页大盘 豆腐块
export async function getIndexOrderList() {
  return request('https://kk.sa-green.cn/business/dashboard/orderList');
}

export async function exportOrderQueryList(params) {
  return postExport({url:'https://kk.sa-green.cn/business/order/list/export',data:params});
}
export async function exportOrderQueryInterval(params) {
  return postExport({url:'https://kk.sa-green.cn/business/order/interval/export',data:params});
}

export async function fakeAccountLogin(params) {
    return request('https://kk.sa-green.cn/business/user/login', {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}



export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
