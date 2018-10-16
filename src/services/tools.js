/**
 * 公用文件导出form请求
 * @param url       接口地址
 * @param data      接口参数
 */

export const postExport = ({url, data}) =>{
    return new Promise((resolve,reject)=>{
        window.open(markUrl(url,data));
        return;
        const iframe = document.createElement("iframe");
        iframe.setAttribute('id','iframe_display');
        iframe.setAttribute('name','iframe_display');
        iframe.setAttribute('style','display:none');
        document.querySelector('.container').appendChild(iframe);
        const form = document.createElement("form");
        form.setAttribute('id','form1123');
        form.setAttribute('target','iframe_display');
        form.setAttribute('method','post');
        form.setAttribute('action',markUrl(url,data));
        document.querySelector('.container').appendChild(form);
        form.submit();
        form.remove();
        const parent = document.querySelector('.container');
        const iframe1 = document.getElementById("iframe_display");
        setTimeout(()=>{
            resolve({code:200})
            removeElement(iframe1)
        },300000)
    })

}
function removeElement(_element){
    var _parentElement = _element.parentNode;
    if(_parentElement){
        _parentElement.removeChild(_element);
    }
}
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
