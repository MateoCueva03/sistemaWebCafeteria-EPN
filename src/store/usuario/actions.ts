import axios, { AxiosError, AxiosResponse } from 'axios';

import router from '@/router';
import { ActionTree } from 'vuex';
import { IState } from '..';
import { IUsuarioState } from './state';
import {convetirABase64} from  '../../utils/convertirABase64'

const API = process.env.VUE_APP_API;

export const actions:ActionTree<IUsuarioState, IState> = {
  async registrar({dispatch}, usuario:any){
    try {
      await dispatch('moduloError/restablecerError',{},{root:true})
      usuario.foto = await convetirABase64(usuario.foto)
      await axios({
        method:'POST',
        url: `${API}/usuario/registro`,
        data: {
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          telefono: usuario.telefono,
          email: usuario.email,
          password: usuario.password,
          rol: usuario.rol,
          fotoBase64: usuario.foto
        }
      })
      .then((x:AxiosResponse) => {
        router.push('/login');   
      })
      .catch(async (x:AxiosError) => {
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log('EXEPCION');
      console.log(error);
    }
  },

  async iniciarSesion({commit,dispatch}, usuario){
    try {
      await dispatch('moduloError/restablecerError',{},{root:true})
      await axios({
        method:'POST',
        url: `${API}/usuario/login`,
        data:{
          email: usuario.email,
          password: usuario.password
        }
      })
      .then(async(x:AxiosResponse)=>{
        commit('setUsuario',x.data)
        localStorage.setItem('tokenEPN', x.data.token)
        await router.push('/dashboard')
      })
      .catch(async(x:AxiosError)=>{
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log(error);      
    }
  },

  cerrarSesion({commit}){
    commit('setUsuario', {});
    localStorage.removeItem('tokenEPN');
    router.push('/');
  },

  async verificarToken({commit}){
    try {
      const token = localStorage.getItem('tokenEPN');
      if (token) {
        await axios({
          method:'PUT',
          url: `${API}/usuario/verificar-token`,
          headers:{
            token
          }
        })
        .then((x:AxiosResponse)=>{
          commit('setUsuario',x.data)
        })
        .catch((x:AxiosError)=>{
          localStorage.removeItem('tokenEPN')
          router.push('/login')
        })
      }
    } catch (error) {
      console.log(error);      
    }
  },

  async actualizar({dispatch,rootGetters}, usuario:any){
    try {
      await dispatch('moduloError/restablecerError',{},{root:true})
      const token = rootGetters['moduloUsuario/token']
      if(usuario.fotoBase64){
        usuario.fotoBase64 = await convetirABase64(usuario.fotoBase64);
      }
      await axios({
        method:'PATCH',
        url: `${API}/usuario`,
        headers:{
          token
        },
        data: usuario
      })
      .then((x:AxiosResponse) => {
        console.log(x.data);        
      })
      .catch(async (x:AxiosError) => {
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log('EXEPCION');
      console.log(error);
    }
  },
}