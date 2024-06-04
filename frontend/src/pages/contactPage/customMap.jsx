import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Box, Typography } from '@mui/material';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const SimpleMap = () => {
  return (
    <Box sx={{ width: '100%', height: '450px', borderRadius: '8px', backgroundColor: '#1e1e1e', color: 'white' }}>
      <Typography variant="h6" gutterBottom textAlign="center" sx={{ color: '#64CCC5', pt: 2 }}>
        Our Location
      </Typography>
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-35.5083826570206, -33.85349608260363, 0],
          scale: 1200
        }}
        style={{ width: '100%', height: '400px' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#D6D6DA" stroke="#FFFFFF" />
            ))
          }
        </Geographies>
        <Marker coordinates={[35.5083826570206, 33.85349608260363]}>
          <circle r={10} fill="#FF5533" />
        </Marker>
      </ComposableMap>
    </Box>
  );
};

export default SimpleMap;
