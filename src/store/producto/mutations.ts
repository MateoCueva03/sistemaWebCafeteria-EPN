import { set } from 'vue/types/umd';
import { MutationTree } from 'vuex';
import { IProductoState } from './state';

export const mutations: MutationTree<IProductoState>={
  setProductos(state, payload){
    state.productos = payload
  },
  setMostrarFormulario(state, payload){
    state.mostrarFormulario = payload;
  },
  agregarProducto(state, payload){
    state.productos.push(payload);
  },
  eliminarProducto(state, payload){
    state.productos = state.productos.filter(x => x.id !== payload)
  },
  setEditar(state, payload){
    state.editar = payload;
  },
  setProductoActual(state, payload){
    state.productoActual = payload;
  }
}