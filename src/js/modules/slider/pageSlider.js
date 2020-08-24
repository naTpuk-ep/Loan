import Slider from "./slider";

export default class PageSlider extends Slider {
	constructor(next, prev) {
		super(next, prev);
	}


	hansonShow() {
	
		try {
			this.hanson.style.opacity = '0';
			if (this.slides[1].classList.contains('modules')) {
				this.hanson.classList.add('animated');
				setTimeout(() => {
					this.hanson.style.opacity = '1';
					this.hanson.classList.add('slideInUp');
				}, 3000);
			} else {
				this.hanson.classList.remove('slideInUp');
			}
		} catch(e){}
	}


	startShow()	{

		this.slides.forEach(slide => {
			slide.style.display = 'none';
			slide.style.transition = 'all 0.5s cubic-bezier(0.72, -0.35, 1, 1) 0s';
		});
		this.slides[0].style.display = 'block';
		this.firstSlide = this.slides[0];
	}


	showNextSlides(auto) {
		
		this.slides[1].style.display = 'block';
		this.slides[0].style.marginTop = `-${window.getComputedStyle(this.slides[0]).height}`;
		this.slides[0].addEventListener('transitionend', () => {
			this.container.appendChild(this.slides[0]);
			this.slides[this.slides.length - 1].style.marginTop = '0px';
			if (auto & this.slides[0] != this.firstSlide) {
				return this.showNextSlides(true);
			} else {
				this.slides.forEach((slide, i) => {
					slide.style.transition = 'all 0.5s cubic-bezier(0.72, -0.35, 1, 1) 0s';
				});
			}
		}, {once:true});
	}


	showPrevSlide(){
	
		this.slides[this.slides.length - 1].style.display = 'block';
			this.slides[this.slides.length - 1].style.marginTop = `-${window.getComputedStyle(this.slides[this.slides.length - 1]).height}`;
			this.container.prepend(this.slides[this.slides.length - 1]);
			setTimeout(() => {
				this.slides[0].style.marginTop = '0px';
			});
	}


	bindTriggers() {
	
		this.next.forEach(btn => {
			btn.style.cursor = 'pointer';
			btn.addEventListener('click', () => {
				this.hansonShow();
				this.showNextSlides();
			});
			if (btn.parentNode.previousElementSibling.tagName == 'A') {
				btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
					e.preventDefault();
					// if (this.slides[0] != this.firstSlide) {
						let sek = 0.2;
						this.slides.forEach((slide, i) => {
							if (i != 0) {
								sek < 0.1 ? sek = 0.1 : sek;
								slide.style.transition = `all linear ${sek -= 0.02}s`;
							}
						});
						this.showNextSlides(true);
					// }
					
				});
			};
		});
		this.prev.forEach(btn => {
			btn.style.cursor = 'pointer';
			btn.addEventListener('click', () => {
				this.showPrevSlide();
			});
		});
	}


	render() {
	
		if (this.container) {
			try {
				this.hanson = document.querySelector('.hanson');
			} catch(e){}
			this.startShow();
			this.bindTriggers();
		}
	}
};