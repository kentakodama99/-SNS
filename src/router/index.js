import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Profile from "../views/Profile.vue";
import Detail from "../views/Detail.vue";
import store from "../store/index";


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true, //コンポーネントの表示には認証が必要と定義する
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: Detail,
    meta: {
      requiresAuth: true, //コンポーネントの表示には認証が必要と定義する
    },
    props: true,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true, //コンポーネントの表示には認証が必要と定義する
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.state.auth
  ) {
    // 認証してないので"/"へ
    next({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
     // 認証状態はそのまま遷移
  } else {
    next();
  }
});

export default router;
