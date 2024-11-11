/* eslint-disable @typescript-eslint/no-explicit-any */
import { urlFor } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Product({ product }: { product: any }) {
  const { slug, image, name, price } = product;
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            src={image && urlFor(image[0]).url()}
            width={250}
            height={250}
            alt=""
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;
