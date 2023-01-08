import { MutationTree } from 'vuex';
import { IColaboradorState } from './state';

export const mutations: MutationTree<IColaboradorState>={
  setColaboradores(state, payload){
    state.colaboradores = payload
  },
  setMostrarFormulario(state, payload){
    state.mostrarFormulario = payload;
  },
  agregarColaborador(state, payload){
    state.colaboradores.push(payload);
  },
  setCocineros(state, payload){
    state.cocineros = payload;
  }
}