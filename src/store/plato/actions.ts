import { convetirABase64 } from '@/utils/convertirABase64';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { ActionTree} from 'vuex';
import { IState } from '..';
import { IPlatoState } from './state';

const API = process.env.VUE_APP_API;

export const actions:ActionTree<IPlatoState, IState> = {
  async cargarPlatos({commit,dispatch,rootGetters}){
    try {
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'GET',
        url: `${API}/componente`,
        headers:{
          token
        },
      })
      .then((x:AxiosResponse) =>{
        commit('setPlatos',x.data);        
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

  async crearPlato({commit, dispatch, rootGetters}, plato){
    try {
      await dispatch('moduloError/restablecerError',{},{root:true})
      const token = rootGetters['moduloUsuario/token']
      console.log(plato);
      plato.foto = await convetirABase64(plato.foto);
      
      await axios({
        method:'POST',
        url: `${API}/componente`,
        headers:{
          token
        },
        data:{
          nombre: plato.nombre,
          descripcion: plato.descripcion,
          precio: plato.precio,
          medida: plato.medida,
          tipo: plato.tipo,
          base64Foto: plato.foto
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
  async eliminarPlato({commit,dispatch,rootGetters}, id){
    try {
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'DELETE',
        url: `${API}/componente/${id}`,
        headers:{
          token
        },
      })
      .then((x:AxiosResponse) =>{
        commit('eliminarPlato',x.data.id);        
      })
      .catch(async(x:AxiosError)=>{
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log(error);      
    }
  },
  async actualizarPlato({commit, dispatch, rootGetters}, plato){
    try {
      await dispatch('moduloError/restablecerError',{},{root:true})
      const token = rootGetters['moduloUsuario/token']
      console.log(plato);
      plato.foto = await convetirABase64(plato.foto);
      
      await axios({
        method:'PATCH',
        url: `${API}/componente/${plato.id}`,
        headers:{
          token
        },
        data:{
          nombre: plato.nombre,
          descripcion: plato.descripcion,
          precio: plato.precio,
          medida: plato.medida,
          tipo: plato.tipo
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
  setEditar({commit}, estado){
    commit('setEditar',estado);
  },
  setPlatoActual({commit}, plato){
    commit('setPlatoActual', plato);
  }
}