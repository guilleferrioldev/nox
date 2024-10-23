import {  Button, CloseButton, Flex, FormControl, FormLabel, Heading, Modal, ModalBody, ModalContent, ModalFooter,ModalHeader, ModalOverlay, Select } from "@chakra-ui/react"

interface Props {
    isOpen: boolean,
    onClose : () => void
}

export const ModalCentered = ({ isOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex w="full" alignItems="center" justifyContent="space-between" gap={2}>
              <Heading as="h2" size="md" color="#05004E">
                Assign To Messenger
              </Heading>
              <CloseButton onClick={onClose} />
            </Flex>
           
          </ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            <FormControl mt={4} isRequired>
            <FormLabel htmlFor="messengerSelect">
              Messenger 
            </FormLabel>
            <Select
              id="messengerSelect"
              isRequired
            >
              <option value="messenger1">Messenger 1</option>
              <option value="messenger2">Messenger 2</option>
            </Select>
          </FormControl>
          </ModalBody>

          <ModalFooter gap="10px">
            <Button onClick={onClose} bg="#EDF2F7" color="#1A202C">
              Cancel
            </Button>
            <Button bg="#FF7500" color="white" onClick={onClose}>
              Assign To
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}