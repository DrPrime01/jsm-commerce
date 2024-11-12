/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/client";

function DisplayImage({ image }: { image: any }) {
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="image-container">
        <Image
          src={urlFor(image && image[index]).url()}
          alt=""
          width={400}
          height={400}
          className="product-detail-image"
        />
        <div className="small-images-container">
          {image?.map((item: any, i: number) => (
            <Image
              key={i}
              src={urlFor(item).url()}
              width={70}
              height={70}
              alt=""
              className={
                i === index ? "small-image selected-image" : "small-image"
              }
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default DisplayImage;
