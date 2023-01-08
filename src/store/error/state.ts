export interface IErrorState {
  error?: {
    message?: string,
    errors?: [],
    status?: number,
  };
}

export function state(): IErrorState{
  return {
      error: {}
  }
}
