import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/LoginView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('../views/Registro/RegistroView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: ()=> import('@/views/Dashboard/DashboardView.vue'),
    meta:{
      rutaProtegida: true
    }
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: ()=> import('@/views/Usuario/UsuarioView.vue'),
    meta:{
      rutaProtegida: true
    }
  },
  {
    path: '/colaborador',
    name: 'colaborador',
    component: ()=> import('@/views/Colaborador/ColaboradorView.vue'),
    meta:{
      rutaProtegida: true
    }
  },
  {
    path: '/producto',
    name: 'producto',
    component: ()=> import('@/views/Producto/ProductoView.vue'),
    meta:{
      rutaProtegida: true
    }
  },
  {
    path: '/plato',
    name: 'plato',
    component: ()=> import('@/views/Plato/PlatoView.vue'),
    meta:{
      rutaProtegida: true
    }
  },
  {
    path: '/menu',
    name: 'menu',
    component: ()=> import('@/views/Menu/MenuView.vue'),
    meta:{
      rutaProtegida: true
    }
  },
  {
    path: '/comidas',
    name: 'comidas',
    component: ()=> import('@/views/Comidas/ComidasView.vue'),
    meta:{
      rutaProtegida: true
    }
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: ()=> import('@/views/Carrito/CarritoView.vue'),
    meta:{
      rutaProtegida: true
    }
  },
  {
    path: '/pedido',
    name: 'pedido',
    component: ()=> import('@/views/Pedido/PedidoView.vue'),
    meta:{
      rutaProtegida: true
    }
  },
  {
    path: '/recuperar-password',
    name: 'recuperar-password',
    component: ()=> import('@/views/RecuperarPassword/RecuperarPasswordView.vue'),
  },
  {
    path: '/reporte',
    name: 'Reporte',
    component: ()=> import('@/views/Reporte/ReporteView.vue'),
    meta:{
      rutaProtegida: true
    }
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next)=>{
  if ((to?.meta?.rutaProtegida && !localStorage.getItem('tokenEPN'))) {
    console.log('No hay token y la ruta es protegida');
    
    next('/login')
    return;
  }
  else if (!to?.meta?.rutaProtegida && localStorage.getItem('tokenEPN')) {
    next('/dashboard')
    return;
  }
  next()
})

export default router;
