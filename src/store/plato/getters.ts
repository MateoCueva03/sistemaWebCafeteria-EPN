import { GetterTree } from 'vuex';
import { IState } from '..';
import { IPlatoState } from './state';

export const getters: GetterTree<IPlatoState, IState> = {
  platos(state){
    return state.platos
  },

  mostrarFormulario(state){
    return state.mostrarFormulario;
  },

  editar(state){
    return state.editar;
  },

  platoActual(state){
    return state.platoActual;
  }
}