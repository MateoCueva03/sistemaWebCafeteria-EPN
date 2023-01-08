import { convetirABase64 } from '@/utils/convertirABase64';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { ActionTree} from 'vuex';
import { IState } from '..';
import { IPedidoState } from './state';

const API = process.env.VUE_APP_API;

export const actions:ActionTree<IPedidoState, IState> = {
  addComponente({commit}, item){
    commit('addComponente', item);
  },

  addProducto({commit}, item){
    commit('addProducto', item);
  },

  delComponente({commit}, id){
    commit('delComponente', id)
  },

  delProducto({commit}, id){
    commit('delProducto', id)
  },

  async crearPedido({commit,dispatch,rootGetters}, pedido){
    try {
      const usuario = rootGetters['moduloUsuario/usuario']
      pedido.comprobante = await convetirABase64(pedido.comprobante)
      await axios({
        method:'POST',
        url: `${API}/pedido`,
        headers:{
          token: usuario.token
        },
        data:{
          total: pedido.total,
          componentes: pedido.componentes,
          productos: pedido.productos,
          base64Comprobante: pedido.comprobante,
          _cliente: usuario._id
        }
      })
      .then((x:AxiosResponse) =>{
        console.log(x.data);     
        commit('setCarrito',{
          componentes: [],
          productos: []
        });      
      })
      .catch(async(x:AxiosError)=>{
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log(error);      
    }
  },
  
  async cargarPedidos({commit,dispatch,rootGetters}){
    try {
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'GET',
        url: `${API}/pedido`,
        headers:{
          token
        },
      })
      .then((x:AxiosResponse) =>{
        commit('setPedidos',x.data);        
      })
      .catch(async(x:AxiosError)=>{
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log(error);      
    }
  },

  async actualizarEstado({dispatch, rootGetters}, pedido){
    try {
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'PATCH',
        url: `${API}/pedido`,
        headers:{
          token
        },
        data: {
          id: pedido.id,
          estado: pedido.estado,
          cocinero: pedido.cocinero
        }
      })
      .then((x:AxiosResponse) =>{
          console.log(x.data);          
      })
      .catch(async(x:AxiosError)=>{
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log(error);      
    }
  }
}