# Privacy Update Reminders

- Replace the generic hosting paragraph in `/datenschutz` with the final hosting/deployment provider before launch.
- Confirm the exact Google Analytics setup, consent mode, cookie behavior, IP handling, and retention settings.
- Wire Google Analytics and the Claude chatbot to `pv-cookie-consent-v1` before enabling them, so optional scripts only load after consent.
- Before enabling the Claude-based chatbot, add the final provider details, data categories, storage/retention behavior, and any required third-country transfer language.
- Re-check the page with legal counsel or a qualified privacy reviewer before publishing production traffic.
