"use client"

import { Box, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";

const user = {
  username: "rolando",
  firstname: "Rolando",
  lastname: "Fonseca Martínez",
  identityCard: "8502034587",
  email: "rolando@gmail.com",
  phone: "+53 5 741 23 69",
}

export const FormDetails = () => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <Box p={6} pt={0} w="full">
      <form>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel htmlFor="username" color="#737791" fontWeight="normal" fontSize="sm">Username</FormLabel>
            <Input
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              w="full"
              size="sm"
              variant="outline"
              paddingY={2}
            />
          </FormControl>

          <Stack direction={['column', 'row']} spacing={3}>
            <FormControl>
              <FormLabel htmlFor="firstname" color="#737791" fontWeight="normal" fontSize="sm">Firstname</FormLabel>
              <Input
                id="firstname"
                placeholder="Enter your firstname"
                value={formData.firstname}
                onChange={handleChange}
                size="sm"
                variant="outline"
                paddingY={2}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastname" color="#737791" fontWeight="normal" fontSize="sm">Lastname</FormLabel>
              <Input
                id="lastname"
                placeholder="Enter your lastname"
                value={formData.lastname}
                onChange={handleChange}
                size="sm"
                variant="outline"
                paddingY={2}
              />
            </FormControl>
          </Stack>

          <FormControl>
            <FormLabel htmlFor="identityCard" color="#737791" fontWeight="normal" fontSize="sm">Identity Card</FormLabel>
            <Input
              id="identityCard"
              placeholder="Enter your identity card"
              value={formData.identityCard}
              onChange={handleChange}
              w="full"
              size="sm"
              variant="outline"
              paddingY={2}
            />
          </FormControl>

          <Stack direction={['column', 'row']} spacing={3}>
            <FormControl>
              <FormLabel htmlFor="phone" color="#737791" fontWeight="normal" fontSize="sm">Phone Number</FormLabel>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                size="sm"
                variant="outline"
                paddingY={2}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email" color="#737791" fontWeight="normal" fontSize="sm">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
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
