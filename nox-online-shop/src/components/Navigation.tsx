import { List, ListItem } from "@chakra-ui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineNotifications,
} from "react-icons/md";
import { NavItem } from "./NavItem";
import { Item } from "@/types";
import { CiDeliveryTruck } from "react-icons/ci";
import { FiFileText } from "react-icons/fi";
import { AiOutlineDatabase, AiOutlinePicture } from "react-icons/ai";
import { LuBookOpen } from "react-icons/lu";
import { IoGameControllerOutline } from "react-icons/io5";
import { HiOutlineGift } from "react-icons/hi2";

const items: Item[] = [
  {
    type: "link",
    label: "Dashboard",
    icon: MdOutlineSpaceDashboard,
    path: "/",
  },
  {
    type: "link",
    label: "Orders",
    icon: FiFileText,
    path: "/",
    messages: 2
  },
  {
    type: "link",
    label: "Banners",
    icon: AiOutlinePicture,
    path: "/",
  },
  {
    type: "link",
    label: "Public Info",
    icon: LuBookOpen,
    path: "/",
  },
  {
    type: "link",
    label: "Notifications",
    icon: MdOutlineNotifications,
    path: "/",
    notifications: 24,
  },
  {
    type: "link",
    label: "Roulette Game",
    icon: IoGameControllerOutline,
    path: "/",
  },
  {
    type: "link",
    label: "Inventaries",
    icon: AiOutlineDatabase,
    path: "/",
  },
  {
    type: "link",
    label: "Coupons",
    icon: HiOutlineGift,
    path: "/",
  },
  {
    type: "link",
    label: "Shippings",
    icon: CiDeliveryTruck,
    path: "/",
  },
];

export const Navigation = () => (
  <List w="full" my={8}>
    {items.map((item, index) => (
      <ListItem key={index}>
        <NavItem item={item} isActive={index === 0} />
      </ListItem>
    ))}
  </List>
);