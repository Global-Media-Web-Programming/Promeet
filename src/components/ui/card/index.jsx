//card을 위해 만든 페이지
import React from 'react';
import styles from './CardStyle';

const Card = () => {
  return (
    <div style={styles.container}>
      <div style={styles.bgMain}></div>
      <div style={styles.bgOverlay}></div>
      <div style={styles.lightEffect}></div>

      <div style={styles.title}>웹플밍 팀플</div>
      <div style={styles.subtitle}>18:00 정보과학관 1층</div>
      <div style={styles.dday}>D-DAY</div>

      <img style={styles.avatar(25)} src="https://placehold.co/32x32" alt="user1" />
      <img style={styles.avatar(46)} src="https://placehold.co/32x32" alt="user2" />
      <img style={styles.avatar(67)} src="https://placehold.co/32x32" alt="user3" />
    </div>
  );
};

export default Card;
