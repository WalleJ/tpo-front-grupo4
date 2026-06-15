import { useState } from "react";
const ASSISTANT_LABELS = {
  alexa: "AI Voice",
  siri: "AI Voice",
  google: "AI Assistant"
};
function getHubLabel(product) {
  if (product.connectivityKeys.includes("zigbee") && product.connectivityKeys.includes("matter")) return "Zigbee / Matter";
  if (product.connectivityKeys.includes("zigbee")) return "Zigbee Hub";
  if (product.connectivityKeys.includes("thread") && product.connectivityKeys.includes("matter")) return "Thread / Matter";
  if (product.connectivityKeys.includes("matter")) return "Matter Hub";
  if (product.categoryKey === "streaming") return "Media Hub";
  if (product.categoryKey === "display") return "Display Hub";
  return "Voice Hub";
}
function getAssistantLabel(product) {
  return ASSISTANT_LABELS[product.assistantKey] ?? product.assistantKey;
}
function ProductSlider({ title, products, onSelect }) {
  const [index, setIndex] = useState(0);
  if (!products.length) return null;
  const next = () => setIndex((prev2) => (prev2 + 1) % products.length);
  const prev = () => setIndex((prev2) => (prev2 - 1 + products.length) % products.length);
  return <div className="relative group"><div className="flex justify-between items-center mb-md"><h4 className="font-headline-md text-headline-md">{title}</h4><div className="flex gap-xs"><button
    className="prev-btn p-2 rounded-full border border-outline-variant/30 hover:bg-primary/5 transition-colors inline-flex items-center justify-center"
    onClick={prev}
    aria-label={`Previous products in ${title}`}
  ><span className="material-symbols-outlined text-[20px] text-primary leading-none">chevron_left</span></button><button
    className="next-btn p-2 rounded-full border border-outline-variant/30 hover:bg-primary/5 transition-colors inline-flex items-center justify-center"
    onClick={next}
    aria-label={`Next products in ${title}`}
  ><span className="material-symbols-outlined text-[20px] text-primary leading-none">chevron_right</span></button></div></div><div className="slider-container flex gap-md overflow-x-auto snap-x snap-mandatory pb-4">{products.map((product, i) => <button
    key={product.id}
    onClick={() => onSelect(product.id)}
    className={`text-left slider-item min-w-[320px] md:min-w-[400px] snap-center glass-panel-white rounded-2xl p-md border border-outline-variant/30 shadow-sm hover:border-primary/50 transition-colors ${i === index ? "" : "opacity-60"}`}
  ><div className="aspect-video rounded-xl bg-surface-container mb-md overflow-hidden"><img alt={product.title} className="w-full h-full object-cover" src={product.image} /></div><h5 className="font-headline-sm mb-xs">{product.title}</h5><p className="text-body-sm text-on-surface-variant">{product.description}</p><div className="grid grid-cols-2 gap-sm border-t border-outline-variant/20 pt-sm mt-sm"><div className="space-y-[2px]"><p className="text-[10px] uppercase font-bold text-on-surface-variant opacity-60 tracking-wide">ASSISTANT</p><p className="text-body-sm font-medium text-on-surface">{getAssistantLabel(product)}</p></div><div className="space-y-[2px]"><p className="text-[10px] uppercase font-bold text-on-surface-variant opacity-60 tracking-wide">HUB</p><p className="text-body-sm font-medium text-on-surface">{getHubLabel(product)}</p></div></div></button>)}</div></div>;
}
export {
  ProductSlider
};
