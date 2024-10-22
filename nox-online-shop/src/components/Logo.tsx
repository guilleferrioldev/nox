import { Box, Flex, Icon } from "@chakra-ui/react";
import { AiFillThunderbolt } from "react-icons/ai";


export const Logo = () => (
  <Flex
    w="full"
    alignItems="center"
    justifyContent="center"
    gap={4}
  >
    <Box display="flex" alignItems="center" gap={2}>
      <Icon as={AiFillThunderbolt} fontSize={30} />
    </Box>
  </Flex>
);