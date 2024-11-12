/* eslint-disable @typescript-eslint/no-explicit-any */
import Product from "@/components/Product";
import { client } from "@/lib/client";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import DisplayImage from "./widgets/DisplayImage";
import QuantityButtons from "./widgets/QuantityButtons";

async function ProductDetails({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == "product"]`;
  const product = await client.fetch(productQuery);
  const products = await client.fetch(productsQuery);
  const { image, name, details, price } = product;
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <DisplayImage image={image} />
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div className="flex">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <QuantityButtons product={product} />
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item: any) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

export const dynamicParams = true;

export async function generateStaticParams() {
  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  return products.map((product: any) => ({
    slug: String(product?.name),
  }));
}
