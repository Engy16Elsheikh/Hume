"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ProductCard from "@/components/ProductCard";

import { getProducts } from "@/lib/api/products";

const PRODUCTS_PER_PAGE = 10;

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /*
   * Wait 400ms after the user stops typing
   * before sending the search request.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  /*
   * Calculate the number of products to skip
   * based on the current page.
   */
  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  /*
   * React Query handles:
   * - fetching
   * - caching
   * - loading
   * - errors
   * - refetching
   */
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", search, page],

    queryFn: () =>
      getProducts(
        search,
        PRODUCTS_PER_PAGE,
        skip
      ),

    staleTime: 1000 * 60 * 5,

    retry: 1,
  });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;

  const totalPages = Math.ceil(
    total / PRODUCTS_PER_PAGE
  );

  /*
   * Go to previous page.
   */
  const handlePrevious = () => {
    setPage((currentPage) =>
      Math.max(currentPage - 1, 1)
    );
  };

  /*
   * Go to next page.
   */
  const handleNext = () => {
    setPage((currentPage) =>
      Math.min(
        currentPage + 1,
        totalPages
      )
    );
  };

  return (
    <main className="container">

      {/* =========================
          PAGE HEADER
      ========================== */}
      <section className="hero">
        <h1>Products</h1>

        <p>
          Browse products using React Query,
          search, and pagination.
        </p>
      </section>

      {/* =========================
          SEARCH
      ========================== */}
      <section className="section">
        <h2>Search Products</h2>

        <Input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(event) =>
            setSearchInput(event.target.value)
          }
        />
      </section>

      {/* =========================
          INITIAL LOADING
      ========================== */}
      {isLoading && (
        <section className="section">
          <div className="click-message">
            Loading products...
          </div>
        </section>
      )}

      {/* =========================
          ERROR
      ========================== */}
      {isError && (
        <section className="section">
          <div className="click-message">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading products."}
          </div>
        </section>
      )}

      {/* =========================
          EMPTY RESULT
      ========================== */}
      {!isLoading &&
        !isError &&
        products.length === 0 && (
          <section className="section">
            <div className="click-message">
              No products found.
            </div>
          </section>
        )}

      {/* =========================
          PRODUCTS
      ========================== */}
      {!isError &&
        !isLoading &&
        products.length > 0 && (
          <section className="section">

            {/* Loading indicator while changing
                page/search */}
            {isFetching && (
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                Updating products...
              </div>
            )}

            {/* Product Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {/* =========================
                PAGINATION
            ========================== */}
            {totalPages > 0 && (
              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Button
                  text="Previous"
                  onClick={handlePrevious}
                  variant="secondary"
                  disabled={page === 1}
                />

                <span>
                  Page {page} of {totalPages}
                </span>

                <Button
                  text="Next"
                  onClick={handleNext}
                  variant="primary"
                  disabled={
                    page >= totalPages
                  }
                />
              </div>
            )}

          </section>
        )}

    </main>
  );
}