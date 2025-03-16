import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#e0f0ff',
    100: '#b1d1f8',
    200: '#81b3f0',
    300: '#5295e8',
    400: '#2378e0',
    500: '#0a5fc7',
    600: '#084a9b',
    700: '#05356f',
    800: '#032045',
    900: '#010c1c',
  },
  darkBlue: {
    50: '#e3e8f4',
    100: '#c5d0e9',
    200: '#a6b7de',
    300: '#869fd3',
    400: '#6788c8',
    500: '#4871bd',
    600: '#375a97',
    700: '#274371',
    800: '#172d4c',
    900: '#071627',
  },
};

const theme = extendTheme({
  colors,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'darkBlue.900',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'whiteAlpha.100',
            _hover: {
              bg: 'whiteAlpha.200',
            },
            _focus: {
              bg: 'whiteAlpha.200',
              borderColor: 'brand.500',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
  },
});

export default theme; 