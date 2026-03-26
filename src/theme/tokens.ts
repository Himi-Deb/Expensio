export const tokens = {
  colors: {
    primary: '#32FCB3',           // Neon Mint Green from the screenshots
    primaryContainer: '#123C2E',  // Dark tinted green for backgrounds
    onPrimary: '#000000',         // Black text on neon green
    
    background: '#0B0D0C',        // Deepest black/grey for main app background
    surface: '#0B0D0C',
    
    // Tonal Layering Levels for Dark Mode
    surfaceContainerLow: '#151716',      // Base card backgrounds
    surfaceContainerHigh: '#1C1E1D',     // Elevated cards
    surfaceContainerHighest: '#262827', // Highly elevated or selected
    surfaceContainerLowest: '#000000',  // Pure black
    
    onSurface: '#FFFFFF',         // White text
    onSurfaceVariant: '#8A918E',  // Muted grey text
    
    tertiary: '#FF5964',          // Red for expenses / negative
    outline: '#2A2E2C',           // Subtle borders if needed
    outlineVariant: '#393E3C',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    huge: 64,
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    full: 9999,
  },
  typography: {
    display: {
      fontFamily: 'Manrope_700Bold',
      letterSpacing: -0.5,
    },
    header: {
      fontFamily: 'Manrope_600SemiBold',
    },
    body: {
      fontFamily: 'Inter_400Regular',
    },
    label: {
      fontFamily: 'Inter_500Medium',
      letterSpacing: 1, // Useful for the uppercase subheadings in the design
    }
  }
};
