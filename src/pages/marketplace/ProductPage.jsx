import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productService } from "@/services/product.service";
import { marketplaceService } from "@/services/marketplace.service";
import { ProductDetail } from "@/components/product/ProductDetail";
import { MarketplaceFooter } from "@/components/layouts/MarketplaceFooter";
function ProductPage() {
  const { productId = "" } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    productService.getById(productId).then(setProduct);
  }, [productId]);
  if (!product) {
    return <div className="pt-24 px-gutter">Product not found.</div>;
  }
  const addToCart = () => {
    const cart = marketplaceService.getInitialCartItems();
    const existing = cart.find((item) => item.id === product.id);
    const nextCart = existing ? cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...cart, {
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.image,
      quantity: 1,
      unitPrice: product.priceValue
    }];
    marketplaceService.setCartItems(nextCart);
    navigate("/marketplace/cart");
  };
  return <><ProductDetail product={product} onAddToCart={addToCart} /><MarketplaceFooter /></>;
}
export {
  ProductPage
};
