import { MutationTree } from 'vuex';
import { IPedidoState } from './state';

export const mutations: MutationTree<IPedidoState>={
  addComponente(state, payload){
    state.carrito.componentes.push(payload)
  },

  addProducto(state, payload){
    state.carrito.productos.push(payload)
  },

  delComponente(state, payload){
    state.carrito.componentes = state.carrito.componentes.filter(x => x.componente._id != payload);
  },

  delProducto(state, payload){
    state.carrito.productos = state.carrito.productos.filter(x => x.producto._id != payload);
  },

  setPedidos(state, payload){
    state.pedidos = payload;
  },

  setCarrito(state, payload){
    state.carrito = payload;
  }
}