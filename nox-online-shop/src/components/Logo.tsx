import { Box, Flex } from "@chakra-ui/react";
import Image from 'next/image';

export const Logo = () => (
  <Flex
    w="full"
    alignItems="center"
    justifyContent="center"
    gap={4}
  >
    <Box display="flex" alignItems="center" gap={2}>
      <Image src="/logo.png" alt="Logo" width={150} height={150} />
    </Box>
  </Flex>
);