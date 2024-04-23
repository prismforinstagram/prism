import { Octicons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { Image } from 'expo-image';

import Colors from '../../constants/Colors';
import React from 'react';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Octicons>['name'];
  color: string;
}) {
  return <Octicons size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Image
                    source='https://instagram.fbdo1-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbdo1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=wKWUbEw9Lt0AX8q4Gsk&edm=AJ9x6zYBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfCYsJHTWqtxt0ITr8mpudwQPJNUNGk_-U7bsu2oRcUUSQ&oe=654D920F&_nc_sid=65462d'
                    accessible={true}
                    style={{ width: 40, height: 40, marginLeft: 15, opacity: pressed ? 0.5 : 1, borderRadius: 40 / 2 }} />
                )}
              </Pressable>
            </Link>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/search" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Octicons
                    name="search"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
    </Tabs>
  );
}
