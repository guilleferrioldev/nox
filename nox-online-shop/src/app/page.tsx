"use client"

import { Assignments } from "@/components";
import { IAssignment } from "@/types";
import { Badge, Box, Button, ButtonGroup, Flex, Grid, GridItem, Icon, Stack } from "@chakra-ui/react";
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

export default function Home() {
  return (
    <Flex justifyContent="center" alignItems="center" h="full" w="full">
      <Box
        gap={4}
        w="90%"
        h="90%"
      >
        <Flex
          w="full" 
          h="10%"
          bg="gray.100"
          padding={4}
          gap={3}
          alignItems="center"
          justifyContent="end" 
        >
          <Stack direction='row'>
            <Badge variant='solid' colorScheme='gray'>
              All Status
            </Badge>
            <Badge variant='outline' colorScheme='blue'>
              Transporting
            </Badge>
            <Badge variant='outline' colorScheme='orange'>
              Packaging
            </Badge>
            <Badge variant='outline' colorScheme='green'>
              Delivered
            </Badge>
            <Badge variant='outline' colorScheme='red'>
              Canceled
            </Badge>
          </Stack>

          <ButtonGroup spacing="0">
            <Button 
              variant="outline" 
              borderColor="gray.300"
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
              variant="outline" 
              borderColor="gray.300"
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
          h="90%"
          templateColumns={{ base: '1fr', md: '3fr 1fr' }} // Define columns for mobile and desktop
          gap={10}
        >
          <GridItem colSpan={1} bg="white" borderRadius="20px">
            {/* Your content here */}
          </GridItem>

          <GridItem colSpan={1} bg="white" borderRadius="20px">
              <Assignments assigments={assignments}/>
          </GridItem>
        </Grid>
      </Box>
  </Flex>
  );
}
