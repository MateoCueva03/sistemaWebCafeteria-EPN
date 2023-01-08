import router from '@/router';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { ActionTree} from 'vuex';
import { IState } from '..';
import { IMenuState } from './state';

const API = process.env.VUE_APP_API;

export const actions:ActionTree<IMenuState, IState> = {
  async cargarMenus({commit,dispatch,rootGetters}){
    try {
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'GET',
        url: `${API}/menu`,
        headers:{
          token
        },
      })
      .then((x:AxiosResponse) =>{
        commit('setMenus',x.data);        
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

  async crearMenu({dispatch, rootGetters}, menu){
    try {
      await dispatch('moduloError/restablecerError',{},{root:true})
      const token = rootGetters['moduloUsuario/token']
      console.log(menu);
      
      await axios({
        method:'POST',
        url: `${API}/menu`,
        headers:{
          token
        },
        data:{
          titulo: menu.titulo,
          fecha: menu.fecha,
          componentes: menu.componentes
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
  async eliminarMenu({commit,dispatch,rootGetters}, id){
    try {
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'DELETE',
        url: `${API}/menu/${id}`,
        headers:{
          token
        },
      })
      .then((x:AxiosResponse) =>{
        commit('eliminarMenu',x.data.id);        
      })
      .catch(async(x:AxiosError)=>{
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log(error);      
    }
  },

  async actualizarEstado({commit,dispatch,rootGetters}, menu){
    try {
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'PATCH',
        url: `${API}/menu`,
        headers:{
          token
        },
        data:{
          id: menu._id,
          _componente: menu._componente
        }
      })
      .then(async(x:AxiosResponse) =>{
        await router.push('/dashboard');
        await router.push('/menu');
      })
      .catch(async(x:AxiosError)=>{
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log(error);      
    }
  },
}