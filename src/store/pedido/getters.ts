import { GetterTree } from 'vuex';
import { IState } from '..';
import { IPedidoState } from './state';

export const getters: GetterTree<IPedidoState, IState> = {
  carrito(state){
    return state.carrito
  },

  pedidos(state){
    return state.pedidos;
  },

  pedidosVerificados(state){
    return state.pedidos.filter(x => x.estado[x.estado.length - 1] == 'verificado')
  },
  pedidosCompletados(state){
    return state.pedidos.filter(x => x.estado[x.estado.length - 1] == 'completado')
  },
  pedidosPendientes(state){
    return state.pedidos.filter(x => x.estado[x.estado.length - 1] == 'pendiente')
  },

}