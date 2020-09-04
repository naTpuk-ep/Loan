import Slider from './slider';

export default class MiniSlider extends Slider {
	constructor (container, next, prev, activeClass, animate, auto) {
		super(container, next, prev, activeClass, animate, auto);
	}

	autoNext(){
		if (this.auto){
			clearInterval(this.interval);
			this.interval = setInterval(() => {
				this.showNext();
			}, 5000);
		};
	}

	decorizeSlides(index) {
		this.slides.forEach(slide => {
			slide.classList.remove(this.activeClass);
			slide.style.opacity = .8;
			if (this.animate) {
				slide.querySelector('.card__title').style.opacity = '0.4';
				slide.querySelector('.card__controls-arrow').style.opacity = '0';
			};
		});
		this.slides[index].classList.add(this.activeClass);
		this.slides[index].style.opacity = 1;
		if (this.animate) {
			this.slides[index].querySelector('.card__title'). style.opacity = '1';
			this.slides[index].querySelector('.card__controls-arrow'). style.opacity = '1';
		};
	}

	showPrev(){		
		this.slides[0].style.marginLeft = `-${parseInt(window.getComputedStyle(this.slides[1]).width)+parseInt(window.getComputedStyle(this.slides[1]).marginRight)}px`;
		this.decorizeSlides(1);
		this.slides[0].addEventListener('transitionend', () => {
			this.container.insertBefore(this.slides[0], this.container.querySelector('button'));
			let active;
			if (this.container.querySelector('button')) {
				active = this.container.querySelector('button').previousElementSibling;
			} else {
				active = this.slides[this.slides.length - 1];
			}
			active.style.marginLeft = '0px';
		}, {once:true});
	}

	showNext(){
		let active;
		if (this.container.querySelector('button')) {
			active = this.container.querySelector('button').previousElementSibling;
		} else {
			active = this.slides[this.slides.length - 1];
		}
		active.style.marginLeft = `-${parseInt(window.getComputedStyle(active).width)+parseInt(window.getComputedStyle(active).marginRight)}px`;
		this.container.insertBefore(active, this.slides[0]);
		setTimeout(() => {
			this.slides[0].style.marginLeft = '0px';
			this.decorizeSlides(0);
		});
	}

	bindTriggers(){		
		try {
		this.container.closest('.modules').previousElementSibling.addEventListener('transitionend', () => {
			this.autoNext();
		});
		}catch(e){}
		this.next.forEach(btn => {
			btn.addEventListener('click', () => {
				this.showNext();
				this.autoNext();
			});
		});
		this.prev.forEach(btn => {
			btn.addEventListener('click', () => {
				this.showPrev();
				this.autoNext();
			});
		});
	}

	init() {		
		try {
			this.container.style.cssText = `
				display: flex;
				flex-wrap: wrap;
				overflow: hidden;
				align-items: flex-start;
			`;
			this.bindTriggers();
			this.decorizeSlides(0);
			this.container.addEventListener('mouseenter', () => {
				clearInterval(this.interval);
			});
			this.container.addEventListener('mouseleave', () => {
				this.autoNext();
			});
		} catch (e){};
	}
}