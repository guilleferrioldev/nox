"use client"

import React, { useMemo, useState } from 'react';
import { Grid, Flex, GridItem, Stack, Badge, ButtonGroup, Button, Icon, useDisclosure, Heading, Input, Box } from '@chakra-ui/react';
import { colorSchemePrincipal, IAssignment, IOrder, MarkerLocation, Status } from '@/types';
import { BsGeo } from 'react-icons/bs';
import { MdMenu } from 'react-icons/md';
import { Assignments, ModalCentered, OrdersTable } from "@/components";
import dynamic from 'next/dynamic';

const assignments: IAssignment[] = [
  { id: 1, name: 'Kent Dodds', src: 'https://bit.ly/kent-c-dodds', quantity: 10 },
  { id: 2, name: 'Prosper Otemuyiwa', src: 'https://bit.ly/prosper-baba', quantity: 20 },
  { id: 3, name: 'Ryan Florence', src: 'https://bit.ly/ryan-florence', quantity: 5 },
];

const orders: IOrder[] = [
  { id: 'order-1', name: 'John Doe', src: 'https://bit.ly/ryan-florence', products: ['product-1', 'product-2'], email: 'john.doe@example.com', phone: '123-456-7890', status: Status.PENDING },
  { id: 'order-2', name: 'Jane Doe', src: 'https://bit.ly/kent-c-dodds', products: ['product-3', 'product-4'], email: 'jane.doe@example.com', phone: '987-654-3210', status: Status.TRANSPORTING },
  { id: 'order-3', name: 'Peter Pan', src: 'https://bit.ly/ryan-florence', products: ['product-5', 'product-6'], email: 'peter.pan@example.com', phone: '555-123-4567', status: Status.PACKAGING },
  { id: 'order-4', name: 'Jane Doe', src: 'https://bit.ly/kent-c-dodds', products: ['product-3', 'product-4'], email: 'jane.doe@example.com', phone: '987-654-3210', status: Status.DELIVERED },
  { id: 'order-5', name: 'Jane Doe', src: 'https://bit.ly/kent-c-dodds', products: ['product-3', 'product-4'], email: 'jane.doe@example.com', phone: '987-654-3210', status: Status.CANCELED },
];

const markerLocations: MarkerLocation[] = [
  { position: [23.115706, -82.418451], direction: "Calle 30 e/27 y 29 Siboney Playa #3892", product: "Café molido" },
  { position: [23.111706, -82.422451], direction: "Calle 44 e/21 y 23 Siboney Playa #4212", product: "Hamburguesas" },
  { position: [23.113706, -82.416451], direction: "Calle 33 e/34 y 36 Siboney Playa #6040", product: "Libros" },
  { position: [23.113706, -82.424451], direction: "Calle 17 e/42 y 36 Siboney Playa #5053", product: "Fruta fresca" },
  { position: [23.114706, -82.420451], direction: "Calle 25 e/34 y 36 Siboney Playa #4578", product: "Pan" },
];

export const Orders = () => {
  const Mapear = useMemo(() => dynamic(
    async () => (await import("@/components/orders/Map")).default,
    { ssr: false }
  ), []);
  
  const [isMap, setIsMap] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Grid
      w="90%" 
      h="90%"
      templateColumns={{ base: "1fr", md: "repeat(10, 1fr)" }} 
      templateRows={{ base: "repeat(15, 1fr)", md: "repeat(10, 1fr)" }} 
      gap={4} 
      p={4} 
    >
      <GridItem colSpan={10} rowSpan={1}>
        <Flex
          h="full" 
          w="full"
          gap={3}
          alignItems="center"
          justifyContent="end"
          fontSize="md" 
        >
          <Stack direction='row' display={{ base: 'none', md: 'flex' }}>
            {
              Object.values(Status).map((status) => {
                if (status === Status.PENDING) return null;
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
              style={{ borderRadius: "12px 0 0 12px" }}
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
              bg={isMap ? '#EDF2F7' : '#F9FAFB'}
              borderColor="#E2E8F0"
              borderRadius="md" 
              style={{ borderRadius: "0 12px 12px 0" }}
            >
              <Icon as={BsGeo} 
                size="md" 
                display="flex"
                alignItems="center"
                justifyContent="center"/>
            </Button>
          </ButtonGroup>
        </Flex>
      </GridItem>

      <GridItem colSpan={{ base: 10, md: 7 }} rowSpan={9}>
        <Grid
          h="full"
          w="full"       
          templateRows="10% 90%" 
          bg="white"
          borderRadius="20px"
          gap={4}
        >
          <GridItem rowSpan={1} mb={{ base: 3, md: 1}}>
            <Flex w="full" h="5%" p={6} pt={{ base: 0, md: 5}} alignItems={{ base: "start", md: "space-between"}} gap={3} justifyContent={{ base: "start", md: "space-between"}} flexDirection={{ base: "column", md: "row"}}>
              <Stack spacing={2}>
                <Heading as="h2" size="md" color="#05004E">
                  Orders
                </Heading>
                <Heading as="h2" size="sm" color="#737791" fontWeight="medium">
                  Order summary
                </Heading>
              </Stack>
              <Flex align="center" w={{ base: "80%", md: "40%"}}>
                <Input type="date" size='sm' color="#A0AEC0"/> 
                <Input type="date" size='sm' color="#A0AEC0"/> 
              </Flex>
            </Flex>
          </GridItem>

          <GridItem rowSpan={1} w="100%" h="90%"  overflowX="scroll" paddingRight={{base: 6, md: 0}}>
            {isMap ? 
            <Box overflowX="scroll" w="full" p={3} h="full">
              <Mapear posix={[23.113706, -82.420451]} onOpen={onOpen} markerLocations={markerLocations}/> 
            </Box>
            : <OrdersTable orders={orders}/>}
            <ModalCentered isOpen={isOpen} onClose={onClose}/>
          </GridItem>
        </Grid>
      </GridItem>
      
      <GridItem colSpan={{ base: 10, md: 3 }} rowSpan={9} paddingRight={{base: 6, md: 0}}>
        <Flex
          h="full" 
          w="full"
          alignItems="center"
          justifyContent="center"
          bg="white"
          borderRadius="20px"
        >
          <Assignments assigments={assignments}/>
        </Flex>
      </GridItem>
    </Grid>
  );
}
