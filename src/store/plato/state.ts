export interface IPlatoState {
  platos: {
    id: string,
    nombre: string,
    descripcion: string,
    precio: number,
    medida: string,
    urlFoto: string | null,
    tipo: string,
    fechaCreacion: string
  }[],
  mostrarFormulario: boolean,
  editar: boolean,
  platoActual:{
    id: string,
    nombre: string,
    descripcion: string,
    precio: number,
    medida: string,
    urlFoto: string | null,
    tipo: string
  }
}

export function state(): IPlatoState{
  return {
    platos:[],
    mostrarFormulario: false,
    editar: false,
    platoActual:{
      id: '',
      nombre: '',
      descripcion: '',
      precio: 0,
      medida: 'plato',
      urlFoto: null,
      tipo: 'caldo'
    }
  }
}
