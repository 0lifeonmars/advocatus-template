var scrollChange = 10;
var header = document.querySelector(".header");
var header_toggler = document.querySelector(".header__toggler");
var btn_scrolltop = document.querySelector(".btn__scrolltop");
var nav = document.querySelector(".nav");
var btn__faq = document.querySelectorAll('.faq__button');

const on__none = (e) => e.classList.add("d_none");
const off__none = (e) => e.classList.remove("d_none");
const on__flex = (e) => e.classList.add("d_flex");
const on__block = (e) => e.classList.add("d_block");
const off__block = (e) => e.classList.remove("d_block");
const on__active = (e) => e.classList.add("active");
const off__active = (e) => e.classList.remove("active");
const on__fixed = (e) => e.classList.add("fixed");
const off__fixed = (e) => e.classList.remove("fixed");
const on__slideOutUp = (e) => e.classList.add("animation__slideOutUp");
const off__slideOutUp = (e) => e.classList.remove("animation__slideOutUp");
const on__slideInDown = (e) => e.classList.add("animation__slideInDown");
const off__slideInDown = (e) => e.classList.remove("animation__slideInDown");
const on__slideInRight = (e) => e.classList.add("animation__slideInRight");
const off__slideInRight = (e) => e.classList.remove("animation__slideInRight");
const on__slideOutRight = (e) => e.classList.add("animation__slideOutRight");
const off__slideOutRight = (e) => e.classList.remove("animation__slideOutRight");

window.addEventListener('scroll', (e) => { 
    let scrollpos = window.scrollY;
    if (scrollpos >= scrollChange && btn_scrolltop.classList.contains('d_none')) { on__fixed(header); on__fixed(nav); off__none(btn_scrolltop); on__flex(btn_scrolltop); on__slideInRight(btn_scrolltop); }
    else if (scrollpos >= scrollChange && btn_scrolltop.classList.contains('d_flex') && !btn_scrolltop.classList.contains('animation__slideOutRight')) { on__fixed(header); on__fixed(nav); on__slideInRight(btn_scrolltop); }
    else if (scrollpos >= scrollChange && btn_scrolltop.classList.contains('d_flex') && btn_scrolltop.classList.contains('animation__slideOutRight')) { on__fixed(header); on__fixed(nav); off__slideOutRight(btn_scrolltop); on__slideInRight(btn_scrolltop) }
    else if(scrollpos < scrollChange && btn_scrolltop.classList.contains('d_flex')) { off__fixed(header); off__fixed(nav); off__slideInRight(btn_scrolltop); on__slideOutRight(btn_scrolltop); }
    else { e.preventDefault(); }
});

header_toggler.addEventListener('click', (e) => {
    if(nav.classList.contains('d_none')) { off__none(nav); on__slideInDown(nav); on__active(header_toggler); } 
    else if(nav.classList.contains('animation__slideInDown')) { off__slideInDown(nav); on__slideOutUp(nav); off__active(header_toggler); }
    else if(nav.classList.contains('animation__slideOutUp')) { off__slideOutUp(nav); on__slideInDown(nav); on__active(header_toggler); }
    else { e.preventDefault(); }
});

nav.addEventListener('click', (e) => {
    if(nav.classList.contains('animation__slideInDown')) { off__slideInDown(nav); on__slideOutUp(nav); off__active(header_toggler); }
    else { e.preventDefault(); }
}); 

document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.splide', { 
        type: 'loop',
        arrows: false, 
        width: '100%',
        autoplay: true,
        interval: 3000,
        pauseOnHover: true 
    } );
    splide.mount();
});

const buttonPressed = (e) => {
    let btn_click = e.target;
    let btn_attr = String(e.target.getAttribute('data-faq-btn'));
    let btn_box = document.querySelector('[data-faq-box=box-' + btn_attr + ']');
    let btn_active = document.querySelector('.faq__button.active');
    let box_active = document.querySelector('.faqbox.d_block');
    if(!btn_box.classList.contains('d_block') && !btn_click.classList.contains('active')) {
        off__active(btn_active); on__active(btn_click);
        off__block(box_active); on__none(box_active); 
        off__none(btn_box); on__block(btn_box);
    }
}
for (let tab_btn of btn__faq) { tab_btn.addEventListener('click', buttonPressed); }

window.onload = function () {
    var form = document.getElementById("contact_form");
    var pristine = new Pristine(form);
    form.addEventListener('submit', function (e) {
       e.preventDefault();
       var valid = pristine.validate();
    });

};