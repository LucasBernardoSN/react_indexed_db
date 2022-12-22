import {
  Button,
  Center,
  Heading,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import pkg from '../package.json';

export function App() {
  const { toggleColorMode } = useColorMode();

  return (
    <Center
      flexDirection="column"
      h="100vh"
    >
      <Heading
        textAlign="center"
        mb="8"
      >
        Hello World!
      </Heading>

      <Heading textAlign="center">
        A template for building web apps with Vite, React and Chakra UI -
        version {pkg.version}
      </Heading>

      <VStack p="8">
        <Button
          onClick={() => toggleColorMode()}
          colorScheme="cyan"
        >
          Toggle Color Mode
        </Button>
      </VStack>
    </Center>
  );
}
