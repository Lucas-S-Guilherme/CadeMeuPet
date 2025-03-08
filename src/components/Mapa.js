import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Mapa = ({ route, initialRegion }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialRegion);

  useEffect(() => {
    if (route?.params?.initialRegion) {
      setSelectedLocation(route.params.initialRegion);
    } else if (initialRegion) {
      setSelectedLocation(initialRegion);
    }
  }, [route, initialRegion]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={selectedLocation}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Local selecionado"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Mapa;