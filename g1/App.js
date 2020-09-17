/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import PhotoGrid from './PhotoGrid';

const {width} = Dimensions.get('window');

const images = [
  'https://picsum.photos/6000/3000',
  'https://picsum.photos/2000/2000',
  'https://picsum.photos/3000/3000',
  'https://picsum.photos/2000/3000',
  'https://picsum.photos/3000/3000',
  'https://picsum.photos/3000/2000',
  'https://picsum.photos/4000/3000',
  'https://picsum.photos/5000/3000',
  'https://picsum.photos/2000/1000',
  'https://picsum.photos/2000/40000',
  'https://picsum.photos/4000/1000',
];

const img1 = ['https://picsum.photos/2000/1000'];
const img2 = [
  'https://picsum.photos/5000/3000',
  'https://picsum.photos/2000/1000',
];
const img3 = [
  'https://picsum.photos/2000/1000',
  'https://picsum.photos/3000/3000',
  'https://picsum.photos/3000/2000',
];
const img4 = [
  'https://picsum.photos/3000/3000',
  'https://picsum.photos/4000/3000',
  'https://picsum.photos/2500/3000',
  'https://picsum.photos/1600/1200',
];

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View>
              <Text>aaa</Text>
              <PhotoGrid
                onRemovePhoto={(image, index) => console.log(image, index)}
                source={images}
                onPressImage={source => console.log(source)}
                width={width}
                height={500}
              />
              <Text>bbb</Text>
            </View>
            <View>
              <Text>aaa</Text>
              <PhotoGrid
                source={img1}
                onPressImage={source => console.log(source)}
                width={width}
                height={400}
              />
              <Text>bbb</Text>
            </View>
            <View>
              <Text>aaa</Text>
              <PhotoGrid
                source={img2}
                onPressImage={source => console.log(source)}
                width={width}
                height={500}
              />
              <Text>bbb</Text>
            </View>
            <View>
              <Text>aaa</Text>
              <PhotoGrid
                source={img3}
                onPressImage={source => console.log(source)}
                width={width}
                height={500}
              />
              <Text>bbb</Text>
            </View>
            <View>
              <Text>aaa</Text>
              <PhotoGrid
                source={img4}
                onPressImage={source => console.log(source)}
                width={width}
                height={500}
              />
              <Text>bbb</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
