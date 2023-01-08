import axios, { AxiosError, AxiosResponse } from 'axios';

import { ActionTree} from 'vuex';
import { IState } from '..';
import { IRecoveryState } from './state';

const API = process.env.VUE_APP_API;

export const actions:ActionTree<IRecoveryState, IState> = {
  async enviarCodigo({dispatch}, email){
    try {
      await dispatch('moduloError/restablecerError',{},{root:true})
      await axios({
        method:'POST',
        url: `${API}/usuario/enviar-codigo-recuperar-password`,
        data:{
          email
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
  },

  async enviarPassword({dispatch}, datos){
    try {
      await dispatch('moduloError/restablecerError',{},{root:true})
      await axios({
        method:'POST',
        url: `${API}/usuario/recuperar-password`,
        data:{
          email:datos.email,
          codigo: datos.codigo,
          password: datos.password
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
  },

}