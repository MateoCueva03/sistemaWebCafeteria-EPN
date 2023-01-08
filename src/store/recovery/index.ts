import {Module} from 'vuex';

import { IState } from "../index";
import { IRecoveryState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";



export const moduloRecovery:Module<IRecoveryState,IState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}