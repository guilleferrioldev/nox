import Link from "next/link";
import {
  ListIcon,
  Link as LinkChakra,
  Heading,
  Box,
  Badge,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IItem } from "@/types";

interface Props {
    item: IItem;
    isActive: boolean;
}

export const NavItem = ({ item, isActive }: Props) => {
  const { label } = item;

  if (item.type === "link") {
    const { icon, notifications, messages } = item;
    return (
      <Box display="flex" alignItems="center" my={6} justifyContent="center">
        <LinkChakra
          href=""
          as={Link}
          gap={6}
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: "none", color: "black" }}
          fontWeight="medium"
          bg={isActive ? "#FFF9EC" : "#FFFFFF"}
          color={isActive ? "#FF7500" : "#A0AEC0"}
          w="full"
        >
          <ListIcon as={icon} fontSize={22} m="0" />
        <Text>{label}</Text>
        </LinkChakra>
          <React.Fragment>
            {notifications && (
              <Badge
                borderRadius="full"
                colorScheme="yellow"
                w={6}
                textAlign="center"
              >
                {notifications}
              </Badge>
            )}
            {messages && (
              <Badge
                borderRadius="full"
                colorScheme="green"
                w={6}
                textAlign="center"
              >
                {messages}
              </Badge>
            )}
          </React.Fragment>
      </Box>
    );
  }
  return (
    <Heading
      color="#A0AEC0"
      fontWeight="medium"
      textTransform="uppercase"
      fontSize="sm"
      borderTopWidth={1}
      borderColor="gray.100"
      my={6}
    >
      <Text>{label}</Text>
    </Heading>
  );
};