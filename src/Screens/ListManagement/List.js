import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, Dimensions,Alert } from 'react-native';

import { getCharacters,deleteCharacter } from '../../Actions'
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window')



const List = (props) => {

  useEffect(() => {
    props.getCharacters();
  }, []);

  // const getFirstSeen = (item) => {
  //   fetch(item)
  //     .then((response) => response.json())
  //     .then((json) => (setFirstSeen(oldArray => [...oldArray, json.name])))
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // function setStatusCircle({ item }) {
  //   if (item.status === 'Alive') {
  //     return <View style={styles.circleAlive} />
  //   } else if (item.status === 'Dead') {
  //     return <View style={styles.circleDead} />
  //   } else if (item.status === 'unknown') {
  //     return <View style={styles.circleUnknown} />
  //   }
  // }
  const deleteAlert = (item) =>
    Alert.alert(
      "Are you sure ?",
      '',
      [
        {
          text: "Yes",
          onPress: () => props.deleteCharacter({id:item._id})
        },
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },

      ],
      { cancelable: false }
    );



  const renderItem = ({ item }) => (

    <View style={styles.item}>
      <View style={styles.imageView}>
        <Image style={styles.image}
          defaultSource={require('../../img/dummy.png')}
          source={{
            uri: item.image != null ? item.image : require('../../img/dummy.png'),
          }} />
      </View>
      <View style={styles.textView}>
        <View style={styles.textGroupView}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.circleAndStatusView}>
            <Text style={styles.status}> {item.status} - {item.species}</Text>
          </View>

        </View>
        <View style={styles.textGroupView}>
          <Text style={styles.lastKnownLoc}>Gender:</Text>
          <Text style={styles.locationName}>{item.gender}</Text>
        </View>


        {/* <View style={styles.textGroupView}>
          <Text style={styles.lastKnownLoc}>First Seen in:</Text>
          <Text style={styles.locationName}></Text>
        </View> */}
      </View>
      <TouchableOpacity style={styles.deleteOpacity} onPress={() => deleteAlert(item)}>
        <Image style={styles.deleteSign} source={require('../../img/minus.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.characterList}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202329',
  },
  item: {
    backgroundColor: '#3C3E44',
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row'

  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'

  },
  imageView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textView: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 15
  },
  image: {
    width: width * 0.3,
    height: height * 0.2
  },
  textGroupView: {
    flex: 1,
    marginVertical: height * 0.01
  },
  status: {
    fontSize: 12,
    color: 'white',

  },
  lastKnownLoc: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  locationName: {
    color: 'white',
    fontSize: 16,

  },
  circleAndStatusView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  circleAlive: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#55cc44',

  },
  circleDead: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#ea000c',

  },
  circleUnknown: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#9e9e9e',

  },
  deleteSign: {
    width: 25,
    height: 25
  },
  deleteOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginVertical: height * 0.01
  },
});


const mapStateToProps = ({ listResponse }) => {
  const { listLoader, characterList } = listResponse;
  return { listLoader, characterList };
};

export default connect(mapStateToProps, { getCharacters,deleteCharacter })(List);
