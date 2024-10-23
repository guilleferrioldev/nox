"use client"

import { Details, Orders } from "@/components";
import { useDetails } from "@/context";
import { Flex } from "@chakra-ui/react";
 
export default function Home() {
  const { isDetails } = useDetails();
  
  return (
    <Flex justifyContent="center" alignItems="center" h="full" w="full">
      {isDetails ? <Details/> :  <Orders />}
  </Flex>
  );
}
