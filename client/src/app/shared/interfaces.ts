export interface User {
  email: string
  password: string
  nicname: string
  shop?: string
}

export interface Message {
  message: string
}

export interface Category {
  name: string
  imageSrc?: string
  user?: string
  _id?: string
}

export interface Position {
  name: string
  cost: number
  user?: string
  category: string
  _id?: string
  quantity?: number
  stock?: number
  rank?: string
  shop?: string
  exposition?: string
}
