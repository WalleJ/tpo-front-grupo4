import { useEffect, useState } from "react";
import { productService } from "@/services/product.service";
import { HeroSection } from "@/components/marketplace/HeroSection";
import { SummaryStatsSection } from "@/components/marketplace/SummaryStatsSection";
import { FeaturedProducts } from "@/components/marketplace/FeaturedProducts";
import { JustAnnouncedSection } from "@/components/marketplace/JustAnnouncedSection";
import { NewsletterSection } from "@/components/marketplace/NewsletterSection";
import { MarketplaceFooter } from "@/components/layouts/MarketplaceFooter";
function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    productService.list().then(setProducts);
  }, []);
  return <><HeroSection /><SummaryStatsSection products={products} /><FeaturedProducts products={products} /><JustAnnouncedSection products={products} /><NewsletterSection /><MarketplaceFooter /></>;
}
export {
  HomePage
};
