// 控制页面登录权限

// 权限拦截在路由跳转 导航守卫
import router from "@/router";
import store from "./store"; // 引入store 实例
import nprogress from "nprogress"; // 引入进度条
import "nprogress/nprogress.css"; // 引入进度条样式

// 定义路由白名单 不受token控制
const whiteList = ["/login", "/404"];

// 前置守卫
/* 
  next 是前置守卫必须执行的钩子 next必须执行 如果不执行，页面就死了
  next() 放过
  next(false) 跳转终止
  next(地址) 跳转到某个地址
*/
router.beforeEach((to, from, next) => {
  // 开启进度条
  nprogress.start();

  // 有token
  if (store.getters.token) {
    // 假如有token ，还去登录页的话，就跳转到首页
    if (to.path == "/login") {
      next("/");
    } else {
      next(); // 如果有token ，没有去登录页的话，就放行
    }
  } else {
    // 没有token的情况下， 如果路径在路由白名单，就放行
    if (whiteList.includes(to.path)) {
      next();
    } else {
      // 没有token的情况下， 如果路径不在路由白名单，就跳转到登录页面
      next("/login");
    }
  }
  nprogress.done(); // 手动关闭进度条 解决手动切换地址时，进度条不关闭的问题
});

// 后置守卫;
router.afterEach((to, from) => {
  // 关闭进度条
  nprogress.done();
});
