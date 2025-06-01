const styles = {
  container: {
    width: '500px',
    height: '150px',
    position: 'relative',
  },
  bgMain: {
    width: '60%',
    height: '100%',
    position: 'absolute',
    top: '0px',
    left: '0px',
    background: '#40B59F ',
    borderRadius: '16px',
  },

  lightEffect: {
    width: '432.92px',
    height: '100%',
    position: 'absolute',
    top: '-34.82px',
    left: '-42.90px',
    background: 'rgba(185, 232, 255, 0.10)',
  },
  title: {
    position: 'absolute',
    top: '26px',
    left: '23px',
    color: 'white',
    fontSize: '20px',
    fontFamily: 'Pretendard Variable',
    fontWeight: 600,
    lineHeight: '18px',
  },
  subtitle: {
    position: 'absolute',
    top: '56px',
    left: '23px',
    color: '#FEFFFF',
    fontSize: '15px',
    fontFamily: 'Pretendard Variable',
    fontWeight: 400,
    lineHeight: '12px',
  },
  dday: {
    position: 'absolute',
    top: '106px',
    left: '200px',
    width: '84px',
    color: 'white',
    fontSize: '24px',
    fontFamily: 'Jalnan2',
    fontWeight: 400,
    lineHeight: '12px',
  },

  avatar: (left) => ({
    width: '32px',
    height: '32px',
    position: 'absolute',
    top: '94px',
    left: `${left}px`,
    borderRadius: '9999px',
    outline: '1px solid white',
  }),
};

export default styles;
