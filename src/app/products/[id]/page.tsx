"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/ui/Button";
import { getProduct } from "@/lib/api/products";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();

  const id = params?.id;

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],

    queryFn: () => {
      if (!id) {
        throw new Error("Product ID is missing");
      }

      return getProduct(id);
    },

    enabled: Boolean(id),

    staleTime: 1000 * 60 * 5,
  });

  /*
   * =========================
   * LOADING
   * =========================
   */

  if (isLoading) {
    return (
      <main className="container">
        <section className="section">
          <div className="click-message">
            Loading product...
          </div>
        </section>
      </main>
    );
  }

  /*
   * =========================
   * ERROR
   * =========================
   */

  if (isError) {
    return (
      <main className="container">
        <section className="section">
          <div className="click-message">
            {error instanceof Error
              ? error.message
              : "Failed to load product."}
          </div>

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <Link href="/">
              <Button
                text="Back to Products"
                onClick={() => {}}
                variant="secondary"
              />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /*
   * =========================
   * PRODUCT NOT FOUND
   * =========================
   */

  if (!product) {
    return (
      <main className="container">
        <section className="section">
          <div className="click-message">
            Product not found.
          </div>

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <Link href="/">
              <Button
                text="Back to Products"
                onClick={() => {}}
                variant="secondary"
              />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /*
   * =========================
   * PRODUCT DETAILS
   * =========================
   */

  return (
    <main className="container">
      {/* BACK BUTTON */}

      <section
        style={{
          marginBottom: "20px",
        }}
      >
        <Link href="/">
          <Button
            text="← Back to Products"
            onClick={() => {}}
            variant="secondary"
          />
        </Link>
      </section>

      {/* PRODUCT */}

      <section className="section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {/* PRODUCT IMAGE */}

          <div>
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={600}
              height={500}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                objectFit: "contain",
                borderRadius: "10px",
              }}
            />
          </div>

          {/* PRODUCT INFORMATION */}

          <div>
            {/* CATEGORY */}

            <span
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: "20px",
                background: "#f1f1f1",
                fontSize: "13px",
                marginBottom: "15px",
              }}
            >
              {product.category}
            </span>

            {/* TITLE */}

            <h1>{product.title}</h1>

            {/* DESCRIPTION */}

            <p
              style={{
                marginTop: "15px",
                lineHeight: "1.7",
              }}
            >
              {product.description}
            </p>

            {/* PRICE */}

            <div
              style={{
                marginTop: "25px",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              ${product.price}
            </div>

            {/* PRODUCT INFO */}

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span>
                ⭐ Rating: {product.rating}
              </span>

              <span>
                Stock: {product.stock}
              </span>

              <span>
                Brand: {product.brand}
              </span>

              <span>
                Discount:{" "}
                {product.discountPercentage}%
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}