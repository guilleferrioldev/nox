import { LatLngExpression, LatLngTuple } from "leaflet";
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
  TRANSPORTING: '#BEE3F8',
  PACKAGING: '#FEEBCB',
  DELIVERED: '#C6F6D5',
  CANCELED: '#FED7D7',
}

export const colorSchemePrincipal = {
  "ALL STATUS": 'white',
  TRANSPORTING: '#2B6CB0' , 
  PACKAGING: '#C05621',
  DELIVERED: '#25855A',
  CANCELED: '#C53030',
 };

export const colorText = {
  "ALL STATUS": '#0d0d0d',
  PENDING: '#1A202C', 
  TRANSPORTING: '#2A4365' , 
  PACKAGING: '#744210',
  DELIVERED: '#22543D',
  CANCELED: '#822727',
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

export interface MarkerLocation {
  position: LatLngExpression | LatLngTuple;
  direction: string;
  product: string;
}