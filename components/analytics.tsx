"use client";
import Script from "next/script";

/**
 * Google Analytics 4 + Consent Mode v2.
 * Alapértelmezetten MINDEN tárolás tiltva (GDPR) — a mérés csak akkor indul,
 * ha a felhasználó a süti-bannerben hozzájárul. A korábban mentett választást
 * (localStorage) betöltéskor visszaállítjuk, mielőtt bármi tag lefutna.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;
  return (
    <>
      <Script
        id="ga-consent-default"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'denied',
              personalization_storage: 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
            try {
              var raw = localStorage.getItem('cookie-preferences');
              if (raw) {
                var p = JSON.parse(raw);
                gtag('consent', 'update', {
                  analytics_storage: p.analytics ? 'granted' : 'denied',
                  ad_storage: p.marketing ? 'granted' : 'denied',
                  ad_user_data: p.marketing ? 'granted' : 'denied',
                  ad_personalization: p.marketing ? 'granted' : 'denied',
                  functionality_storage: p.functional ? 'granted' : 'denied',
                  personalization_storage: p.functional ? 'granted' : 'denied'
                });
              }
            } catch (e) {}
            gtag('js', new Date());
            gtag('config', '${gaId}', { anonymize_ip: true });
          `,
        }}
      />
      <Script
        id="ga-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
    </>
  );
}
