import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Button, Image, ScrollView} from 'react-native';
import tw from 'twrnc';
import { storyData, Post } from '../constants/homeConst';
import { Svg, Circle, Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import DoubleClick from 'react-native-double-tap';
import Swiper from 'react-native-swiper'

export default function HomeScreen({ navigation }){
  const fomartNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const [stories, setStories] = useState(storyData);
  const [posts, setPosts] = useState(Post);

  const handleLikePress = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].liked = !updatedPosts[index].liked;
  
    if (updatedPosts[index].liked) {
      updatedPosts[index].likes += 1; // Increase likes if the post is liked
    } else {
      updatedPosts[index].likes -= 1; // Decrease likes if the post is unliked
    }
  
    setPosts(updatedPosts);
  };
  const handleDoubleTap = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].liked = !updatedPosts[index].liked;
    
    if (updatedPosts[index].liked) {
      updatedPosts[index].likes += 1; // Increase likes if the post is liked
    } else {
      updatedPosts[index].likes -= 1; // Decrease likes if the post is unliked
    }
    
    setPosts(updatedPosts);
  };

const handleStoryPress = (index) => {
  const updatedStories = stories.map((story, i) => ({
    ...story,
    active: i === index ? 0 : story.active,
  }));
  setStories(updatedStories);
  navigation.navigate('Stories', { stories: updatedStories, currentIndex: index });
};

  return (
    <ScrollView>
    <View style={tw`bg-white`}>
      <View style={tw`px-4 py-3 flex flex-row justify-between`}>
        <Image source={require('../assets/images/logo.png')} style={{width: 100, height: 30}}/>
        <View style={tw`flex flex-row`}>
            <Image source={require('../assets/images/icon-1.png')} style={tw `w-6 h-6`}/>
            <Image source={require('../assets/images/icon-2.png')} style={tw `w-6 h-6 ml-6`}/>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
          {
            stories.map((story, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style= {tw `flex items-center pb-3`}
                  onPress={() => handleStoryPress(index)}
                >
                  <View style= {tw`rounded-full py-2 px-3`}>
                    <Image 
                      source={story.image}
                      style={tw`rounded-full w-16 h-16`}
                    />
                  </View>
                  <View style={story.active === 1 ? tw `absolute top-1` : tw `hidden`}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                      <Defs>
                        <LinearGradient id="gradient" x1="79.5789" y1="7.57895" x2="2.03283e-06" y2="55.8947" gradientUnits="userSpaceOnUse">
                          <Stop stopColor="#C913B9" />
                          <Stop offset="0.500947" stopColor="#F9373F" />
                          <Stop offset="1" stopColor="#FECD00" />
                        </LinearGradient>
                      </Defs>
                      <Circle cx="36" cy="36" r="34.75" stroke="url(#gradient)" strokeWidth="2.5" />
                    </Svg>
                  </View>
                  <View style={story.active === 0 ? tw `absolute top-1` : tw `hidden`}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 96 96" fill="none">
                      <Path
                        d="M95.25 48C95.25 74.0955 74.0955 95.25 48 95.25C21.9045 95.25 0.75 74.0955 0.75 48C0.75 21.9045 21.9045 0.75 48 0.75C74.0955 0.75 95.25 21.9045 95.25 48Z"
                        stroke="#C7C7CC"
                        strokeWidth="1.5"
                      />
                    </Svg>
                  </View>
                  <Text style={tw `text-black text-xs`}>
                      {story.name}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
      </ScrollView>
      <View>
        {
          Post.map((post, index) => {
            return (
            <View style= {tw`border-t-2 border-b-2 border-[#DDDDDD] py-4`} key={index}>
              <View style={tw `flex flex-row justify-between mb-4 px-3`}>
                <View style={tw `flex flex-row items-center`}>
                  <Image 
                      source={post.avatar}
                      style={tw`rounded-full w-8 h-8`}
                    />
                    <Text style={tw `text-black text-sm font-bold ml-2`}>{post.name}</Text>
                </View>
                <Image 
                      source={require("../assets/images/icon-more.png")}
                      style={tw`w-8 h-8`}
                    />
              </View>
                <Swiper style={{ height: 450 }} showsButtons={false} loop={false}>
                  {
                    post.image.map((imgs, imgsIndex) => {
                      return(
                        <DoubleClick
                        doubleTap={() => handleDoubleTap(index)} // Execute your double tap action here
                        delay={200} // Set the delay time (in milliseconds)
                      >
                          <Image source={imgs.img} style={{ height: 450, width: '100%' }} key={imgsIndex} />
                        </DoubleClick>
                      )
                    })
                  }
                </Swiper>
              <View style={ tw `p-3`}>
                <View style={tw `flex flex-row justify-between`}>
                  <View style={tw `flex flex-row items-center`}>
                        <TouchableOpacity onPress={() => handleLikePress(index)}>
                          <Image
                            source={
                              post.liked
                                ? require('../assets/images/icon-like.png')
                                : require('../assets/images/icon-dislike.png')
                            }
                            style={tw`w-6`}
                          />
                        </TouchableOpacity>
                        <Image 
                      source={require("../assets/images/icon-comment.png")}
                      style={tw`w-6 mx-3`}
                    />
                        <Image 
                      source={require("../assets/images/icon-share.png")}
                      style={tw`w-6`}
                    />
                  </View>
                  <Image 
                      source={require("../assets/images/icon-save.png")}
                      style={tw`w-6`}
                    />
                </View>
                <Text style={tw `text-sm text-black font-bold mt-2`}>{fomartNumber(post.likes)} likes</Text>
                <View style={tw `mt-2 flex flex-row`}>
                  <Text style={tw `text-sm text-black font-bold`}>{post.name}</Text>
                  <Text style={tw `text-sm text-black ml-1`}>{post.status}</Text>
                </View>
                <Text style={tw `text-gray-500	text-sm`}>
                  View all {fomartNumber(post.comment)} comments
                </Text>
              </View>
            </View>
            )
          })
        }
      </View>
    </View>
  </ScrollView>
    );
}