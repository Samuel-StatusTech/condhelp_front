export type TApi_Params_Auth = {
  auth: {
    register: {
      usuario: string
      senha: string
      tipo: string
      document: string
    }
    resetPassword: {
      username: string
      newPassword: string
    }
    login: {
      usuario: string
      senha: string
    }
  }
}
