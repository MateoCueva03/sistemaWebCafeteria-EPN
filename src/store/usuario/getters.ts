import { GetterTree } from 'vuex';
import { IState } from '..';
import { IUsuarioState } from './state';

export const getters: GetterTree<IUsuarioState, IState> = {
  token(state){
    return state.usuario.token;
  },
  usuario(state){
    return state.usuario
  }
}