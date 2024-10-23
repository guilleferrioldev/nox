import { useLocation } from "@/context";
import { Box } from "@chakra-ui/react";

export const Details = () => {
    const { location } = useLocation();

    console.log(location);
    return (
        <Box
        gap={4}
        w="90%"
        h="90%"
      >
        <></>
      </Box>
    );
}