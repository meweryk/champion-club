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

  comment?: string
  userfirstSeller?: string

  userBuyer?: string
  shopBuyer?: string
  nicname?: string

  view?: Date
  send?: Date
  got?: Date
  deliveryId?: string
  waybill?: string
}

export interface OrderPosition {
  name: string
  cost: number
  quantity: number
  rank?: string
  exposition?: string
  imageSrc?: string
  _id?: string
  shopSeller?: string
  userSeller?: string
  flag?: boolean
}

export interface Filter {
  start?: Date
  end?: Date
  order?: number
}

export interface Delivery {
  date?: Date
  shopBuyer: string
  shop: string
  train: string
  waybill: string
  orderId?: string
  order?: number
  user?: string
  list: DeliveryPosition[]
  imageSrc?: string
  _id?: string
}

export interface DeliveryPosition {
  name: string
  quantity: number
  rank?: string
  cost?: number
  _id?: string
}
