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