import React, { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Text } from '../../components/Themed';

import Post from '../../components/Post';
import posts from '../../lib/api/posts';
import { InstagramPostAPI } from '../../lib/api/posts';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function TabOneScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = () => {
    setIsRefreshing(true)
    refetch()
    setIsRefreshing(false)
  }

  // @ts-ignore
  const { listPosts } = InstagramPostAPI();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: listPosts,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <FlatList
      // @ts-ignore
      data={posts}
      renderItem={({ item }) => <Post post={item} />}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />
  );
}

const styles = StyleSheet.create({});
