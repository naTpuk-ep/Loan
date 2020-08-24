export default class Accordeon {

	constructor (trigger) {
		this.triggers = document.querySelectorAll(trigger);
	}


	init() { 
	
		try {
			this.triggers.forEach(trigger => {
				let msg = trigger.closest('.module__info-show').nextElementSibling;
				msg.style.cssText = `
				display: block;
				max-height: 0px;
				overflow: hidden;
				transition: 0.5s ease;
				opacity: 0;
				`
				trigger.addEventListener('click', () => {
					if (msg.style.maxHeight == '0px'){
						trigger.querySelector('path').style.display = 'none';
						msg.style.maxHeight = `${msg.scrollHeight}px`;
						msg.style.opacity = 1;
					} else {
						trigger.querySelector('path').style.display = '';
						msg.style.maxHeight = '0px';
						msg.style.opacity = 0;
					}
				})
			})
		}catch(e){}
	}
}