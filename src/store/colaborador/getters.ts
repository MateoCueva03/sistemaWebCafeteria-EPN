import { GetterTree } from 'vuex';
import { IState } from '..';
import { IColaboradorState } from './state';

export const getters: GetterTree<IColaboradorState, IState> = {
  colaboradores(state){
    return state.colaboradores
  },

  mostrarFormulario(state){
    return state.mostrarFormulario;
  },

  cocineros(state){
    return state.cocineros;
  }
}