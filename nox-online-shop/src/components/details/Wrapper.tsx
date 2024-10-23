import { Button, Flex, Heading, Stack } from "@chakra-ui/react";

interface HeaderProps {
    name: string;
    subname: string;
    buttonName?: string;
  }
  
  interface WrapperProps extends HeaderProps {
    children: React.ReactNode
  }
  
export const FlexWrapper = ({name, subname, buttonName, children}: WrapperProps) => {
    return (
      <Flex bg="#FFFFFF" h="full" align="center" justify="center" borderRadius="15px" flexDirection="column">
        <Header name={name} subname={subname} buttonName={buttonName}/>
        <Flex w="full" h="80%">
          {children}
        </Flex>      
      </Flex>
    )
  }
  
const Header = ({name, subname, buttonName}: HeaderProps) => {
    return (
      <Flex bg="#FFFFFF" h="20%" w="full" align="center" justify={buttonName ? "space-around": "start"} alignItems="center" p={6} mb={2} pb={0}>
        <Stack spacing={2} w="full">
          <Heading as="h2" size="md" color="#05004E">
              {name}
          </Heading>
          <Heading as="h2" size="sm" color="#737791" fontWeight="medium">
              {subname}
          </Heading>
        </Stack>
  
        {buttonName && <Button variant="solid" borderRadius="20px" bg="#FF7500"  color="white" h={7} fontSize="sm">
          {buttonName}
        </Button>}
      </Flex>
      
    )
  }
  