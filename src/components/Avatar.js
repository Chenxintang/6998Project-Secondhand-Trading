import React from 'react';
// import PropTypes from 'utils/propTypes';
import classNames from 'classnames';
// import userImage from '../../public/userAvatar.JPG';

const Avatar = ({
  rounded,
  circle,
  src,
  size,
  tag: Tag,
  className,
  style,
  ...restProps
}) => {
const classes = classNames({ 'rounded-circle': circle, rounded }, className);
  return (
    <Tag
      src={src}
      style={{ width: size, height: size, ...style }}
      className={classes}
      {...restProps}
    />
  );
};

Avatar.defaultProps = {
  tag: 'img',
  rounded: false,
  circle: true,
  size: 35,
  src: 'https://portrait.s3.amazonaws.com/IMG_4576(20200321-223824)+(2).JPG',
  style: {},
};

export default Avatar;
