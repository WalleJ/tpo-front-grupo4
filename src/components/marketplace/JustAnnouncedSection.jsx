import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
function JustAnnouncedSection({ products }) {
  const navigate = useNavigate();
  const announced = useMemo(() => {
    const byId = new Map(products.map((item) => [item.id, item]));
    return byId.get("homepodMini") ?? products[0] ?? null;
  }, [products]);
  if (!announced) return null;
  return <section className="max-w-[1280px] mx-auto px-gutter py-xl"><div className="glass-panel-white border border-outline-variant/30 rounded-2xl p-lg flex flex-col md:flex-row md:items-center gap-md md:gap-lg shadow-sm"><div className="flex-1"><div className="flex items-center gap-xs mb-sm"><span className="material-symbols-outlined text-primary">new_releases</span><span className="font-label-caps text-label-caps text-primary">JUST ANNOUNCED</span></div><h4 className="font-headline-md mb-xs">New: {announced.title}</h4><p className="font-body-sm text-on-surface-variant">{announced.description}</p></div><button
    onClick={() => navigate(`/marketplace/product/${announced.id}`)}
    className="bg-primary-container text-on-primary-container px-md py-sm rounded-lg font-label-caps text-[10px] hover:shadow-md transition-shadow whitespace-nowrap self-start md:self-auto"
  >
          VIEW OFFER
        </button></div></section>;
}
export {
  JustAnnouncedSection
};
