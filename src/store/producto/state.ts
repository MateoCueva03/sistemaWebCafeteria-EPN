export interface IProductoState {
  productos: {
    _id: string,
    id: string,
    nombre: string,
    precio: number,
    stock: number,
    fechaCreacion: string
  }[],
  mostrarFormulario: boolean,
  editar: boolean,
  productoActual: {
    _id: string,
    id: string,
    nombre: string,
    precio: number,
    stock: number
  }
}

export function state(): IProductoState{
  return {
    productos:[],
    mostrarFormulario: false,
    editar: false,
    productoActual: {
      _id:'',
      id:'',
      nombre:'',
      stock:10,
      precio:0
    }
  }
}
