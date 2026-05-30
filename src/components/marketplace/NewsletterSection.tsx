import { useState } from 'react';

export function NewsletterSection() {
  const [message, setMessage] = useState('');

  return (
    <section className="max-w-[1280px] mx-auto px-gutter pb-xl">
      <div className="bg-surface-container-highest rounded-[32px] p-lg md:p-xl flex flex-col md:flex-row items-center gap-lg">
        <div className="flex-1 z-10">
          <h3 className="font-headline-lg text-headline-lg mb-sm">Get updates on the latest AI-powered smart home devices</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Subscribe to get notified of new launches, discounts and AI assistant comparisons.</p>
        </div>
        <div className="w-full md:w-[440px] z-10">
          <form
            className="flex flex-col sm:flex-row gap-sm w-full"
            onSubmit={(e) => {
              e.preventDefault();
              setMessage('Subscription successful.');
            }}
          >
            <input className="bg-surface-container-lowest border border-outline-variant/50 px-md py-sm rounded-xl w-full md:w-80" placeholder="email@domain.com" type="email" required />
            <button type="submit" className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-caps text-label-caps">SUBSCRIBE</button>
          </form>
          <p className="mt-sm text-body-sm min-h-[22px]">{message}</p>
        </div>
      </div>
    </section>
  );
}