"use client";

import { Box, Flex, Grid, GridItem, IconButton } from "@chakra-ui/react";
import { Logo, Navigation, Header } from "@/components";
import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Grid
      w="100vw"
      h="100vh"
      templateColumns={{ base: "1fr", md: "250px 1fr" }} 
      gap={4}
      bg="white"
      overflowX="hidden"
    >
      <IconButton
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        display={{ base: "block", md: "none" }}
        position="absolute"
        top={4}
        left={4}
        zIndex={10}
        onClick={toggleSidebar}
      />
      <GridItem
        display={{ base: isSidebarOpen ? "block" : "none", md: "block" }}
        position={{ base: "fixed", md: "relative" }}
        top={0}
        left={0}
        w={{ base: "full", md: "250px" }}
        h="100vh"
        bg="white"
        zIndex={20}
        overflowY="auto"
      >
        <Flex
          as="aside"
          w="full"
          h="full"
          alignItems="start"
          padding={9}
          flexDirection="column"
          justifyContent="start"
        >
          <IconButton
            aria-label="Close Menu"
            icon={<CloseIcon />}
            display={{ base: "block", md: "none" }}
            alignSelf="flex-end"
            mb={4}
            onClick={toggleSidebar}
          />
          <Logo />
          <Navigation />
        </Flex>
      </GridItem>

      <GridItem>
        <Grid
          w="full"
          h={{ base: "fit-content", md: "100vh" }}
          templateRows="1fr 12fr"
        >
          <GridItem rowSpan={1}>
            <Header />
          </GridItem>
          <GridItem
            rowSpan={1}
          >
            <Box
              w="full"
              h="full"
              bg="#F9FAFB"
              borderTopLeftRadius="3xl"
            >
              {children}
            </Box>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};
