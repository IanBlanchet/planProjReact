import type { ComponentStyleConfig } from '@chakra-ui/theme'

// You can also use the more specific type for
// a multipart component: ComponentMultiStyleConfig
export const Table: ComponentStyleConfig = {
  // All parts of multipart components can be found in the @chakra-ui/anatomy package,
  // the menuAnatomy has as well these parts: button, list, groupTitle, command, divider
  parts: ['Th'],
  baseStyle: {
    Th: {
      fontSize: '2em',      
    },
   
  },
  sizes: {
    sm: {
      Th: {
        fontSize: '0.75rem',
        px: 2,
        py: 1,
      },
    },
    md: {
      Th: {
        fontSize: '2rem',
        px: 3,
        py: 2,
      },
    },
  },
  variants: {
    bold: {
      Th: {
        fontWeight: 'bold',
      },
     
    },
    colorful: {
      Th: {
        color: 'orange.600',
      },
     
    },
  },
  defaultProps: {
    size: 'md',
  },
}