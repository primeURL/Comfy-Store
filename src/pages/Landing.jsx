import React from "react";
import { Hero } from "../components";
import { customFetch } from "../utils";
import { FeatuedProducts } from "../components";

const url = "/products?featured=true";

const featuredProductQuery = {
  queryKey : ["featuredProducts"],
  queryFn : () => customFetch(url)
}

export const loader = (queryClient)=>async () => {
  const response = await queryClient.ensureQueryData(featuredProductQuery)
  const products = response.data.data;
  return { products };
};
const Landing = () => {
  return (
    <>
      <Hero />
      <FeatuedProducts/>
    </>
  );
};

export default Landing;
