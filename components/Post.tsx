import React, { StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Text, View } from './Themed';
import { Image as ImageType, Post as PostType } from '../types';
import { ago, formatNumber } from '../lib/util';
import IconButton from './IconButton';
import ImageView from 'react-native-image-viewing';
import { useState } from 'react';

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  const mediaOrAd = post
  const image = mediaOrAd.image_versions2.candidates[0];
  const images: any = [];
  images.push({
    uri: image.url
  });
  const [visible, setIsVisible] = useState(false);

  return (
    <Link href={`/post/${mediaOrAd.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={mediaOrAd.user.profile_pic_url} style={styles.userImage} accessible={true} />

        <View style={styles.main}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.name}>{mediaOrAd.user.full_name}</Text>
              <Text style={styles.tag}>{ago(mediaOrAd.taken_at * 1000)}</Text>
            </View>

            <Text>{mediaOrAd.user.username}</Text>

          </View>
          <Text style={styles.content}>{mediaOrAd.caption.text}</Text>

          <Pressable onPress={() => setIsVisible(true)}>
            <ImageView
              images={images}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
            <Image source={image.url} style={styles.image} accessible={true} />
          </Pressable>

          <View style={styles.footer}>
            <IconButton icon="reply" text={formatNumber(mediaOrAd.comment_count)} />
            <IconButton icon="heart" text={formatNumber(mediaOrAd.like_count)} />
            <IconButton icon="share-android" />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  main: {
    marginLeft: 10,
	  flex: 1,
  },
  name: {
    fontWeight: '600',
  },
  tag: {
    marginLeft: 'auto',
  },
  content: {
    marginLeft: -50,
    lineHeight: 20,
    marginTop: 10,
  },
  image: {
    width: '126%',
    marginLeft: -70,
    // TODO: potentially clamp?
    // Math.min(max, Math.max(min, width / height))
    aspectRatio: 1 / 1,
    marginVertical: 10,
  },
  footer: {
    marginLeft: -50,
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
});

export default Post;