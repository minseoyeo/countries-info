import { FaEarthAsia } from "react-icons/fa6";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Search = () => {
  return (
    <Wrapper>
      <Logo to={'/'}>
        <FaEarthAsia/>
        <h3>Countries Info</h3>
      </Logo>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;

  div {
    display: flex;
    align-items: center;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  h3 {
    font-size: 43px;
    color: #000;
  }

  svg {
    color: rgb(0, 12, 255);
    font-size: 40px;
    margin-right: 8px;
  }
`;

export default Search