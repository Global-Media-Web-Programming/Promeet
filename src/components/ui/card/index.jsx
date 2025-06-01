import React from 'react';
import styles from './style';
import PropTypes from 'prop-types';

const Card = ({ title, subtitle, dday, avatars }) => {
  return (
    <div style={styles.container}>
      <div style={styles.bgMain}></div>
      <div style={styles.lightEffect}></div>

      <div style={styles.title}>{title}</div>
      <div style={styles.subtitle}>{subtitle}</div>
      <div style={styles.dday}>{dday}</div>

      {avatars.map((src, i) => (
        <img key={i} style={styles.avatar(25 + i * 21)} src={src} alt={`user${i + 1}`} />
      ))}
    </div>
  );
};
Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  dday: PropTypes.number,
  avatars: PropTypes.arrayOf(PropTypes.string),
};
export default Card;
