"use client"

import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Logo, Navigation, Header } from "@/components";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      w="full"
      h="full"
      templateColumns="250px 1fr"
      gap={4}
      bg="white"
    >
      <GridItem>
        <Flex
          as="aside"
          w="full"
          h="full"
          bg="white"
          alignItems="start"
          padding={9}
          flexDirection="column"
          justifyContent="space-between"
          transition="ease-in-out .2s"
        >
          <Box w="full">
            <Logo />
            <Navigation />
          </Box>
        </Flex>
      </GridItem>
      <GridItem>
        <Grid
          w="full"
          h="full"
          templateRows="7vh 93vh"
        >
          <GridItem colSpan={1}>
            <Header/>
          </GridItem>
          <GridItem colSpan={1}>
            <Box w="full" h="full" bg="#F9FAFB" borderTopLeftRadius="3xl">
              {children}
            </Box>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

