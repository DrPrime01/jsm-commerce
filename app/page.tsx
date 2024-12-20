/* eslint-disable @typescript-eslint/no-explicit-any */
import FooterBanner from "@/components/FooterBanner";
import HeroBanner from "@/components/HeroBanner";
import Product from "@/components/Product";
import { client } from "@/lib/client";

export default async function Home() {
  const query = `*[_type=="product"]`;
  const products = await client.fetch(query);

  const bannerQuery = `*[_type=="banner"]`;
  const banner = await client.fetch(bannerQuery);
  return (
    <>
      <HeroBanner banner={banner?.length && banner[0]} />
      <div className="products-heading">
        <h2 className="">Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product: any) => (
          <Product key={product?._id} product={product} />
        ))}
      </div>
      <FooterBanner banner={banner && banner[0]} />
    </>
  );
}

export const revalidate = 60;
