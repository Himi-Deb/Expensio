export const tokens = {
  colors: {
    primary: '#73FFE3',           // Primary-Brand-Color
    primaryContainer: '#123C2E',  // Dark tinted green for backgrounds
    onPrimary: '#000000',         // Black text on neon green
    
    background: '#0E0E0E',        // Primary-Background
    surface: '#0E0E0E',
    
    // Tonal Layering Levels for Dark Mode
    surfaceContainerLow: '#1A1A1A',      // Secondary-Background
    surfaceContainerHigh: '#242424',     
    surfaceContainerHighest: '#3F3E3E',  // Secondary-Grey
    surfaceContainerLowest: '#000000',  // Pure black
    
    onSurface: '#FFFFFF',         // Primary-Foreground
    onSurfaceVariant: '#ADAAAA',  // Primary-Grey
    
    tertiary: '#FF716C',          // Danger
    outline: '#3F3E3E',           // Secondary-Grey
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
