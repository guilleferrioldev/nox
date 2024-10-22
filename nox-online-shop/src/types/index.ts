import { IconType } from "react-icons";

export interface IItem {
    type: string;
    label: string;
    icon: IconType;
    path: string;
    notifications?: number;
    messages?: number;
}

export interface IAssignment {
  id: number;
  name: string; 
  src: string;
  quantity: number;
}

export enum OrderStatus {
    ALL_STATUS = "ALL STATUS",
    PENDING = "PENDING",
    TRANSPORTING = "TRANSPORTING",
    PACKAGING = "PACKAGING",
    DELIVERED = "DELIVERED",
    CANCELED = "CANCELED"
}

export const colorScheme = {
  "ALL STATUS": 'gray',
  PENDING: 'gray',
  TRANSPORTING: 'blue',
  PACKAGING: 'orange',
  DELIVERED: 'green',
  CANCELED: 'red',
}

export const colorText = {
  "ALL STATUS": '#0d0d0d', // Gris más oscuro
  PENDING: '#0d0d0d', // Gris más oscuro
  TRANSPORTING: '#001a4d', // Azul más oscuro
  PACKAGING: '#7f4d00', // Naranja más oscuro
  DELIVERED: '#0b3d20', // Verde más oscuro
  CANCELED: '#3d0000', // Rojo más oscuro
 };

export interface IOrder {
  id: string;
  name: string;
  src: string;
  products: string[];
  email?: string;
  phone?: string;
  status: OrderStatus;
}