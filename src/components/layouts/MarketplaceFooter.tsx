export function MarketplaceFooter() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20 py-md px-margin mt-lg">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-sm">
        <span className="font-label-caps text-on-surface-variant text-[11px]">© 2024 AI-O HOME MARKETPLACE. ENGINEERED FOR PRECISION.</span>
        <div className="flex gap-md">
          <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all">Privacy Protocol</a>
          <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all">Technical Specs</a>
          <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all">Support</a>
        </div>
      </div>
    </footer>
  );
}