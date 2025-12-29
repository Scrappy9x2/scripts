// WAIT FOR AN ELEMENT TO APPEAR AND DO SOMETHING
// Usage: waitFor('#name', el => el.click())
const waitFor = (sel, cb) => {
    const obs = new MutationObserver(() => {
        const el = document.querySelector(sel)
        if (el) cb(el), obs.disconnect()
    })
    obs.observe(document.body, { childList: true, subtree: true })
}

/***********************************************************************************************/

// REPLACE ALL A HREFS IN PAGE DYNAMICALLY
// Usage: rewriteLinks({ from: '/watch.php', to: '/video.php' })
const rewriteLinks = o => {
    if (!o) return
    const { from, to } = o
    const fix = a => a?.href?.includes(from) && (a.href = a.href.replace(from, to))
    document.querySelectorAll('a[href]').forEach(fix)
    new MutationObserver(m =>
        m.forEach(x => x.addedNodes.forEach(n =>
            n.tagName === 'A' ? fix(n) : n.querySelectorAll?.('a[href]').forEach(fix)
        ))
    ).observe(document, { childList: true, subtree: true })
}

/***********************************************************************************************/

// CHECK IF PAGE HAS THIS PARAM IN THE URL
// Usage: if (hasURLParam('s'))
const hasURLParam = param => new URL(location.href).searchParams.has(param)

/***********************************************************************************************/

// REMOVE ANY ELEMENT
// Usage: remove('.popup, .overlay')
const remove = s => document.querySelectorAll(s).forEach(e => e.remove())

// REMOVE ELEMENTS MATCHING MULTIPLE STYLE CONDITIONS
// Usage: removeByStyle({ position: 'fixed', zIndex: '999', backgroundColor: 'transparent' })
const removeByStyle = styles =>
    document.querySelectorAll('*').forEach(e => {
        const s = getComputedStyle(e)
        Object.entries(styles).every(([k, v]) => s[k] === v) && e.remove()
    })

/***********************************************************************************************/
