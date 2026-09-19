"use client";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/card";

import { Product } from "@/types/Products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Card
      title={product.title}
      description={product.description}
    >
      <div
        style={{
          marginTop: "15px",
        }}
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={200}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />

        <div
          style={{
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <strong>
            ${product.price}
          </strong>

          <span>
            ⭐ {product.rating}
          </span>

          <span>
            Stock: {product.stock}
          </span>

          <span>
            Category: {product.category}
          </span>

          <Link
            href={`/products/${product.id}`}
            style={{
              textDecoration: "none",
              marginTop: "8px",
            }}
          >
            <Button
              text="View Details"
              onClick={() => {}}
              variant="primary"
            />
          </Link>
        </div>
      </div>
    </Card>
  );
}