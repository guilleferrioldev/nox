"use client"

import { Assignments, OrdersTable } from "@/components";
import {  colorSchemePrincipal, IAssignment, IOrder, MarkerLocation, Status } from "@/types";
import { Badge, Box, Button, ButtonGroup, Flex, Grid, GridItem, Heading, Icon, Input, Stack, useDisclosure } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { BsGeo } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { ModalCentered } from "./Modal";

const assignments: IAssignment[] = [
  {
    id: 1,
    name: 'Kent Dodds',
    src: 'https://bit.ly/kent-c-dodds',
    quantity: 10,
  },
  {
    id: 2,
    name: 'Prosper Otemuyiwa',
    src: 'https://bit.ly/prosper-baba',
    quantity: 20,
  },
  {
    id: 3,
    name: 'Ryan Florence',
    src: 'https://bit.ly/ryan-florence',
    quantity: 5,
  },
];

const orders: IOrder[] = [
  {
   id: 'order-1',
   name: 'John Doe',
   src: 'https://bit.ly/ryan-florence',
   products: ['product-1', 'product-2'],
   email: 'john.doe@example.com',
   phone: '123-456-7890',
   status: Status.PENDING,
  },
  {
   id: 'order-2',
   name: 'Jane Doe',
   src: 'https://bit.ly/kent-c-dodds',
   products: ['product-3', 'product-4'],
   email: 'jane.doe@example.com',
   phone: '987-654-3210',
   status: Status.TRANSPORTING,
  },
  {
   id: 'order-3',
   name: 'Peter Pan',
   src: 'https://bit.ly/ryan-florence',
   products: ['product-5', 'product-6'],
   email: 'peter.pan@example.com',
   phone: '555-123-4567',
   status: Status.PACKAGING,
  },
  {
    id: 'order-4',
    name: 'Jane Doe',
    src: 'https://bit.ly/kent-c-dodds',
    products: ['product-3', 'product-4'],
    email: 'jane.doe@example.com',
    phone: '987-654-3210',
    status: Status.DELIVERED,
   },
   {
    id: 'order-5',
    name: 'Jane Doe',
    src: 'https://bit.ly/kent-c-dodds',
    products: ['product-3', 'product-4'],
    email: 'jane.doe@example.com',
    phone: '987-654-3210',
    status: Status.CANCELED,
   },
 ];

 const markerLocations: MarkerLocation[] = [
  {
   position: [23.115706, -82.418451], 
   direction: "Calle 30 e/27 y 29 Siboney Playa #3892",
   product: "Café molido",
  },
  {
   position: [23.111706, -82.422451], 
   direction: "Calle 44 e/21 y 23 Siboney Playa #4212",
   product: "Hamburguesas"
  },
  {
   position: [23.113706, -82.416451], 
   direction: "Calle 33 e/34 y 36 Siboney Playa #6040",
   product: "Libros"
  },
  {
   position: [23.113706, -82.424451], 
   direction: "Calle 17 e/42 y 36 Siboney Playa #5053",
   product: "Fruta fresca"
  },
  {
   position: [23.114706, -82.420451], 
   direction: "Calle 25 e/34 y 36 Siboney Playa #4578",
   product: "Pan"
  },
];  


export const Orders = () => {
    const Mapear = useMemo(() => dynamic(
        async () => (await import("@/components/orders/Map")).default,
        { ssr: false }
      ), [])
    
      const [isMap, setIsMap] = useState(false);
      const { isOpen, onOpen, onClose } = useDisclosure();
      
    return (
        <Box
        gap={4}
        w="90%"
        h="90%"
      >
        <Flex
          w="full" 
          h="5%"
          bg="#F9FAFB"
          padding={4}
          my="4"
          gap={3}
          alignItems="center"
          justifyContent="end" 
        >
          <Stack direction='row'>
            {
              Object.values(Status).map((status) => {
                if (status ===  Status.PENDING) return
                const color = colorSchemePrincipal[status];
                const variant = status === "ALL STATUS" ? 'solid' : 'outline';
              
                return (
                  <Badge key={status} variant={variant} color={color} borderColor={color}>
                    {status}
                  </Badge>
                );
              })
            }
          </Stack>

          <ButtonGroup spacing="0">
            <Button 
              onClick={() => setIsMap(false)}
              variant="outline" 
              borderColor="#EDF2F7"
              bg={isMap ? '#F9FAFB' : '#EDF2F7'}
              borderRadius="md" 
              style={{
                borderRadius: "12px 0 0 12px",
              }}
              >
              <Icon as={MdMenu} 
                size="md" 
                display="flex"
                alignItems="center"
                justifyContent="center"/>
            </Button>
            <Button 
              onClick={() => setIsMap(true)}
              variant="outline" 
              bg={isMap ? '#EDF2F7': '#F9FAFB'}
              borderColor="#E2E8F0"
              borderRadius="md" 
              style={{
                borderRadius: "0 12px 12px 0",
              }}
              >
              <Icon as={BsGeo} 
                size="md" 
                display="flex"
                alignItems="center"
                justifyContent="center"/>
            </Button>
          </ButtonGroup>
        </Flex>
        
        <Grid
           w="100%"
           h="80%"         
           templateColumns={{ base: '1fr', md: '3fr 1fr' }} 
           gap={10}
        >
          <GridItem colSpan={1} bg="white" borderRadius="20px" overflow="hidden">
            <Flex w="full" h="5%" p={6} pt={10} alignItems="center" justifyContent="space-between">
              <Stack spacing={2} w="40%">
                <Heading as="h2" size="md" color="#05004E">
                    Orders
                </Heading>
                <Heading as="h2" size="sm" color="#737791" fontWeight="medium">
                    Order summary
                </Heading>
              </Stack>
              <Flex align="center" w="40%">
                  <Input type="date" size='sm' color="#A0AEC0"/> 
                  <Input type="date" size='sm' color="#A0AEC0"/> 
              </Flex>
            </Flex>
            
            {isMap ? <Mapear posix={[23.113706, -82.420451]} onOpen={onOpen} markerLocations={markerLocations}/> : <OrdersTable orders={orders}/>}
            <ModalCentered isOpen={isOpen} onClose={onClose}/>
          </GridItem>

          <GridItem colSpan={1} bg="white" borderRadius="20px">
              <Assignments assigments={assignments}/>
          </GridItem>
        </Grid>
      </Box>
    );
}