export interface RegisterUser {
    name: string,
    email: string,
    password: string,
    rePassword: string,
    phone: string
}
export interface User {
  message: string
  user: LoginUser
  token: string
}

export interface LoginUser {
  name: string
  email: string
  role: string
}


export interface ResetPassword {
    email: string,
    newPassword: string
}
