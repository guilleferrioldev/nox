import React from 'react';
import { Grid, Flex, GridItem } from '@chakra-ui/react';

function OrdersGrid() {
  return (
      <Grid
        w="80%" 
        h="80%"
        templateColumns="repeat(10, 1fr)" 
        templateRows="repeat(10, 1fr)" 
        gap={4} 
        p={4} 
      >
        <GridItem colSpan={10} rowSpan={1}>
          <Flex
            h="full" 
            w="full"
            bg="blue.500"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize="md" 
          >
            Fila 1: Flex que ocupa todas las columnas
          </Flex>
        </GridItem>

        <GridItem colSpan={7}  rowSpan={9}>
          <Flex
            h="full"
            w="full"
            bg="green.500"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize="2xl"
          >
            Fila 2: Flex que ocupa 7 columnas
          </Flex>
        </GridItem>
        <GridItem colSpan={3} rowSpan={9}>
          <Flex
            h="full" 
            w="full"
            bg="red.500"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize="2xl"
          >
            Fila 2: Flex que ocupa 3 columnas
          </Flex>
        </GridItem>
      </Grid>
  );
}

export default OrdersGrid;
