export interface IMenuState {
  menus: {
    id: string,
    titulo: string,
    fecha: string,
    componentes: any[],
    fechaCreacion: string
  }[],
  mostrarFormulario: boolean
}

export function state(): IMenuState{
  return {
    menus:[],
    mostrarFormulario: false
  }
}
