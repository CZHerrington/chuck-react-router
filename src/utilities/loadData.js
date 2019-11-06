async function loadData (url) {
    return await fetch(url).then(res => res.json())
}

export default loadData;