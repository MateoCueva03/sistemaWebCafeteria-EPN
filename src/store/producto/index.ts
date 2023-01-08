import {Module} from 'vuex';

import { IState } from "../index";
import { IProductoState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";



export const moduloProducto:Module<IProductoState,IState> = {
  namespaced  : true,
  state,
  mutations,
  actions,
  getters
}