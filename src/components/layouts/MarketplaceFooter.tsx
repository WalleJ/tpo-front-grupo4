import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

type InfoPopupType = 'privacy' | 'specs' | null;

const INFO_POPUP_CONTENT: Record<Exclude<InfoPopupType, null>, { title: string; text: string }> = {
  privacy: {
    title: 'Privacy Protocol',
    text: 'AI-O HOME only uses your information to process orders, improve your shopping experience and answer support requests. We do not sell personal data to third parties.'
  },
  specs: {
    title: 'Technical Specs',
    text: 'All devices include verified compatibility details, connectivity standards and power requirements. Specifications are validated by product source and can be updated after firmware releases.'
  }
};

export function MarketplaceFooter() {
  const [infoPopup, setInfoPopup] = useState<InfoPopupType>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportEmail, setSupportEmail] = useState('');
  const [supportDetail, setSupportDetail] = useState('');
  const [supportFeedback, setSupportFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setInfoPopup(null);
      setIsSupportOpen(false);
    };

    globalThis.addEventListener('keydown', onKeyDown);
    return () => globalThis.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSupportSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = supportEmail.trim();
    const detail = supportDetail.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail || detail.length < 8) {
      setSupportFeedback({
        type: 'error',
        text: 'Please enter a valid email and a message with at least 8 characters.'
      });
      return;
    }

    setSupportFeedback({
      type: 'success',
      text: `Support request sent. We will contact ${email} shortly.`
    });
    setSupportDetail('');
  };

  const activeInfoPopup = infoPopup ? INFO_POPUP_CONTENT[infoPopup] : null;

  return (
    <>
      <footer className="bg-surface-container-low border-t border-outline-variant/20 py-md px-margin mt-lg">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-sm">
          <span className="font-label-caps text-on-surface-variant text-[11px]">© 2024 AI-O HOME MARKETPLACE. ENGINEERED FOR PRECISION.</span>
          <div className="flex gap-md">
            <button
              type="button"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all"
              onClick={() => {
                setIsSupportOpen(false);
                setInfoPopup('privacy');
              }}
            >
              Privacy Protocol
            </button>
            <button
              type="button"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all"
              onClick={() => {
                setIsSupportOpen(false);
                setInfoPopup('specs');
              }}
            >
              Technical Specs
            </button>
            <button
              type="button"
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all"
              onClick={() => {
                setInfoPopup(null);
                setSupportFeedback(null);
                setIsSupportOpen(true);
              }}
            >
              Support
            </button>
          </div>
        </div>
      </footer>

      {activeInfoPopup ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-md">
          <button
            type="button"
            className="absolute inset-0 bg-on-surface/45"
            aria-label="Close info popup"
            onClick={() => setInfoPopup(null)}
          />
          <div className="relative w-full max-w-lg glass-panel-white rounded-2xl border border-outline-variant/40 shadow-2xl p-lg">
            <div className="flex items-start justify-between gap-md mb-sm">
              <div>
                <p className="font-label-caps text-[10px] uppercase tracking-widest text-primary mb-1">INFORMATION</p>
                <h3 className="font-headline-sm text-headline-sm">{activeInfoPopup.title}</h3>
              </div>
              <button
                type="button"
                className="w-9 h-9 rounded-lg border border-outline-variant/40 hover:bg-surface-container-low"
                onClick={() => setInfoPopup(null)}
                aria-label="Close popup"
              >
                ✕
              </button>
            </div>
            <p className="text-body-md text-on-surface-variant leading-relaxed">{activeInfoPopup.text}</p>
            <div className="mt-md flex justify-end">
              <button
                type="button"
                className="font-label-caps text-label-caps py-sm px-md rounded-lg bg-primary text-white hover:brightness-110 active:scale-95 transition-all"
                onClick={() => setInfoPopup(null)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isSupportOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-md">
          <button
            type="button"
            className="absolute inset-0 bg-on-surface/45"
            aria-label="Close support popup"
            onClick={() => setIsSupportOpen(false)}
          />
          <div className="relative w-full max-w-xl glass-panel-white rounded-2xl border border-outline-variant/40 shadow-2xl p-lg">
            <div className="flex items-start justify-between gap-md mb-md">
              <div>
                <p className="font-label-caps text-[10px] uppercase tracking-widest text-primary mb-1">SUPPORT CENTER</p>
                <h3 className="font-headline-sm text-headline-sm">Contact support</h3>
              </div>
              <button
                type="button"
                className="w-9 h-9 rounded-lg border border-outline-variant/40 hover:bg-surface-container-low"
                onClick={() => setIsSupportOpen(false)}
                aria-label="Close popup"
              >
                ✕
              </button>
            </div>

            <form className="space-y-sm" onSubmit={handleSupportSubmit}>
              <label className="flex flex-col gap-1">
                <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">Email</span>
                <input
                  type="email"
                  required
                  value={supportEmail}
                  onChange={(event) => setSupportEmail(event.target.value)}
                  placeholder="name@example.com"
                  className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:ring-primary"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">Issue details</span>
                <textarea
                  required
                  rows={4}
                  minLength={8}
                  value={supportDetail}
                  onChange={(event) => setSupportDetail(event.target.value)}
                  placeholder="Describe your issue"
                  className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:ring-primary"
                />
              </label>

              {supportFeedback ? (
                <p className={`text-sm ${supportFeedback.type === 'success' ? 'text-primary' : 'text-error'}`}>
                  {supportFeedback.text}
                </p>
              ) : null}

              <div className="mt-md flex justify-end gap-sm">
                <button
                  type="button"
                  className="font-label-caps text-label-caps py-sm px-md rounded-lg border border-outline-variant/40 hover:bg-surface-container"
                  onClick={() => setIsSupportOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="font-label-caps text-label-caps py-sm px-md rounded-lg bg-primary text-white hover:brightness-110 active:scale-95 transition-all"
                >
                  Send request
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}