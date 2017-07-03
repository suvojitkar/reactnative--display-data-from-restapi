import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, AppRegistry, Image, Dimensions } from 'react-native';

export default class reactTutorialApp extends Component {
    constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('http://api.themoviedb.org/3/movie/now_playing?api_key=e649c1ec4f43c9f8ea307ec5aec0e891')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.results),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Image source={{uri:'https://image.tmdb.org/t/p/w500_and_h281_bestv2'+rowData.poster_path}} resizeMode='cover' style= {{ height:300, width: 300 }} />}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('reactTutorialApp', () => reactTutorialApp);
