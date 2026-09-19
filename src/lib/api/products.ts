import { Product, ProductsResponse } from "@/types/Products";

const API_URL = "https://dummyjson.com";

async function fetchWithTimeout(
  url: string,
  timeout = 10000
): Promise<Response> {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    return response;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(
        "Request timed out. Please check your internet connection."
      );
    }

    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export async function getProducts(
  search: string,
  limit: number,
  skip: number
): Promise<ProductsResponse> {
  const endpoint = search.trim()
    ? `${API_URL}/products/search?q=${encodeURIComponent(
        search
      )}&limit=${limit}&skip=${skip}`
    : `${API_URL}/products?limit=${limit}&skip=${skip}`;

  const response = await fetchWithTimeout(endpoint);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products. Server returned ${response.status}.`
    );
  }

  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const endpoint = `${API_URL}/products/${id}`;

  const response = await fetchWithTimeout(endpoint);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product. Server returned ${response.status}.`
    );
  }

  return response.json();
}