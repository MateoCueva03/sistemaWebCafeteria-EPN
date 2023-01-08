export interface IColaboradorState {
  colaboradores: {
    id?: string,
    nombre?: string,
    apellido?: string,
    telefono?: string,
    email?: string,
    rol?: string,
    fechaCreacion?: Date
  }[],
  mostrarFormulario: boolean,
  cocineros:{
    _id:string,
    nombre:string,
    apellido:string,
    pedidosPendientes: number
  }[]
}

export function state(): IColaboradorState{
  return {
    colaboradores:[],
    mostrarFormulario: false,
    cocineros: []
  }
}
