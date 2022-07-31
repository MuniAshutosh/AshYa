import React from 'react';
import './Engagement.css';
import JsonData from '../data.json';

const Engagement = () => {
  return (
    <>
      <div className="hand_picture"></div>

      <div className="engagement_title">
        <div className="font-country-side font-size-26">Engagement</div>
        <div
          className="font-gabriola font-size-20 subs"
          style={{ marginTop: '-21px' }}
        >
          connecting people
        </div>
      </div>

      <img
        src="/assets/images/rings.gif"
        className="engagment_rings_clank"
        alt=""
      />

      <div className="engagement_location">
        <div className="font-country-side font-size-26"> Location</div>
        <div className="font-gabriola font-size-30 subs">
          {JsonData.pages.Engagement.location}
        </div>
      </div>

      <div className="engagement_time">
        <div className="font-country-side font-size-26"> Time</div>
        <div className="font-gabriola font-size-30 subs">
          {JsonData.pages.Engagement.time}
        </div>
      </div>
    </>
  );
};

export default Engagement;
