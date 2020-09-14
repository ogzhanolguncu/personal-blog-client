import NextLink from 'next/link';

import { useColorMode, Button, Flex, Box, IconButton, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
  box-shadow: 0 3px 13px rgba(100, 110, 140, 0.1), 0 2px 4px rgba(100, 110, 140, 0.15);
`;

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <StickyNav bg="blue.500">
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        bg="blue.500"
        as="nav"
        p={4}
        mx="auto"
        maxWidth="1150px"
      >
        <Box>
          <NextLink href="/" passHref>
            <Button
              fontSize={['xs', 'sm', 'lg', 'xl']}
              as="a"
              variant="ghost"
              _hover={{ bg: 'rgba(0,0,0,.2)' }}
              p={[1, 4]}
              color="white"
            >
              <Text fontSize={['xl', '2xl', '2xl', '2xl']} mr={2}>
                🦉
              </Text>
              Oğuzhan Olguncu
            </Button>
          </NextLink>
        </Box>

        <Box>
          <NextLink href="/about" passHref>
            <Button
              fontSize={['xs', 'sm', 'lg', 'xl']}
              as="a"
              variant="ghost"
              _hover={{ bg: 'rgba(0,0,0,.2)' }}
              p={[1, 4]}
              color="white"
            >
              About
            </Button>
          </NextLink>
          <NextLink href="/blog" passHref>
            <Button
              fontSize={['xs', 'sm', 'lg', 'xl']}
              as="a"
              variant="ghost"
              _hover={{ bg: 'rgba(0,0,0,.2)' }}
              p={[1, 4]}
              color="white"
            >
              Blog
            </Button>
          </NextLink>
          <NextLink href="/guides" passHref>
            <Button
              fontSize={['xs', 'sm', 'lg', 'xl']}
              as="a"
              variant="ghost"
              _hover={{ bg: 'rgba(0,0,0,.2)' }}
              p={[1, 4]}
              color="white"
            >
              Guides
            </Button>
          </NextLink>
          <IconButton
            fontSize={['xs', 'sm', 'lg', 'xl']}
            variant="ghost"
            _hover={{ bg: 'rgba(0,0,0,.2)' }}
            aria-label="Toggle dark mode"
            icon={colorMode === 'dark' ? 'sun' : 'moon'}
            onClick={toggleColorMode}
            color="white"
          />
        </Box>
      </Flex>
    </StickyNav>
  );
};

export default Navbar;
