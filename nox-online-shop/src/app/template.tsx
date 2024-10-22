import { Layout } from "@/components";
import { ChakraProvider } from "@chakra-ui/react";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
    <ChakraProvider>
        <Layout>
            {children}
        </Layout>
    </ChakraProvider>
    )
  }