import React, { useState } from 'react';
import MainPageLayout from '../Components/MainPageLayout';
import { apiGet } from '../misc/config';

export const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShows = searchOption === 'shows';

  const onInputChange = ev => setInput(ev.target.value);

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
    console.log(searchOption);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
      console.log(result);
    });
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>`No Results :</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <div>
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      ) : (
        <div>
          {results.map(item => (
            <div key={item.person.id}>{item.person.name}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for Movie"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
        checked={isShows}
      />

      <div>
        <label htmlFor="show-search">
          Shows
          <input
            type="radio"
            id="show-search"
            value="shows"
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="actor-search">
          Actors{' '}
          <input
            type="radio"
            id="actor-search"
            value="people"
            onChange={onRadioChange}
            checked={!isShows}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};
