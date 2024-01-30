import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Info = () => {
  
  const [ basicInfos, setbasicInfos ] = useState({});

  const { name, langCode, currencyCode } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await response.json();
  
        setbasicInfos({
          ...data[0],
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [name, langCode, currencyCode]);

  const getNativeName = (type) => {
    if (basicInfos.name?.nativeName) {
      const nativeNames = Object.values(basicInfos.name.nativeName).map(originalName => originalName[type]);
      return nativeNames.join(", ");
    }
    return "";
  };
  
  const getCurrencies = (type) => {
    if (basicInfos.currencies) {
      const currencyNames = Object.values(basicInfos.currencies).map(currency => currency[type]);
      return currencyNames.join(", ");
    }
    return "";
  }

  const nativeOfficialName = getNativeName("official");
  const nativeCommonName = getNativeName("common");
  
  const currencyName = getCurrencies("name");
  const currencySymbol = getCurrencies("symbol");

  return (
    <Wrapper>
      {basicInfos.name ? (
        <ContentBox>
          <header>
            <h1>{basicInfos.name.common}</h1>
            <h1>{nativeCommonName}</h1>
          </header>
          <section>
            <img src={basicInfos.flags.svg} alt={basicInfos.name.common} />
          </section>
          <aside>
            <div>
              <h4>Official Name:</h4>
              <h4>Offical Native Name:</h4>
              <h4>Official Language(s):</h4>
              <h4>Currency:</h4>
              <h4>Capital:</h4>
              <h4>Population:</h4>
            </div>
            <div>
              <p>{basicInfos.name.official}</p>
              <p>{nativeOfficialName}</p>
              <p>{basicInfos.languages ? Object.values(basicInfos.languages).join(", ") : ""}</p>
              <p>{currencyName} ({currencySymbol})</p>
              <p>{basicInfos.capital}</p>
              <p>{basicInfos.population}</p>
            </div>
          </aside>
        </ContentBox>
      ) : (
        <h3>Loading...</h3>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 1.5rem;

  h3 {
    font-size: 70px;
    text-align: center;
  }
`;

const ContentBox = styled.div`
  padding: 2.5rem 2rem;
  display: grid;
  grid-template-columns: repeat(1fr, 3);
  gap: 20px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: rgba(0, 12, 255, 0.03);

  @media (min-width: 768px) {
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr 1fr;
  }
  
  header {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 768px) {
      grid-column: span 2;
      margin: 0 2rem;
    }
  }

  h1 {
    font-size: 34px;
    margin-right: 2rem;

    @media (min-width: 640px) {
      font-size: 40px;
    }
  }

  img {
    margin-top: 1rem;
    min-height: 10rem;
    width: 70%;

    @media (min-width: 768px) {
      grid-column: span 2;
    }
  }

  section {
    text-align: center;

    @media (min-width: 768px) {
      grid-column: span 1;
      margin-top: 2rem;
    }
  }

  aside {
    display: flex;
    align-items: center;

    @media (min-width: 768px) {
      grid-column: span 1;
    }
  }

  div {
    margin-left: 2rem;
  }

  h4 {
    font-size: 20px;
    margin-top: 1rem;

    @media (min-width: 640px) {
      font-size: 23px;
    }
  }

  p {
    margin-top: 1rem;
    font-size: 19px;
    font-weight: 600;
    color: #323232;

    @media (min-width: 640px) {
      font-size: 21px;
    }

    @media (min-width: 768px) {
      margin-top: 1.4rem;
    }
  }
`;


export default Info