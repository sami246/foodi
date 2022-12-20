import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, sizes, spacing } from '../constants/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { TagsData } from '../data'

const Tags = ({tags, bColor, fColor, handleTagPress, wrap, filterTags, tagIconColor}) => {
  const handleBColour = (tag) => {
    if (filterTags){
      if(filterTags.includes(tag)){
        return colors.gold
      }
      else{
        return bColor
      }
    }
    else{
      return bColor
    }
  } 

  if(wrap){
    return (
      <View
          style={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: sizes.width - 50,
          alignItems: "center",
          justifyContent: "center",
          }}
      >
          {tags != [] ? (
          tags?.map((tag, index) => (
              <Pressable onPress={() => {
                if(handleTagPress){
                  handleTagPress(tag)
                }              
                }} key={index} style={[styles.selectedStyle, {backgroundColor: handleBColour(tag)}]}>
                  {
                  TagsData.map((element) => {
                    if(element.value == tag){
                      return (<element.type name={element.name} size={element.size} color={tagIconColor} />)
                    }
                  })}
              <Text
                  numberOfLines={1}
                  style={[styles.textSelectedStyle, {color: fColor}]}
              >
                  {tag} 
              </Text>
              
              </Pressable>
          ))
          ) : (
          <Text> Add Tags</Text>
          )}
      </View>
    )
  }
  else{
    return (
      <ScrollView
          horizontal={true}
          style={{
          flexDirection: "row",
          flexWrap: "nowrap",
          width: sizes.width - 50,
          height: '100%',
          paddingBottom: 5
          }}
      >
          {tags != [] ? (
          tags?.map((tag, index) => (
              <Pressable onPress={() => {
                if(handleTagPress){
                  handleTagPress(tag)
                }              
                }} key={index} style={[styles.selectedStyle, {backgroundColor: bColor, elevation: 0}]}>
                  {
                  TagsData.map((element) => {
                    if(element.value == tag){
                      return (<element.type name={element.name} size={element.size} color='white' />)
                    }
                  })}
              <Text
                  numberOfLines={1}
                  style={[styles.textSelectedStyle, {color: fColor}]}
              >
                  {tag}
              </Text>
              {/* <AntDesign color={colors.darkGray} name="star" size={15} /> */}
              </Pressable>
          ))
          ) : (
          <Text> Add Tags</Text>
          )}
      </ScrollView>
    )
  }
  
}

export default Tags

const styles = StyleSheet.create({
    selectedStyle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        shadowColor: "#000",
        marginTop: 8,
        marginHorizontal: spacing.xs,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      },
      textSelectedStyle: {
        marginRight: 5,
        paddingLeft: 5,
        fontSize: sizes.body,
      },
})