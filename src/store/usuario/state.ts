export interface IUsuarioState {
  usuario: {
    id?: string,
    nombre?: string,
    apellido?: string,
    telefono?: string,
    email?: string,
    rol?: string,
    fechaCreacion?: Date,
    token?: string
  };
}

export function state(): IUsuarioState{
  return {
      usuario: {}
  }
}
