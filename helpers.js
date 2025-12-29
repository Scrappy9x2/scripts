const waitFor = (sel, cb) => {
    const obs = new MutationObserver(() => {
        const el = document.querySelector(sel);
        if (el) cb(el), obs.disconnect();
    });
    obs.observe(document.body,{childList:true,subtree:true});
};
