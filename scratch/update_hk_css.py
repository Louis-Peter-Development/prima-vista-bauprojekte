import re

with open('src/styles/pages/heizkoerper.css', 'r') as f:
    css = f.read()

# Replace .hk-config and .hk-summary__sticky basic block properties
css = re.sub(r'\.hk-product,\s*\n\.hk-config,\s*\n\.hk-summary__sticky\s*{[^}]+}', 
             '.hk-product {\n  background: var(--pv-white);\n  border: 1px solid rgba(20, 19, 18, .08);\n}\n.hk-config {\n  /* Removed borders/bg from wrapper */\n}', css)

# Make .hk-config act like .kalk-board
css = re.sub(r'\.hk-config\s*{\s*padding:[^}]+}', 
             '.hk-config {\n  display: flex;\n  flex-direction: column;\n  gap: 32px;\n  min-width: 0;\n}', css)

# Make .hk-config__field act like .kalk-board__field
css = re.sub(r'\.hk-config__field\s*{\s*padding-bottom:[^}]+}', 
             '.hk-config__field {\n  background: var(--pv-cream);\n  border: 1px solid rgba(20, 19, 18, .07);\n  padding: 36px 40px 40px;\n  position: relative;\n}\n.hk-config__field::before {\n  content: \'\';\n  position: absolute;\n  inset: -1px auto -1px -1px;\n  width: 3px;\n  background: var(--pv-copper);\n  opacity: 0;\n  transition: opacity 240ms;\n}\n.hk-config__field:focus-within::before { opacity: 1; }', css)

# Remove border-bottom from last field as it's not needed now
css = re.sub(r'\.hk-config__field:last-child\s*{[^}]+}', '', css)

# Make .hk-config__head act like .kalk-board__field-head
css = re.sub(r'\.hk-config__head\s*{\s*display: grid;[^}]+}', 
             '.hk-config__head {\n  display: flex;\n  align-items: baseline;\n  gap: 14px;\n  margin-bottom: 28px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid rgba(20, 19, 18, .08);\n}', css)

css = re.sub(r'\.hk-config__head span,\s*\n\.hk-config__head em\s*{[^}]+}', 
             '.hk-config__head span {\n  font-family: var(--pv-font-mono);\n  font-size: 11px;\n  letter-spacing: .24em;\n  color: var(--pv-copper);\n}\n.hk-config__head em {\n  font-family: var(--pv-font-body);\n  font-size: 12px;\n  color: var(--pv-text-on-light-muted);\n  font-style: italic;\n}', css)

css = re.sub(r'\.hk-config__head strong\s*{[^}]+}', 
             '.hk-config__head strong {\n  font-family: var(--pv-font-display);\n  font-weight: 700;\n  font-size: 13px;\n  letter-spacing: .24em;\n  text-transform: uppercase;\n  color: var(--pv-ink);\n  flex: 1;\n}', css)

# Fix .hk-options to look like dark cards
css = re.sub(r'\.hk-option\s*{\s*width: 100%;[^}]+}', 
             '.hk-option {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 6px;\n  padding: 18px 18px 16px;\n  background: var(--pv-ink-2);\n  color: var(--pv-bone);\n  border: 1px solid rgba(236, 229, 223, .12);\n  border-radius: var(--pv-radius-md, 6px);\n  text-align: left;\n  cursor: pointer;\n  transition:\n    border-color 200ms var(--pv-ease-out),\n    background 200ms var(--pv-ease-out),\n    transform 200ms var(--pv-ease-out);\n}', css)

css = re.sub(r'\.hk-option:hover,\s*\n\.hk-option\.is-on\s*{[^}]+}', 
             '.hk-option:hover {\n  border-color: var(--pv-copper-bright);\n  transform: translateY(-1px);\n}\n.hk-option.is-on {\n  background: var(--pv-ink-3);\n  border-color: var(--pv-copper-bright);\n}', css)

css = re.sub(r'\.hk-option\.is-on\s*{\s*transform: translateX\(3px\);\s*}', '', css)

css = re.sub(r'\.hk-option__label\s*{[^}]+}', 
             '.hk-option__label {\n  font-family: var(--pv-font-display);\n  font-weight: 700;\n  font-size: 14px;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: var(--pv-bone);\n}', css)

css = re.sub(r'\.hk-option__detail\s*{[^}]+}', 
             '.hk-option__detail {\n  margin-top: 2px;\n  font-family: var(--pv-font-body);\n  font-size: 12px;\n  color: var(--pv-text-on-dark-muted);\n  line-height: 1.4;\n}', css)

css = re.sub(r'\.hk-option__price\s*{[^}]+}', 
             '.hk-option__price {\n  margin-top: 8px;\n  font-family: var(--pv-font-mono);\n  font-size: 11px;\n  letter-spacing: 0.18em;\n  color: var(--pv-text-on-dark-muted);\n  text-transform: uppercase;\n}\n.hk-option.is-on .hk-option__price {\n  color: var(--pv-copper-bright);\n}', css)


# Fix .hk-toggle (checkbox cards)
css = re.sub(r'\.hk-toggle\s*{[^}]+}', 
             '.hk-toggle {\n  display: flex;\n  gap: 14px;\n  align-items: center;\n  padding: 18px;\n  border: 1px solid rgba(20, 19, 18, .18);\n  background: transparent;\n  cursor: pointer;\n  transition: background 180ms, border-color 180ms;\n}', css)

css = re.sub(r'\.hk-toggle\.is-on\s*{[^}]+}', 
             '.hk-toggle.is-on {\n  background: var(--pv-ink);\n  border-color: var(--pv-ink);\n  color: var(--pv-bone);\n}\n.hk-toggle:hover {\n  border-color: var(--pv-copper);\n}\n.hk-toggle.is-on small {\n  color: var(--pv-text-on-dark-muted);\n}', css)

# Make summary dark
css = re.sub(r'\.hk-summary__sticky\s*{\s*padding: 24px;\s*}', 
             '.hk-summary__sticky {\n  position: relative;\n  background: var(--pv-ink-1);\n  color: var(--pv-bone);\n  padding: 40px 36px 36px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: none;\n}\n.hk-summary__sticky::before {\n  content: \'\';\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background: radial-gradient(ellipse at 100% 0%, rgba(200, 154, 106, .15) 0%, transparent 60%);\n  z-index: 0;\n}\n.hk-summary__sticky > * { position: relative; z-index: 1; }\n.hk-summary__sticky .btn--light {\n  color: var(--pv-bone);\n  border-color: rgba(236, 229, 223, .45);\n  background: rgba(255, 255, 255, .04);\n}\n.hk-summary__sticky .btn--light:hover {\n  color: var(--pv-copper-bright);\n  border-color: var(--pv-copper-bright);\n  background: rgba(200, 154, 106, .10);\n}', css)

css = re.sub(r'\.hk-summary__top\s*{[^}]+}', 
             '.hk-summary__top {\n  padding-bottom: 28px;\n  border-bottom: 1px solid rgba(236, 229, 223, .14);\n}', css)

css = re.sub(r'\.hk-summary__top span,\s*\n\.hk-summary__top small\s*{[^}]+}', 
             '.hk-summary__top span {\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  font-family: var(--pv-font-display);\n  font-weight: 600;\n  font-size: 11px;\n  letter-spacing: 0.24em;\n  text-transform: uppercase;\n  color: var(--pv-copper-bright);\n  margin-bottom: 24px;\n}\n.hk-summary__top small {\n  font-family: var(--pv-font-mono);\n  font-size: 10px;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: var(--pv-text-on-dark-muted);\n  display: block;\n}', css)

css = re.sub(r'\.hk-summary__top strong\s*{[^}]+}', 
             '.hk-summary__top strong {\n  display: block;\n  font-family: var(--pv-font-serif);\n  font-style: italic;\n  font-weight: 500;\n  font-size: clamp(34px, 3.2vw, 48px);\n  line-height: 1;\n  color: var(--pv-bone);\n  margin-bottom: 8px;\n}', css)

css = re.sub(r'\.hk-summary__totals\s*{[^}]+}', 
             '.hk-summary__totals {\n  display: grid;\n  gap: 10px;\n  padding: 16px 0;\n  border-bottom: 1px dashed rgba(236, 229, 223, .14);\n}', css)

css = re.sub(r'\.hk-summary__totals span\s*{[^}]+}', 
             '.hk-summary__totals span {\n  display: flex;\n  justify-content: space-between;\n  gap: 14px;\n  color: var(--pv-bone);\n  font-family: var(--pv-font-mono);\n  font-size: 13px;\n  letter-spacing: 0.04em;\n}', css)

css = re.sub(r'\.hk-lines\s*{[^}]+}', 
             '.hk-lines {\n  display: grid;\n  gap: 0;\n  padding: 14px 0;\n}', css)

css = re.sub(r'\.hk-line\s*{[^}]+}', 
             '.hk-line {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 16px;\n  padding: 12px 0;\n  border-bottom: 1px solid rgba(236, 229, 223, .08);\n}\n.hk-line:last-child { border-bottom: 0; }', css)

css = re.sub(r'\.hk-line strong\s*{[^}]+}', 
             '.hk-line strong {\n  font-family: var(--pv-font-body);\n  font-size: 14px;\n  color: var(--pv-bone);\n  letter-spacing: normal;\n  text-transform: none;\n  display: block;\n}', css)

css = re.sub(r'\.hk-line span\s*{[^}]+}', 
             '.hk-line span {\n  margin-top: 4px;\n  color: var(--pv-text-on-dark-muted);\n  line-height: 1.35;\n  font-size: 12px;\n  display: block;\n}', css)

css = re.sub(r'\.hk-line small\s*{[^}]+}', 
             '.hk-line small {\n  margin-top: 4px;\n  font-family: var(--pv-font-mono);\n  letter-spacing: .1em;\n  color: var(--pv-copper-bright);\n  font-size: 11px;\n  display: block;\n}', css)

css = re.sub(r'\.hk-summary p\s*{[^}]+}', 
             '.hk-summary p {\n  margin: 0;\n  padding: 18px 0;\n  border-top: 1px dashed rgba(236, 229, 223, .14);\n  border-bottom: 1px dashed rgba(236, 229, 223, .14);\n  color: var(--pv-text-on-dark-muted);\n  font-size: 12px;\n  line-height: 1.6;\n}', css)

# Adjust mobile paddings for hk-config and hk-summary__sticky
css = re.sub(r'\.hk-config,\s*\n\s*\.hk-summary__sticky\s*{\s*padding: 20px;\s*}', 
             '.hk-config {\n    padding: 0;\n  }\n  .hk-summary__sticky {\n    padding: 28px 22px;\n  }\n  .hk-config__field {\n    padding: 24px 22px 28px;\n  }', css)
css = re.sub(r'\.hk-config__head,\s*\n\s*\.hk-meter\s*{\s*grid-template-columns: 1fr;\s*}', 
             '.hk-config__head {\n    flex-wrap: wrap;\n    gap: 8px 14px;\n    margin-bottom: 22px;\n    padding-bottom: 16px;\n  }\n  .hk-meter {\n    grid-template-columns: 1fr;\n  }', css)


with open('src/styles/pages/heizkoerper.css', 'w') as f:
    f.write(css)

print("Done updating CSS")
