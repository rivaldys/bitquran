const setPageTitle = (title, desc) =>
{
    const endash = document.getElementById('endash').innerHTML
    const pageTitle = `${title} ${endash} ${desc}`
    return pageTitle
}

export default setPageTitle