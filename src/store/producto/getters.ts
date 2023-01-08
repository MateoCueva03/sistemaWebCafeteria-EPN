import { GetterTree } from 'vuex';
import { IState } from '..';
import { IProductoState } from './state';

export const getters: GetterTree<IProductoState, IState> = {
  productos(state){
    return state.productos
  },

  mostrarFormulario(state){
    return state.mostrarFormulario;
  },

  editar(state){
    return state.editar;
  },

  productoActual(state){
    return state.productoActual;
  },

  productosConStock(state){
    return state.productos.filter(x => x.stock > 0);
  },
}