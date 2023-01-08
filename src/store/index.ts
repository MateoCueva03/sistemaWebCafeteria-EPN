import Vue from "vue";
import Vuex from "vuex";
import { moduloError } from "./error";
import { IErrorState } from "./error/state";

import {moduloUsuario} from './usuario';
import { IUsuarioState } from "./usuario/state";
import {moduloColaborador} from './colaborador'
import {IColaboradorState} from './colaborador/state'
import { IProductoState } from "./producto/state";
import {moduloProducto} from './producto'
import { IPlatoState } from "./plato/state";
import {moduloPlato} from  './plato/index'
import { IMenuState } from "./menu/state";
import {moduloMenu} from './menu';
import { IPedidoState } from "./pedido/state";
import {moduloPedido} from './pedido/index'
import { IRecoveryState } from "./recovery/state";
import { moduloRecovery } from "./recovery";

Vue.use(Vuex);

export interface IState{
  moduloUsuario: IUsuarioState,
  moduloError: IErrorState,
  moduloColaborador: IColaboradorState,
  moduloProducto: IProductoState,
  moduloPlato: IPlatoState,
  moduloMenu: IMenuState,
  moduloPedido: IPedidoState
  moduloRecovery: IRecoveryState
}

export default new Vuex.Store<IState>({
  modules: {
    moduloUsuario,
    moduloError,
    moduloColaborador,
    moduloProducto,
    moduloPlato,
    moduloMenu,
    moduloPedido,
    moduloRecovery
  },
});
