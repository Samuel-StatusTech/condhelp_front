export type TApi_Params_Auth = {
  auth: {
    requestPasswordLink: {
      email: string
    }
    register: {
      usuario: string
      senha: string | null
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
    acceptTerms: {
      userId: number
    }
  }
}
