export default class Difference {
	constructor(cards) {
		try {
			this.cards = document.querySelector(cards);
			this.officers = this.cards.children;
			this.counter = [];
			this.cards.style.cssText = `
				max-height: 456px;
				overflow: hidden;
				justify-content: space-around;
			`;
		} catch(e){}
	}

	bind(item, items, offIndex) {
		item.querySelector('.plus').addEventListener('click', () => {
			items[this.counter[offIndex]].style.display = 'flex';
			let mTop = window.getComputedStyle(item).marginTop;
			item.style.marginTop = `-${window.getComputedStyle(item).height}`;
			this.counter[offIndex]++;
			setTimeout(() => {
				items[this.counter[offIndex] - 1].style.opacity = '1';
				item.style.transition = 'all ease .5s';
				item.style.marginTop = mTop;
			});
		});
		item.addEventListener('transitionend', () => {
			item.style.transition = 'none';
			if (this.counter[offIndex] === items.length - 1) {
				item.remove();
			};
		});
	}

	hide() {	
		this.officers.forEach((officer, offIndex) => {
			this.counter[offIndex] = 1;
			officer.children.forEach((item, i, items) => {
				if ((i !== 0) && (i !== items.length - 1)) {
					item.style.display = 'none';
					item.style.opacity = '0';
					item.style.transition = 'all ease .5s';
				}
				if (i === items.length - 1) {
					this.bind(item, items, offIndex);
				};
			});
		});
	}

	init() {
		try {
			this.hide();
		} catch(e){}
	}
}