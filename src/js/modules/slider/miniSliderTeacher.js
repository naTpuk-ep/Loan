//teacher version

import Slider from './slider';

export default class MiniSlider extends Slider {
	constructor (container, next, prev, activeClass, animate, autoplay) {
		super(container, next, prev, activeClass, animate, autoplay);
	}

	decorizeSlides() {
		this.slides.forEach(slide => {
			slide.classList.remove(this.activeClass);
			if (this.animate) {
				slide.querySelector('.card__title').style.opacity = '0.4';
				slide.querySelector('.card__controls-arrow').style.opacity = '0';
			}
		});

		this.slides[0].classList.add(this.activeClass);
		if (this.animate) {
			this.slides[0].querySelector('.card__title'). style.opacity = '1';
			this.slides[0].querySelector('.card__controls-arrow'). style.opacity = '1';
		}
	}

	bindTriggers() {
		this.prev.forEach(prev => {
			prev.addEventListener('click', () => {
				this.autoNext();
				this.container.insertBefore(this.slides[0], this.container.querySelector('button'));
				this.decorizeSlides();
			});
		})
		
		this.next.forEach(next => {
			next.addEventListener('click', () => {
				this.autoNext();
				let active;
				if (this.container.querySelector('button')) {
					active = this.container.querySelector('button').previousElementSibling;
				} else {
					active = this.slides[this.slides.length - 1];
				}
				this.container.insertBefore(active, this.slides[0]);
				this.decorizeSlides();
			});
		})
		
	}

	autoNext() {
		if (this.autoplay) {
			if (this.interval) clearInterval(this.interval);
			this.interval = setInterval(() => this.next[0].click(), 5000);
		}
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
			this.decorizeSlides();
			this.autoNext();
			this.container.addEventListener('mouseenter', () => {
				clearInterval(this.interval);
			});
			this.container.addEventListener('mouseleave', () => {
				this.autoNext();
			});

		} catch (e) {}
	}
}