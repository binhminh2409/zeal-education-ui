import React from 'react';
import Player from 'react-player';

const videoUrl = "https://localhost:7096/api/course/resources/0F25849F_1_1.mp4"
const test = ({ }) => {
  return (
    <div>
      {/* Other course details */}
      <Player url={videoUrl} controls width="560px" height="315px" />
    </div>
  );
};

export default test;