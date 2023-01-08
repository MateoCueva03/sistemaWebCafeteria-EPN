import {Module} from 'vuex';

import { IState } from "../index";
import { IMenuState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";



export const moduloMenu:Module<IMenuState,IState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}