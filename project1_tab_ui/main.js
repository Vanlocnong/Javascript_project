const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const selectTabsItems = $$('.tab-item');
const selectTabsPanes = $$('.tab-pane');

const line = $('.line')
const tabActive = $('.tabs')
console.log([tabActive])

line.style.left = tabActive.offsetLeft + 'px'
line.style.width = tabActive.offsetWidth + 'px'



selectTabsItems.forEach((curr , index) => {

        const paneContent = selectTabsPanes[index]

        curr.onclick = function(event){
        $('.tab-item.active').classList.remove('active')
        curr.classList.add('active')
        $('.tab-pane.active').classList.remove('active')
        paneContent.classList.add('active')

        line.style.left = this.offsetLeft + 'px'
        line.style.width = this.offsetWidth + 'px'

    }
})



