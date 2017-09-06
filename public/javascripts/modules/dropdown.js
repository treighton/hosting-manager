const dropdown  = (element) => {
    element.addEventListener('click',() => {
        document.querySelector('.dropdown').classList.toggle('active')
    })
}

export default dropdown