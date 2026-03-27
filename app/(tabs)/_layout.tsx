import { Tabs } from 'expo-router';
import { useTheme } from '../../src/theme/theme';
import { Home, Activity, Users, User } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  const { colors, borderRadius } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: '#1A1A1A', // surfaceContainerLow in Dark Neon
          borderTopWidth: 0,
          elevation: 0,
          height: 88,
          paddingBottom: 28,
          paddingTop: 12,
          borderTopLeftRadius: borderRadius.xl,
          borderTopRightRadius: borderRadius.xl,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'Manrope_500Medium',
          fontSize: 10,
          letterSpacing: 0.5,
          marginTop: 4,
          textTransform: 'uppercase',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <Activity color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <Users color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
          title: 'Me',
          tabBarIcon: ({ color }) => <User color={color} size={22} />,
        }}
      />
      {/* Hidden legacy tab */}
      <Tabs.Screen
        name="bridge"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
