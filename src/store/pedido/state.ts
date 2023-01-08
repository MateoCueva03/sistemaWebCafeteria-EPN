export interface IPedidoState {
  carrito: {
    componentes:{
      componente: {
        _id: string,
        nombre: string,
        descripcion: string,
        precio: number,
        medida: string,
        urlFoto: string | null,
        tipo: string,
      },
      cantidad: Number
    }[],
    productos:{
      producto:{
        _id: string,
        nombre: string,
        precio: number,
        stock: number
      },
      cantidad: number
    }[]
  },
  pedidos: {
    total:number,
    fechaCreacion:string,
    urlComprobante: string,
    estado:string[],
    _cliente:{
      nombre: string,
      apellido: string,
      telefono: string,
      email: string,
    },
    componentes:{
      _componente:{
        _id: string,
        nombre: string,
        descripcion: string,
        precio: number,
        medida: string,
        urlFoto: string | null,
        tipo: string,
      },
      cantidad:number
    }[],
    productos:{

    }
  }[],
}

export function state(): IPedidoState{
  return {
    carrito:{
      componentes: [],
      productos: []
    },
    pedidos:[]
  }
}
