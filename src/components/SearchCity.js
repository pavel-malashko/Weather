import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import getWeather from '../api/getWeather';
import allCities from '../cities.json';
import device from '../responsive/Device';

const autocorrect = require('autocorrect')({ words: allCities.map(data => data.name) });

const SearchBar = styled.form`
  top: ${({ showResult }) => (showResult ? '0%' : '30%')};
  position: relative;
  margin: 0 auto;
  max-width: 500px;
  transition: 0.8s 0.5s;
  @media ${device.laptopL} {
    max-width: 600px;
  }
  @media ${device.desktop} {
    max-width: 700px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 15px 10px 40px;
  color: #c5c5c5;
  transition: 0.2s;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    padding: 15px 20px 15px 45px;
    border-radius: 30px;
  }
  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

const SearchIcon = styled.span`
  display: block;
  position: absolute;
  top: 50%;
  left: 22px;
  transform: translate(-50%, -50%);
  height: 14px;
  width: 14px;
  font-size: 14px;
  color: #c5c5c5;
  @media ${device.tablet} {
    height: 15px;
    width: 15px;
    font-size: 15px;
  }
  @media ${device.laptop} {
    height: 16px;
    width: 16px;
    font-size: 16px;
  }
`;

const AutoValueTitle = styled.h3`
  top: ${({ showResult }) => (showResult ? '0%' : '30%')};
  display: block;
  height: 15px;
  margin: 0;
  padding: 20px 0;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 400;
  color: #ffffff;
  transition: 0.3s 1.4s;
  opacity: ${({ autoValue }) => (autoValue ? 1 : 0)};

  ${({ secondary }) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 15px;
    text-align: center;
    transition: .5s;
    @media ${device.tablet} {
      font-size: 10px;
    }
    @media ${device.laptop} {
      font-size: 15px;
    }
    @media ${device.laptopL} {
      font-size: 20px;
    }
    @media ${device.desktop} {
      font-size: 25px;
    }
    
  `}

  ${({ autoValue }) =>
    autoValue &&
    `
    opacity: 0;
    visibility: hidden;
    top: 20%;
  `}
`;

const SearchCity = ({ showResult }) => {
  const [value, setValue] = useState('');
  const [autoValue, setAutoValue] = useState('');

  const dispatch = useDispatch();
  const getCities = () => {
    return JSON.parse(localStorage.getItem('cities')) || [];
  };
  const handleInputChange = e => {
    setValue(e.target.value);
    if (e.target.value) {
      setAutoValue(autocorrect(e.target.value));
    } else {
      setAutoValue('');
    }
  };

  const handleSearchCity = e => {
    e.preventDefault();
    if (value.trim()) {
      dispatch(getWeather(getCities(), value));
      setAutoValue('');
    }
  };

  return (
    <>
      <SearchBar showResult={showResult} onSubmit={handleSearchCity}>
        <SearchInput
          type="text"
          value={value}
          list="cities"
          placeholder="Enter city"
          onChange={handleInputChange}
        />
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
        <datalist id="cities">
          {getCities().map(item => (
            <option key={item.key}>{item.value}</option>
          ))}
        </datalist>
      </SearchBar>
      <AutoValueTitle secondary autoValue={!autoValue} showResult={showResult}>
        maybe you mean the name of the city - {autoValue}
      </AutoValueTitle>
    </>
  );
};

SearchCity.propTypes = {
  showResult: PropTypes.bool.isRequired,
};

export default SearchCity;
