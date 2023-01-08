import { MutationTree } from 'vuex';
import { IPlatoState } from './state';

export const mutations: MutationTree<IPlatoState>={
  setPlatos(state, payload){
    state.platos = payload
  },
  setMostrarFormulario(state, payload){
    state.mostrarFormulario = payload;
  },
  agregarPlato(state, payload){
    state.platos.push(payload);
  },
  eliminarPlato(state, payload){
    state.platos = state.platos.filter(x => x.id !== payload)
  },
  setEditar(state, payload){
    state.editar = payload;
  },
  setPlatoActual(state, payload){
    state.platoActual = payload;
  }
}