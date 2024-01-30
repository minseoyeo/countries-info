import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const Region = ({ regionName }) => {
  const [region, setRegion] = useState([]);

  useEffect(() => {
    const getRegion = async () => {
      const check = localStorage.getItem(`region-${regionName}`);

      if (check) {
        setRegion(JSON.parse(check));
      } else {
        const api = await fetch(`https://restcountries.com/v3.1/region/${regionName}`);
        const data = await api.json();

        localStorage.setItem(`region-${regionName}`, JSON.stringify(data));
        setRegion(data);
      }
    };

    getRegion();
  }, [regionName]);

  return (
    <Wrapper>
      <Header>
        <h3>{regionName}</h3>
        <SeeMoreLink to={`/see-more/${regionName}`}>See More</SeeMoreLink>
      </Header>

      <CardContainer>  
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drage: "false",
            gap: "2.5rem",
          }}
        >
          {Array.isArray(region) &&
            region.map((countryData) => {
              const countryName = countryData.name.common;
              return (
                <SplideSlide key={countryName.cca3}>
                  <Card>
                    <Link to={`/country/${countryName}`}>
                      <img src={countryData.flags.svg} alt={countryName} />
                      <p>{countryName}</p>
                    </Link>
                  </Card>
                </SplideSlide>
              );
            })}
        </Splide>
      </CardContainer>
    </Wrapper>
    
  );
};

const Wrapper = styled.div`
  padding: 2rem 0.5rem;
  margin: 3rem 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px;
  border-radius: 5px;
  background-color: rgba(0, 174, 255, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
  margin-bottom: 2rem;

  h3 {
    font-size: 30px;
    cursor: default;
  }
`;

const SeeMoreLink = styled(Link)`
  color: #323232;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: #456ce2;
    text-decoration: underline;
  }
`;

const CardContainer = styled.div`
  @media (min-width: 768px) {
    margin-top: 0.5rem;
    padding: 0rem 2rem;
  }
  @media (min-width: 1024px) {
    padding: 0rem 3rem;
  }
`;


const Card = styled.div`
  min-height: 8rem;
  overflow: hidden;
  position: relative;
  border-radius: 15px;

  @media (min-width: 768px) {
    min-height: 13rem;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  p {
    position: absolute;
    z-index: 10;
    right: 10px;
    bottom: 5px;
    color: black;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    text-align: center;

    @media (min-width: 640px) {
      font-size: 20px;
      bottom: -3px;
    }

    @media (min-width: 1024px) {
      font-size: 23px;
      bottom: 5px;
    }
  }
`;

export default Region;
