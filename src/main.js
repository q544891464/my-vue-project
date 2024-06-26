import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import JSBridge from './utils/js-bridge';

// 定义一个异步函数来获取并存储登录信息
async function initApp() {
  const loginUserInfo = await JSBridge.getLoginUserInfo();
  localStorage.setItem('loginUserInfo', JSON.stringify(loginUserInfo));
  store.dispatch('user/setUserInfo', loginUserInfo);

  const app = createApp(App);
  app.use(router);
  app.use(store);
  app.use(ElementPlus);
  app.mount('#app');
}

// 在应用程序启动时调用异步函数
initApp();
