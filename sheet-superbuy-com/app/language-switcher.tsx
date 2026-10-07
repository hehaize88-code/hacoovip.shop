const languages = [
  ["en", "EN", "English"], ["fr", "FR", "Français"], ["de", "DE", "Deutsch"],
  ["es", "ES", "Español"], ["it", "IT", "Italiano"], ["id", "ID", "Bahasa Indonesia"], ["zh-cn", "中文", "简体中文"],
];
export function LanguageSwitcher() {
  return <details className="language-switcher" translate="no">
    <summary aria-label="Choose language"><span>LANG</span><strong data-current-language>EN</strong><i aria-hidden="true">⌄</i></summary>
    <div className="language-panel"><div className="language-panel-head"><span>Language</span><small>Same page, complete content</small></div>
      <div className="language-options">{languages.map(([code,short,label]) => <a key={code} data-language={code} href={code === "en" ? "/" : `/${code}/`} hrefLang={code === "zh-cn" ? "zh-CN" : code}><span>{short}</span><strong>{label}</strong></a>)}</div>
    </div>
  </details>;
}
