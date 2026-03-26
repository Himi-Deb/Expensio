import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../src/theme/theme';

export default function BridgeScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.onSurface }}>Bridge Sync Insights</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
