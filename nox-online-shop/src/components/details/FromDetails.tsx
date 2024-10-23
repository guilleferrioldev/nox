import { Box, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

export const FormDetails = () => {
    return (
      <Box p={6} pt={0} w="full">
        <form>
          <Stack spacing={3}>
            <FormControl >
              <FormLabel htmlFor="username" color="#737791" fontWeight="normal" fontSize="sm">Username</FormLabel>
              <Input 
                id="username" 
                placeholder="Enter your username" 
                w="full" 
                size="sm" 
                variant="outline" 
                paddingY={2} 
              />
            </FormControl>
  
            <Stack direction={['column', 'row']} spacing={3}>
              <FormControl >
                <FormLabel htmlFor="firstname" color="#737791" fontWeight="normal" fontSize="sm">Firstname</FormLabel>
                <Input 
                  id="firstname" 
                  placeholder="Enter your firstname" 
                  size="sm" 
                  variant="outline" 
                  paddingY={2} 
                />
              </FormControl>
              <FormControl >
                <FormLabel htmlFor="lastname" color="#737791" fontWeight="normal" fontSize="sm">Lastname</FormLabel>
                <Input 
                  id="lastname" 
                  placeholder="Enter your lastname" 
                  size="sm" 
                  variant="outline" 
                  paddingY={2}
                />
              </FormControl>
            </Stack>
  
            <FormControl >
              <FormLabel htmlFor="identityCard" color="#737791" fontWeight="normal" fontSize="sm">Identity Card</FormLabel>
              <Input 
                id="identityCard" 
                placeholder="Enter your identity card" 
                w="full" 
                size="sm" 
                variant="outline" 
                paddingY={2} 
              />
            </FormControl>
  
            <Stack direction={['column', 'row']} spacing={3}>
              <FormControl >
                <FormLabel htmlFor="phone" color="#737791" fontWeight="normal" fontSize="sm">Phone Number</FormLabel>
                <Input 
                  id="phone" 
                  placeholder="Enter your phone number" 
                  size="sm" 
                  variant="outline" 
                  paddingY={2} 
                />
              </FormControl>
              <FormControl >
                <FormLabel htmlFor="email" color="#737791" fontWeight="normal" fontSize="sm">Email</FormLabel>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  size="sm" 
                  variant="outline" 
                  paddingY={2} 
                />
              </FormControl>
            </Stack>
          </Stack>
        </form>
      </Box>
    );
  };
  