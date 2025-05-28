import PropTypes from 'prop-types';
import MapContainer from '../MapContainer';
import MarkerManager from '../MarkerManager';
import { Category } from '@/constants/place';

const FinalPlaceMap = ({ placeData }) => {
  return (
    <MapContainer lat={placeData.position.La} lng={placeData.position.Ma}>
      <MarkerManager markers={placeData} />
    </MapContainer>
  );
};

FinalPlaceMap.propTypes = {
  placeData: PropTypes.shape({
    position: PropTypes.shape({
      La: PropTypes.number.isRequired,
      Ma: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.string,
    type: PropTypes.oneOf(Object.values(Category)),
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    link: PropTypes.string,
    isLiked: PropTypes.bool,
    likesCount: PropTypes.number,
  }).isRequired,
};

export default FinalPlaceMap;
