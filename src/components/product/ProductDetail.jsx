import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "@/utils/formatters";
const PRODUCT_META = {
  homepodMini: {
    processing: "Apple S5",
    connectivity: "Wi-Fi + Thread",
    assistant: "AI Voice",
    ecosystem: "Apple Home",
    technical: { chip: "Apple S5", aiEngine: "Machine Learning", memory: "256MB RAM" },
    connectivityDetails: { wifi: "Wi-Fi 5 (802.11ac)", bluetooth: "Bluetooth 5.0", thread: "Thread 1.0" },
    power: { input: "20W (included adapter)", standby: "1.8W", connector: "Proprietary (Apple)" }
  },
  echo4: {
    processing: "AZ1 Neural Edge",
    connectivity: "Wi-Fi + Zigbee",
    assistant: "Alexa AI",
    ecosystem: "Amazon Alexa",
    technical: { chip: "AZ1 Neural Edge", aiEngine: "On-device NLP", memory: "1GB RAM" },
    connectivityDetails: { wifi: "Dual-band Wi-Fi", bluetooth: "Bluetooth 5.0", thread: "Matter Controller" },
    power: { input: "30W adapter", standby: "2.0W", connector: "Barrel Connector" }
  },
  nestAudio: {
    processing: "Google AI DSP",
    connectivity: "Wi-Fi + BT",
    assistant: "Google AI",
    ecosystem: "Google Home",
    technical: { chip: "Google AI DSP", aiEngine: "Voice Match AI", memory: "512MB RAM" },
    connectivityDetails: { wifi: "Wi-Fi 802.11ac", bluetooth: "Bluetooth 5.0", thread: "Not supported" },
    power: { input: "30W adapter", standby: "1.9W", connector: "Barrel Connector" }
  },
  nestHub2: {
    processing: "ML Display Core",
    connectivity: "Wi-Fi + Matter",
    assistant: "Google AI",
    ecosystem: "Google Home",
    technical: { chip: "ML Display Core", aiEngine: "Sleep Sensing AI", memory: "1GB RAM" },
    connectivityDetails: { wifi: "Wi-Fi 802.11ac", bluetooth: "Bluetooth 5.0", thread: "Matter Ready" },
    power: { input: "15W adapter", standby: "1.7W", connector: "DC barrel" }
  },
  echoShow8: {
    processing: "Octa-core AI",
    connectivity: "Wi-Fi + Zigbee",
    assistant: "Alexa AI",
    ecosystem: "Amazon Alexa",
    technical: { chip: "Octa-core AI", aiEngine: "Visual + Voice AI", memory: "2GB RAM" },
    connectivityDetails: { wifi: "Dual-band Wi-Fi", bluetooth: "Bluetooth 5.1", thread: "Matter Hub" },
    power: { input: "30W adapter", standby: "2.1W", connector: "Barrel Connector" }
  },
  appleTv4k: {
    processing: "A15 Bionic",
    connectivity: "Wi-Fi + ETH",
    assistant: "Siri AI",
    ecosystem: "Apple Home",
    technical: { chip: "A15 Bionic", aiEngine: "Neural Engine", memory: "4GB RAM" },
    connectivityDetails: { wifi: "Wi-Fi 6", bluetooth: "Bluetooth 5.0", thread: "Thread Border Router" },
    power: { input: "Built-in PSU", standby: "2.2W", connector: "AC power cable" }
  },
  fireTvCube: {
    processing: "Hexa-core AI",
    connectivity: "Wi-Fi + HDMI",
    assistant: "Alexa AI",
    ecosystem: "Amazon Alexa",
    technical: { chip: "Hexa-core AI", aiEngine: "Far-field Voice AI", memory: "2GB RAM" },
    connectivityDetails: { wifi: "Wi-Fi 6E", bluetooth: "Bluetooth 5.2", thread: "Not supported" },
    power: { input: "15W adapter", standby: "2.4W", connector: "USB-C power" }
  }
};
const FALLBACK_META = {
  processing: "AI Processor",
  connectivity: "Wi-Fi",
  assistant: "AI Voice",
  ecosystem: "Smart Home",
  technical: { chip: "AI SoC", aiEngine: "Machine Learning", memory: "512MB RAM" },
  connectivityDetails: { wifi: "Wi-Fi", bluetooth: "Bluetooth", thread: "Compatible" },
  power: { input: "Standard adapter", standby: "2.0W", connector: "DC connector" }
};
function ProductDetail({ product, onAddToCart }) {
  const navigate = useNavigate();
  const [isTechSpecsOpen, setIsTechSpecsOpen] = useState(true);
  const meta = PRODUCT_META[product.id] ?? FALLBACK_META;
  const stockLabel = product.inStore ? "IN STOCK" : "OUT OF STOCK";
  const compactSpecs = useMemo(
    () => [
      { icon: "memory", label: "PROCESSING", value: meta.processing },
      { icon: "hub", label: "CONNECTIVITY", value: meta.connectivity },
      { icon: "settings_voice", label: "ASSISTANT", value: meta.assistant },
      { icon: "home", label: "ECOSYSTEM", value: meta.ecosystem }
    ],
    [meta.assistant, meta.connectivity, meta.ecosystem, meta.processing]
  );
  return <main className="pt-10 pb-32 max-w-[1280px] mx-auto px-gutter"><nav className="mb-md flex items-center gap-xs"><button
    type="button"
    onClick={() => navigate("/marketplace/store")}
    className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors group"
  ><span className="material-symbols-outlined text-[18px]">arrow_back</span><span className="font-label-caps text-label-caps">BACK TO MARKETPLACE</span></button></nav><div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start"><div className="lg:col-span-7 space-y-md"><div className="glass-panel rounded-xl overflow-hidden relative aspect-square md:aspect-[4/3] flex items-center justify-center p-lg"><img className="w-full h-full object-contain" src={product.image} alt={product.title} /><div className="absolute top-md right-md flex flex-col gap-sm"><div className="glass-panel px-sm py-xs rounded-full flex items-center gap-xs"><span className={`w-2 h-2 rounded-full ${product.inStore ? "bg-primary-fixed-dim animate-pulse" : "bg-error"}`} /><span className={`font-label-caps text-label-caps ${product.inStore ? "text-primary" : "text-error"}`}>{stockLabel}</span></div></div></div><div className="grid grid-cols-4 gap-md"><button type="button" className="glass-panel rounded-lg aspect-square p-sm border border-primary cursor-default" aria-label="Selected product image"><img className="w-full h-full object-cover rounded" src={product.image} alt={product.title} /></button><div className="glass-panel rounded-lg aspect-square p-sm border border-transparent hover:border-outline-variant transition-colors flex items-center justify-center"><span className="material-symbols-outlined text-outline">photo</span></div><div className="glass-panel rounded-lg aspect-square p-sm border border-transparent hover:border-outline-variant transition-colors flex items-center justify-center"><span className="material-symbols-outlined text-outline">photo</span></div><div className="glass-panel rounded-lg aspect-square p-sm border border-transparent hover:border-outline-variant transition-colors flex items-center justify-center"><span className="material-symbols-outlined text-outline">videocam</span></div></div></div><div className="lg:col-span-5 space-y-lg"><section><span className="font-label-caps text-label-caps text-primary tracking-widest mb-xs block">{product.category}</span><h1 className="font-headline-lg text-headline-lg text-on-surface mb-sm">{product.title}</h1><p className="font-body-lg text-on-surface-variant">{product.description}</p></section><div className="flex items-baseline gap-sm"><span className="font-display text-headline-lg font-bold text-primary-fixed-dim">{formatMoney(product.priceValue)}</span>{product.oldPrice ? <span className="font-label-caps text-label-caps text-outline line-through">{product.oldPrice}</span> : null}</div><div className="grid grid-cols-2 gap-md">{compactSpecs.map((spec) => <div key={`${product.id}-${spec.label}`} className="glass-panel p-md rounded-xl space-y-xs"><span className="material-symbols-outlined text-primary">{spec.icon}</span><div className="font-label-caps text-label-caps text-outline">{spec.label}</div><div className="font-headline-sm text-headline-sm">{spec.value}</div></div>)}</div><section className="space-y-md"><div className="font-label-caps text-label-caps text-outline-variant">SYSTEM COMPATIBILITY</div><div className="flex flex-wrap gap-md items-center opacity-60"><div className="flex items-center gap-xs"><span className="material-symbols-outlined text-[24px]">settings_voice</span><span className="font-label-caps text-[10px]">VOICE AI</span></div><div className="flex items-center gap-xs"><span className="material-symbols-outlined text-[24px]">record_voice_over</span><span className="font-label-caps text-[10px]">MULTI-ASSISTANT</span></div><div className="flex items-center gap-xs"><span className="material-symbols-outlined text-[24px]">smart_toy</span><span className="font-label-caps text-[10px]">VOICE CONTROL</span></div></div></section><div className="space-y-md pt-md"><button
    type="button"
    onClick={onAddToCart}
    disabled={!product.inStore}
    className="w-full bg-primary text-on-primary py-md px-lg rounded-xl font-headline-sm text-headline-sm flex items-center justify-center gap-md hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
  ><span>{product.inStore ? "Add to Cart" : "Out of stock"}</span><span className="material-symbols-outlined">shopping_cart</span></button></div></div></div><div className="mt-xl glass-panel rounded-xl overflow-hidden"><div className="border-b border-outline-variant/20 p-md flex items-center justify-between"><h3 className="font-headline-sm text-headline-sm">Detailed Technical Specification</h3><button
    type="button"
    onClick={() => setIsTechSpecsOpen((current) => !current)}
    className="p-1 rounded-md hover:bg-primary/5 transition-colors"
    aria-label="Toggle technical specification"
  ><span className="material-symbols-outlined">{isTechSpecsOpen ? "expand_less" : "expand_more"}</span></button></div>{isTechSpecsOpen ? <div className="p-lg grid grid-cols-1 md:grid-cols-3 gap-lg"><div className="space-y-sm"><h4 className="font-label-caps text-label-caps text-primary">TECHNICAL SPECS</h4><ul className="space-y-xs text-body-sm text-on-surface-variant"><li className="flex justify-between border-b border-outline-variant/10 pb-xs"><span>Chip</span><span>{meta.technical.chip}</span></li><li className="flex justify-between border-b border-outline-variant/10 pb-xs"><span>AI Engine</span><span>{meta.technical.aiEngine}</span></li><li className="flex justify-between border-b border-outline-variant/10 pb-xs"><span>Memory</span><span>{meta.technical.memory}</span></li></ul></div><div className="space-y-sm"><h4 className="font-label-caps text-label-caps text-primary">CONNECTIVITY</h4><ul className="space-y-xs text-body-sm text-on-surface-variant"><li className="flex justify-between border-b border-outline-variant/10 pb-xs"><span>Wi-Fi</span><span>{meta.connectivityDetails.wifi}</span></li><li className="flex justify-between border-b border-outline-variant/10 pb-xs"><span>Bluetooth</span><span>{meta.connectivityDetails.bluetooth}</span></li><li className="flex justify-between border-b border-outline-variant/10 pb-xs"><span>Thread</span><span>{meta.connectivityDetails.thread}</span></li></ul></div><div className="space-y-sm"><h4 className="font-label-caps text-label-caps text-primary">POWER</h4><ul className="space-y-xs text-body-sm text-on-surface-variant"><li className="flex justify-between border-b border-outline-variant/10 pb-xs"><span>Power Input</span><span>{meta.power.input}</span></li><li className="flex justify-between border-b border-outline-variant/10 pb-xs"><span>Standby Power</span><span>{meta.power.standby}</span></li><li className="flex justify-between border-b border-outline-variant/10 pb-xs"><span>Connector</span><span>{meta.power.connector}</span></li></ul></div></div> : null}</div></main>;
}
export {
  ProductDetail
};
