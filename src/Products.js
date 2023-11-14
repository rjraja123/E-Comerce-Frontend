import styled from "styled-components";
import FilterSection from "./components/FilterSection";
import Sort from "./components/Sort";
import ProductList from "./components/ProductList";
import { useNavigate } from "react-router-dom";
import React,{useEffect} from "react";


const Products = () => {
  const navigate = useNavigate();
  // const history = navigate();

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem("id"); // Replace 'yourToken' with your actual token key

    // If not logged in, redirect to signup page
    if (!isLoggedIn) {
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <Wrapper>
      <div className="container grid grid-filter-column">
        <div>
          <FilterSection />
        </div>
        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-product">
            <ProductList />
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;
