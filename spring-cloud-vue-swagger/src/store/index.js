import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex);
Vue.use(VueResource);

/* 下拉框数据 */
const dropDown={
  state:{data:[],count:0},
  mutations:{
    switch(state,n){
      dropDown.state.count=n;
      init();
    }
  }
}
/* 下拉框下方的接口数据 */
const  leftDropDownBoxContent={
  state:{data:[]}
}
/* 初始化:获取单选框数据， */
function init() {
  Vue.http.get('http://localhost:8803/cloud-swagger-resources').then((response)=>{
    dropDown.state.data=response.body;
    return true;
  },(response)=>{
    dropDown.state.data="请求失败:"+response;
    return false;
  }).then((a)=> {
    if(a&&dropDown.state.data[dropDown.state.count]&&dropDown.state.data[dropDown.state.count].swaggerResources&&dropDown.state.data[dropDown.state.count].swaggerResources[0]&&dropDown.state.data[dropDown.state.count].swaggerResources[0].location){
      /* dropDown.state.data[0]控制当前是第几个接口 */
      // bycdaoLeftContent.state.data=dropDown.state.data[0].swaggerResources[0]
      Vue.http.get(dropDown.state.data[dropDown.state.count].swaggerResources[0].location).then((response)=>{
        leftDropDownBoxContent.state.data=response.body;
        return true;
      },(response)=>{
        leftDropDownBoxContent.state.data="请求失败:"+response;
        return false;
      })
    }
  })
}
init();
/* 调试模块 */
const debugRequest={
  state:{data:[],count:0,debugResponse:{}},
  mutations:{
    send(state,n){
      Vue.http.get(n.url,n.data,{method:n.type,headers:n.headerParams})
        .then(function (response){
          debugRequest.state.debugResponse=response;
        },function (response){
          debugRequest.state.debugResponse=response;
        })
    }
  }
}

export default new Vuex.Store({
  modules:{
    bycdaoLeftHead:dropDown,
    leftDropDownBoxContent:leftDropDownBoxContent,
    debugRequest:debugRequest
  }
})







