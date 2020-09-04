export default class Download {
	constructor (triggers) {
		this.triggers = document.querySelectorAll(triggers);
		this.path = 'assets/img/mainbg.jpg';
	}

	downloadItem(path) {	
		const link = document.createElement('a');
		link.setAttribute('href', path);
		link.setAttribute('download', 'nice_picture');
		link.style.display = 'none';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	init() {	
		this.triggers.forEach(trigger => {
			trigger.style.cursor = 'pointer';
			trigger.addEventListener('click', (e) => {
				this.downloadItem(this.path);
			});
		});
	}
}