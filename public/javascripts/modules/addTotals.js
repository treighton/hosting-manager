const addTotal = els => {
    const totals = []
    els.forEach(el => {
        totals.push(parseFloat(el.dataset.total))
    } )
    return totals.reduce((pv, cv) => pv+cv, 0)
}

const renderTotal = (target, total) => {
    target.innerHTML = `<h2>Total: $ ${total}</h2>`
}

const totaler = (els, target) => {
    renderTotal(target, addTotal(els))
}

export default totaler