import {Module} from 'vuex';

import { IState } from "../index";
import { IColaboradorState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";



export const moduloColaborador:Module<IColaboradorState,IState> = {
  namespaced  : true,
  state,
  mutations,
  actions,
  getters
}