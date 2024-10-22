import { IAssignment } from "@/types";
import { Avatar, Box, Button, Flex, Heading, Stack, Table, Tbody, Td, Tr } from "@chakra-ui/react";

interface Props {
    assigments: IAssignment[]
}

export const Assignments = ({assigments}: Props) => {
    return (
        <Flex
            w="full"
            h="full"
            flexDirection="column" 
            p={6}
            gap={4}
        >
            <Stack spacing={2}>
                <Heading as="h2" size="md" color="gray.700">
                    Assignments
                </Heading>
                <Heading as="h2" size="sm" color="gray.500" fontWeight="medium">
                    Assignments to messengers
                </Heading>
            </Stack>

            <Flex
                direction="column"
                w="full"
                h="full" 
                justifyContent="space-between"
            >
            <Table variant="simple" overflowY="auto" >
                <Tbody>
                    {assigments.map((assignment, index) => (
                        <Tr key={assignment.id}
                            bg={index % 2 !== 0 ? "#FFFFFF" : "#EDF2F7"}>
                            <Td>
                                <Flex align="center" color="#4A5568"> 
                                    <Avatar name={assignment.name} src={assignment.src} size='sm'/>
                                    <span style={{ marginLeft: "8px" }}> 
                                        {assignment.name}
                                    </span>
                                </Flex>
                            </Td>
                            <Td>
                                <Box 
                                    bg="#FF7500" 
                                    padding="4px" 
                                    rounded="full"
                                    color="white" 
                                    display="flex"  
                                    alignItems="center"  
                                    justifyContent="center"> 
                                    {assignment.quantity}
                                </Box> 
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Button variant="solid" borderRadius="15px" bg="#FF7500"  color="white" >
                 Assign All
            </Button>
            </Flex>
        </Flex>
    )
} 