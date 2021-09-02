import React from 'react';
import './ListDropDown.css';

export const ListDropDown = ({ results, className }) => {
  return (
    <div className={`list ${className}`}>
      {results.map((result) => (
        <a key={result.id} href={result.html_url} className='list__item' target='_blank'>
          <div className='avatar-wrapper'>
            <img src={result.avatar_url} alt={result.login} className='avatar' />
          </div>
          <h4>{result.login}</h4>
        </a>
      ))}
    </div>
  );
};

export default ListDropDown;
