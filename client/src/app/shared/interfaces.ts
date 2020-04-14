export interface User {
  email: string
  password: string
  nicname: string
  shop?: string
  phone?: string
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
  imageSrc?: string
}

export interface Order {
  date?: Date
  order?: number
  user?: string
  list: OrderPosition[]
  _id?: string
  shopBuyer?: string
  nicname?: string
  view?: Date
  send?: Date
  got?: Date
  comment?: string
  phone?: string
  nameBuyer?: string
}

export interface OrderPosition {
  name: string
  fraction?: string
  rank?: string
  trash?: number
  trashStap?: string
  quantityNoTrash?: number
  cost: number
  quantity: number
  _id?: string
  shopSeller?: string
  flag?: boolean
}
