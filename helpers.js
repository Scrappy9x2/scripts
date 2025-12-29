// WAIT FOR AN ELEMENT TO APPEAR AND DO SOMETHING...
const waitFor = (sel, cb) => {
    const obs = new MutationObserver(() => {
        const el = document.querySelector(sel);
        if (el) cb(el), obs.disconnect();
    });
    obs.observe(document.body,{childList:true,subtree:true});
};

// REPLACE ALL A HREFS IN PAGE DYNAMICALLY
const rewriteLinks = o => {
  if (!o) return;
  const { from, to } = o;

  const fix = a => a?.href?.includes(from) && (a.href = a.href.replace(from, to));

  document.querySelectorAll('a[href]').forEach(fix);
  new MutationObserver(m =>
    m.forEach(x => x.addedNodes.forEach(n =>
      n.tagName === 'A' ? fix(n) : n.querySelectorAll?.('a[href]').forEach(fix)
    ))
  ).observe(document, { childList: true, subtree: true });
};
