import React from 'react';
import IMG_PLACEHOLDER from '../../Assets/not-found.png';
import { Star } from '../styled';
import { MainDataWrapper } from './ShowMainData.styled';

// ShowMainData.js
const ShowMainData = ({ name, rating, summary, tags, image }) => {
  return (
    <MainDataWrapper>
      <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
      <div className="text-side">
        <div className="Headline">
          <h1>{name}</h1>
          <div>
            <Star />
            <span>{rating.average || 'N/A'}</span>
          </div>
        </div>
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        />

        <div>
          Tags:{' '}
          <div className="Tag-list">
            {tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </MainDataWrapper>
  );
};

export default ShowMainData;
