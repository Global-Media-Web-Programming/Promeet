import React, { useState } from 'react';
import PropTypes from 'prop-types';

const InputBox = ({ label, placeholder, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Label */}
      <div
        style={{
          left: '0px',
          top: '0px',
          position: 'absolute',
          color: '#848A94',
          fontSize: '14px',
          fontFamily: 'Pretendard',
          fontWeight: 400,
          lineHeight: '14px',
        }}
      >
        {label}
      </div>

      {/* Input field */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '327px',
          height: '64px',
          padding: '20px',
          position: 'absolute',
          top: '30px',
          left: '0px',
          borderRadius: '16px',
          border: `1px solid ${isFocused ? '#40B59F' : '#E9F1FF'}`,
          outline: 'none',
          fontSize: '18px',
          fontFamily: 'Poppins',
          fontWeight: 500,
          color: '#000',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s ease-in-out',
        }}
      />
    </div>
  );
};

InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default InputBox;
