import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import device from '../responsive/Device';
import NotFound from './NotFound';
import Result from './Result';
import SearchCity from './SearchCity';

const AppTitle = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  color: #ffffff;
  transition: 0.3s 1.4s;
  opacity: ${({ showLabel }) => (showLabel ? 1 : 0)};

  ${({ secondary }) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: .5s;
    @media ${device.tablet} {
      font-size: 40px;
    }
    @media ${device.laptop} {
      font-size: 50px;
    }
    @media ${device.laptopL} {
      font-size: 60px;
    }
    @media ${device.desktop} {
      font-size: 70px;
    }
    
  `}

  ${({ showResult }) =>
    showResult &&
    `
    opacity: 0;
    visibility: hidden;
    top: 10%;
  `}
`;

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

export default function App() {
  const weatherInfo = useSelector(state => state.weatherInfo);
  const error = useSelector(state => state.error);
  return (
    <>
      <AppTitle showLabel={(weatherInfo || error) && true}>Weather app</AppTitle>
      <WeatherWrapper>
        <AppTitle secondary showResult={(weatherInfo || error) && true}>
          Weather app
        </AppTitle>
        <SearchCity showResult={(weatherInfo || error) && true} />
        {weatherInfo && <Result weather={weatherInfo} />}
        {error && <NotFound error={error} />}
      </WeatherWrapper>
    </>
  );
}
