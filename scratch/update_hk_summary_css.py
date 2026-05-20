import re

with open('src/styles/pages/heizkoerper.css', 'r') as f:
    css = f.read()

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

# Make sure we only replace the desktop .hk-line, not the mobile one
css = re.sub(r'\.hk-line\s*{\s*display: grid;\s*grid-template-columns: minmax\(0, 1fr\) auto;\s*gap: 16px;\s*padding-bottom: 8px;\s*border-bottom: 1px solid rgba\(20, 19, 18, \.07\);\s*}', 
             '.hk-line {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 16px;\n  padding: 12px 0;\n  border-bottom: 1px solid rgba(236, 229, 223, .08);\n}\n.hk-line:last-child { border-bottom: 0; }', css)

css = re.sub(r'\.hk-line strong,\s*\n\.hk-line span,\s*\n\.hk-line small\s*{[^}]+}', 
             '.hk-line strong,\n.hk-line span,\n.hk-line small {\n  margin-top: 4px;\n  font-family: var(--pv-font-mono);\n  letter-spacing: .1em;\n  color: var(--pv-copper-bright);\n  font-size: 11px;\n  display: block;\n}', css)

css = re.sub(r'\.hk-line strong\s*{[^}]+}', 
             '.hk-line strong {\n  font-family: var(--pv-font-body);\n  font-size: 14px;\n  color: var(--pv-bone);\n  letter-spacing: normal;\n  text-transform: none;\n  display: block;\n}', css)

css = re.sub(r'\.hk-line span\s*{[^}]+}', 
             '.hk-line span {\n  margin-top: 4px;\n  color: var(--pv-text-on-dark-muted);\n  line-height: 1.35;\n  font-size: 12px;\n  display: block;\n}', css)

css = re.sub(r'\.hk-line small\s*{[^}]+}', 
             '.hk-line small {\n  margin-top: 4px;\n  font-family: var(--pv-font-mono);\n  letter-spacing: .1em;\n  color: var(--pv-copper-bright);\n  font-size: 11px;\n  display: block;\n}', css)

css = re.sub(r'\.hk-summary p\s*{[^}]+}', 
             '.hk-summary p {\n  margin: 0;\n  padding: 18px 0;\n  border-top: 1px dashed rgba(236, 229, 223, .14);\n  border-bottom: 1px dashed rgba(236, 229, 223, .14);\n  color: var(--pv-text-on-dark-muted);\n  font-size: 12px;\n  line-height: 1.6;\n}', css)

# Adjust mobile padding for hk-summary__sticky
css = re.sub(r'\.hk-summary__sticky\s*{\s*padding: 20px;\s*}', 
             '.hk-summary__sticky {\n    padding: 28px 22px;\n  }', css)

with open('src/styles/pages/heizkoerper.css', 'w') as f:
    f.write(css)

print("Done updating summary CSS")
