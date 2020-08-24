//teachers version

import Slider from "./slider";

export default class MainSlider extends Slider {
	constructor(btns, autoplay, next, prev) {
		super(btns, autoplay, next, prev);
	}

	showSlides(n) {
		if (n > this.slides.length) {
			this.slideIndex = 1;
		}
		if (n < 1) {
			this.slideIndex = this.slides.length;
		}
		try {
			this.hanson.style.opacity = '0';
			if (n === 3) {
				this.hanson.classList.add('animated');
				setTimeout(() => {
					this.hanson.style.opacity = '1';
					this.hanson.classList.add('slideInUp');
				}, 3000);
			} else {
				this.hanson.classList.remove('slideInUp');
			}
		} catch(e){}
		this.slides.forEach(slide => {
			slide.style.display = 'none';
		});
		this.slides[this.slideIndex - 1].style.display = 'block';
	}

	// animate() {
	// 	this.slides.forEach((slide, index, slides) => {

	// 		slide.style.display = 'none';
	// 		slide.style.opacity = '0';
	// 		slide.style.transition = 'all ease .5s';

	// 		this.btns.forEach(btn => {
	// 			btn.addEventListener('click', () => {

	// 			});
	// 		});
	// 			// item.querySelector('.plus').addEventListener('click', () => {
	// 			// 	items[this.counter[offIndex]].style.display = 'flex';
	// 			// 	let mTop = window.getComputedStyle(item).marginTop;
	// 			// 	item.style.marginTop = `-${window.getComputedStyle(item).height}`;
	// 			// 	this.counter[offIndex]++;

	// 			// 	setTimeout(() => {
	// 			// 		items[this.counter[offIndex] - 1].style.opacity = '1';
	// 			// 		item.style.transition = 'all ease .5s';
	// 			// 		item.style.marginTop = mTop;
	// 			// 	});
	// 			// });
				
	// 			// item.addEventListener('transitionend', () => {
	// 			// 	item.style.transition = 'none';
	// 			// 	if (this.counter[offIndex] === items.length - 1) {
	// 			// 		item.remove();
	// 			// 	}
	// 			// });
			
	// 	});
	// }

	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}

	bindTriggers() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {
				this.plusSlides(1);
			});
			if (btn.parentNode.previousElementSibling.tagName == 'A') {
				btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
					e.preventDefault();
					this.slideIndex = 1;
					this.showSlides(this.slideIndex);
				});
			}
		});

		this.showSlides(this.slideIndex);
		this.next.forEach(nextItem => {
			nextItem.addEventListener('click', (e) => {
				e.stopPropagation();
				this.plusSlides(1);
			});
		});
		
		this.prev.forEach(prevItem => {
			prevItem.addEventListener('click', (e) => {
				e.stopPropagation();
				this.plusSlides(-1);
			});
		});
	}

	render() {
		if (this.container) {
			try {
				this.hanson = document.querySelector('.hanson');
			} catch(e){}
			
			this.showSlides(this.slideIndex);
			this.bindTriggers();

		}
	}
};