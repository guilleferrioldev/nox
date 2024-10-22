import { IconType } from "react-icons";

export type Item = {
    type: string;
    label: string;
    icon: IconType;
    path: string;
    notifications?: number;
    messages?: number;
  }