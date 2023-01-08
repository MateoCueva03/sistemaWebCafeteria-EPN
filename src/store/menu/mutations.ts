import { MutationTree } from 'vuex';
import { IMenuState } from './state';

export const mutations: MutationTree<IMenuState>={
  setMenus(state, payload){
    state.menus = payload
  },
  setMostrarFormulario(state, payload){
    state.mostrarFormulario = payload;
  },
  eliminarMenu(state, payload){
    state.menus = state.menus.filter(x => x.id !== payload)
  }
}