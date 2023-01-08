import { convetirABase64 } from '@/utils/convertirABase64';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { ActionTree} from 'vuex';
import { IState } from '..';
import { IColaboradorState } from './state';

const API = process.env.VUE_APP_API;

export const actions:ActionTree<IColaboradorState, IState> = {
  async cargarColaboradores({commit,dispatch,rootGetters}){
    try {
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'GET',
        url: `${API}/usuario/colaboradores`,
        headers:{
          token
        },
      })
      .then((x:AxiosResponse) =>{
        commit('setColaboradores',x.data);        
      })
      .catch(async(x:AxiosError)=>{
        console.log(x.response?.data);
        
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log(error);      
    }
  },

  cambiarEstadoMostrarFormulario({commit}, estado:boolean){
    commit('setMostrarFormulario', estado);
  },

  async crearColaborador({commit, dispatch, rootGetters}, colaborador){
    try {
      await dispatch('moduloError/restablecerError',{},{root:true})
      const token = rootGetters['moduloUsuario/token']
      colaborador.foto = await convetirABase64(colaborador.foto)
      await axios({
        method:'POST',
        url: `${API}/usuario/crear-colaborador`,
        headers:{
          token
        },
        data:{
          nombre: colaborador.nombre,
          apellido: colaborador.apellido,
          telefono: colaborador.telefono,
          email: colaborador.email,
          rol: colaborador.rol,
          fotoBase64: colaborador.foto
        }
      })
      .then((x:AxiosResponse)=>{
        commit('agregarColaborador',x.data);  
      })
      .catch(async(x:AxiosError)=>{
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      });
    } catch (error) {
      console.log(error);     
    }
  },

  async cargarCocineros({commit,dispatch,rootGetters}){
    try {
      const token = rootGetters['moduloUsuario/token']
      await axios({
        method:'GET',
        url: `${API}/usuario/cocineros`,
        headers:{
          token
        },
      })
      .then((x:AxiosResponse) =>{
        commit('setCocineros',x.data);        
      })
      .catch(async(x:AxiosError)=>{
        console.log(x.response?.data);
        
        await dispatch('moduloError/asignarError',x.response?.data, {root:true})
      })
    } catch (error) {
      console.log(error);      
    }
  },
}