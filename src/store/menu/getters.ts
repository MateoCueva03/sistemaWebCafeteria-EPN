import { GetterTree } from 'vuex';
import { IState } from '..';
import { IMenuState } from './state';
import moment from 'moment'

export const getters: GetterTree<IMenuState, IState> = {
  menus(state){
    return state.menus
  },
  mostrarFormulario(state){
    return state.mostrarFormulario;
  },
  menuDelDia(state){
    const menu = state.menus.find(x => moment(moment(x.fecha).utc().format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD')));
    if(!menu) return menu;
    console.log(menu);
    
    menu.componentes = menu.componentes.filter(x => x.estado)  
    return menu;
  }
}