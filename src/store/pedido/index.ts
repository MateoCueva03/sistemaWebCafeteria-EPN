import {Module} from 'vuex';

import { IState } from "../index";
import { IPedidoState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";



export const moduloPedido:Module<IPedidoState,IState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}