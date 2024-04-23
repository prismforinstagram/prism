import { View, Text } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import React from 'react';

type IconButtonProps = {
  icon: React.ComponentProps<typeof Octicons>['name'];
  text?: string | number;
};

const IconButton = ({ icon, text }: IconButtonProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Octicons name={icon} size={15} color="gray" style={{marginRight: 5}} />
      <Text style={{ fontSize: 12, color: 'gray' }}>{text}</Text>
    </View>
  );
};

export default IconButton;