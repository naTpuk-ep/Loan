export default class Slider {
	constructor({container = null, next = null, prev = null, activeClass = '', animate, auto} = {}) {
		this.container = document.querySelector(container);
		try {
			this.slides = this.container.children;
		} catch (e){}
		this.prev = document.querySelectorAll(prev);
		this.next = document.querySelectorAll(next);
		this.activeClass = activeClass;
		this.animate = animate;
		this.auto = auto;
		this.slideIndex = 0;
	}
}