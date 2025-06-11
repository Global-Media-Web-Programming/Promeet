import * as S from './style';
import PropTypes from 'prop-types';
import PlaceCardList from '@/components/promise/place/PlaceCardList';
import PlaceLikeToggle from '@/components/promise/place/PlaceLikeToggle';
import MarkerManager from '../MarkerManager';
import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';
import useSearchPlace from './hooks/useSearchPlace';
import { CATEGORY } from '@/constants/place';
import { MAP_BS_ID } from '@/constants/map';

const SearchPlace = ({ category }) => {
  const {
    descText,
    btnText,
    places,
    // routes,
    myLocation,
    isLoading,
    isLikeList,
    canFix,
    handleNextBtnClick,
  } = useSearchPlace(category);

  // 임시 데이터
  const routes = [
    {
      name: '김여진',
      userId: 'user01',
      route: [
        {
          station: {
            order: 1,
            type: 'normal',
            name: '강남역 2호선',
            position: { lat: 37.4979, lng: 127.0276 },
          },
          duration: 5,
        },
        {
          station: {
            order: 2,
            type: 'transfer',
            name: '고속터미널역 7호선',
            position: { lat: 37.503, lng: 127.0048 },
          },
          duration: 13,
        },
        {
          station: {
            order: 3,
            type: 'normal',
            name: '숭실대입구역 7호선',
            position: { lat: 37.4967, lng: 126.9538 },
          },
          duration: 12,
        },
      ],
    },
    {
      name: '장태빈',
      userId: 'user02',
      route: [
        {
          station: {
            order: 1,
            type: 'normal',
            name: '홍대입구역 2호선',
            position: { lat: 37.5572, lng: 126.9245 },
          },
          duration: 6,
        },
        {
          station: {
            order: 2,
            type: 'transfer',
            name: '대림역 7호선',
            position: { lat: 37.4926, lng: 126.8955 },
          },
          duration: 16,
        },
        {
          station: {
            order: 3,
            type: 'normal',
            name: '숭실대입구역 7호선',
            position: { lat: 37.4967, lng: 126.9538 },
          },
          duration: 11,
        },
      ],
    },
    {
      name: '홍준우',
      userId: 'user03',
      route: [
        {
          station: {
            order: 1,
            type: 'normal',
            name: '서울역 1호선',
            position: { lat: 37.5547, lng: 126.9706 },
          },
          duration: 7,
        },
        {
          station: {
            order: 2,
            type: 'transfer',
            name: '노량진역 9호선',
            position: { lat: 37.5133, lng: 126.9425 },
          },
          duration: 9,
        },
        {
          station: {
            order: 3,
            type: 'transfer',
            name: '고속터미널역 7호선',
            position: { lat: 37.503, lng: 127.0048 },
          },
          duration: 8,
        },
        {
          station: {
            order: 4,
            type: 'normal',
            name: '숭실대입구역 7호선',
            position: { lat: 37.4967, lng: 126.9538 },
          },
          duration: 12,
        },
      ],
    },
  ];

  return (
    <>
      <MarkerManager markers={[...places, ...(myLocation ? [myLocation] : [])]} routes={routes} />
      <BottomSheet id={MAP_BS_ID}>
        <S.ListContainer>
          <PlaceLikeToggle />
          <PlaceCardList
            places={places}
            isLoading={isLoading}
            emptyText={isLikeList ? '좋아요한 장소가 없어요' : '주변 장소가 없어요'}
          />
        </S.ListContainer>
      </BottomSheet>
      <S.NextBtnContainer>
        <S.Descriptrtion>{descText}</S.Descriptrtion>
        <Button onClick={handleNextBtnClick} disabled={!canFix}>
          {btnText}
        </Button>
      </S.NextBtnContainer>
    </>
  );
};

SearchPlace.propTypes = {
  category: PropTypes.oneOf(Object.values(CATEGORY)).isRequired,
};

export default SearchPlace;
