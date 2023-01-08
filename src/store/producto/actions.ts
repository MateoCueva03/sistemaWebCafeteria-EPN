import { convetirABase64 } from '@/utils/convertirABase64';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { ActionTree} from 'vuex';
import { IState } from '..';
import { IProductoState } from './state';

const API = process.env.VUE_APP_API;

export const actions:ActionTree<IProductoState, IState> = {
  async cargarProductos({commit,dispatch,rootGetters}){
    try {
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'GET',
        url: `${API}/producto`,
        headers:{
          token
        },
      })
      .then((x:AxiosResponse) =>{
        commit('setProductos',x.data);        
      })
      .catch(async(x:AxiosError)=>{
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log(error);      
    }
  },

  cambiarEstadoMostrarFormulario({commit}, estado:boolean){
    commit('setMostrarFormulario', estado);
  },

  async crearProducto({commit, dispatch, rootGetters}, producto){
    try {
      await dispatch('moduloError/restablecerError',{},{root:true})
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'POST',
        url: `${API}/producto`,
        headers:{
          token
        },
        data:{
          nombre: producto.nombre,
          precio: producto.precio,
          stock: producto.stock
        }
      })
      .then((x:AxiosResponse)=>{
        commit('agregarProducto',x.data);  
      })
      .catch(async(x:AxiosError)=>{
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      });
    } catch (error) {
      console.log(error);     
    }
  },

  async eliminarProducto({commit,dispatch,rootGetters}, id){
    try {
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'DELETE',
        url: `${API}/producto/${id}`,
        headers:{
          token
        },
      })
      .then((x:AxiosResponse) =>{
        commit('eliminarProducto',x.data.id);        
      })
      .catch(async(x:AxiosError)=>{
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log(error);      
    }
  },

  async actualizarProducto({commit, dispatch, rootGetters}, producto){
    try {
      await dispatch('moduloError/restablecerError',{},{root:true})
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'PATCH',
        url: `${API}/producto/${producto._id}`,
        headers:{
          token
        },
        data:{
          nombre: producto.nombre,
          precio: producto.precio,
          stock: producto.stock
        }
      })
      .then((x:AxiosResponse)=>{
        console.log(x.data);        
      })
      .catch(async(x:AxiosError)=>{
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      });
    } catch (error) {
      console.log(error);     
    }
  },

  cambiarEstadoEditar({commit}, estado){
    commit('setEditar', estado);
  },

  setProductoActual({commit}, producto){
    commit('setProductoActual', producto);
  }
}