import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';

export default function Create(){
  return (
    <View style={tw`flex-1 bg-black justify-center items-center`}>
      <Text style={tw`text-white text-3xl font-bold`}>This is About</Text>
    </View>
    );
}
