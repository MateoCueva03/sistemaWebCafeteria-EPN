import {Module} from 'vuex';

import { IState } from "../index";
import { IPlatoState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";



export const moduloPlato:Module<IPlatoState,IState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}