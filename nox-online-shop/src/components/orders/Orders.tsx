"use client"

import { Assignments, OrdersTable } from "@/components";
import {  colorSchemePrincipal, IAssignment, IOrder, OrderStatus } from "@/types";
import { Badge, Box, Button, ButtonGroup, Flex, Grid, GridItem, Heading, Icon, Input, Stack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { BsGeo } from "react-icons/bs";
import { MdMenu } from "react-icons/md";

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
   status: OrderStatus.PENDING,
  },
  {
   id: 'order-2',
   name: 'Jane Doe',
   src: 'https://bit.ly/kent-c-dodds',
   products: ['product-3', 'product-4'],
   email: 'jane.doe@example.com',
   phone: '987-654-3210',
   status: OrderStatus.TRANSPORTING,
  },
  {
   id: 'order-3',
   name: 'Peter Pan',
   src: 'https://bit.ly/ryan-florence',
   products: ['product-5', 'product-6'],
   email: 'peter.pan@example.com',
   phone: '555-123-4567',
   status: OrderStatus.PACKAGING,
  },
  {
    id: 'order-4',
    name: 'Jane Doe',
    src: 'https://bit.ly/kent-c-dodds',
    products: ['product-3', 'product-4'],
    email: 'jane.doe@example.com',
    phone: '987-654-3210',
    status: OrderStatus.DELIVERED,
   },
   {
    id: 'order-5',
    name: 'Jane Doe',
    src: 'https://bit.ly/kent-c-dodds',
    products: ['product-3', 'product-4'],
    email: 'jane.doe@example.com',
    phone: '987-654-3210',
    status: OrderStatus.CANCELED,
   },
 ];


export const Orders = () => {
    const Mapear = useMemo(() => dynamic(
        async () => (await import("@/components/orders/Map")).default,
        { ssr: false }
      ), [])
    
      const [isMap, setIsMap] = useState(false);
      
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
              Object.values(OrderStatus).map((status) => {
                if (status ===  OrderStatus.PENDING) return
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
          w="full"
          h="80%"
          templateColumns={{ base: '1fr', md: '3fr 1fr' }} 
          gap={10}
        >
          <GridItem colSpan={1} bg="white" borderRadius="20px">
            <Flex w="full" h="10%" p={6} pt={10} alignItems="center" justifyContent="space-between">
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
            
            {isMap ? <Mapear posix={[23.113706, -82.420451]} /> : <OrdersTable orders={orders}/>}
          </GridItem>

          <GridItem colSpan={1} bg="white" borderRadius="20px">
              <Assignments assigments={assignments}/>
          </GridItem>
        </Grid>
      </Box>
    );
}