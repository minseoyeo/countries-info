import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";


const SeeMore = () => {
  const [ regionData, setRegionData ] = useState([]);
  const params = useParams();

  useEffect(() => {
    const getRegion = async () => {
      const check = localStorage.getItem(`region-${params.regionName}`);

      if (check) {
        setRegionData(JSON.parse(check));
      } else {
        try {
          const api = await fetch(`https://restcountries.com/v3.1/region/${params.regionName}`);
          const data = await api.json();
  
          localStorage.setItem(`region-${params.regionName}`, JSON.stringify(data));
          setRegionData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    getRegion();
  }, [params.regionName])

  return (
    <Wrapper>
      <h2>All countries in {params.regionName}</h2>
      <CardContainer>
        {Array.isArray(regionData) &&
          regionData.map((countryData) => (
          <Card to={`/country/${countryData.name.common}`}>
            {countryData.flags && countryData.flags.svg && (
              <img src={countryData.flags.svg} alt={countryData.name.common}/>
            )}
            <h3>{countryData.name.common}</h3>
          </Card>
        ))}
      </CardContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 2rem 0.5rem;

  h2 {
    font-size: 40px;
    color: black;
    text-align: right;
    margin-right: 3rem;

    @media (min-width: 640px) {
      font-size: 45px;
    }

    @media (min-width: 1024px) {
      font-size: 50px;
    }
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 2rem 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(Link)`
  text-decoration: none;
  padding: 1.5rem;
  margin: 1.5rem 1.5rem;
  border-radius: 0.5rem;
  transition: box-shadow 0.2s ease;
  background-color: rgba(165, 221, 255, 0.3);

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }

  img {
    width: 100%;
  }

  h3 {
    color: #323232;
    font-size: 23px;
    margin-top: 0.5rem;
    text-align: center;
  }
`;

export default SeeMore