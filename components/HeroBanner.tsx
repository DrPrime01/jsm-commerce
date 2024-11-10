import { urlFor } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HeroBanner({ banner }: { banner: any }) {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{banner?.smallText}</p>
        <h3>{banner.midText}</h3>
        <h1>{banner.largeText1}</h1>
        <Image
          src={urlFor(banner?.image).url()}
          width={450}
          height={450}
          alt=""
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${banner?.product}`}>
            <button type="button">{banner?.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{banner?.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
