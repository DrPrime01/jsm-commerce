/* eslint-disable @typescript-eslint/no-explicit-any */
import { urlFor } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function FooterBanner({ banner }: { banner: any }) {
  const {
    discount,
    largeText1,
    largeText2,
    saleTime,
    buttonText,
    image,
    smallText,
    desc,
    midText,
    product,
  } = banner;
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <Image
            src={urlFor(image).url()}
            alt=""
            width={450}
            height={450}
            className="footer-banner-image"
          />
        </div>
      </div>
    </div>
  );
}

export default FooterBanner;
