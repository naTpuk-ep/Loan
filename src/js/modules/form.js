export default class Form {
	constructor(forms) {
		this.forms = document.querySelectorAll(forms);
		this.inputs = document.querySelectorAll('input');
		this.message = {
			loading: 'Загрузка...',
			success: 'Спасибо! Мы скоро с вами свяжемся',
			failure: 'Ошибка'
		}
		this.path = 'assets/question.php';
	}

	clearInputs() {	
		this.inputs.forEach(input => {
			if (input.type !== 'submit') input.value = '';
		});
	}

	checkEmailInputs() {	
		const Emailinputs = document.querySelectorAll('[type="email"]');
		Emailinputs.forEach(input => {
			input.addEventListener('input', function() {
				input.value = input.value.replace(/[а-яё]/ig, '');
			});
		});
	}

	mask() {	
		let setCursorPosition = (pos, elem) => {
			if (elem.selectionStart < 2) {
				elem.selectionStart = 2;
			};
			elem.focus();
			if (elem.setSelectionRange) {	// кроссбраузерная проверка
					elem.setSelectionRange(pos, pos);
			} else if (elem.createTextRange) {
				let range = elem.createTextRange();
				range.collapse(true);
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			};
		};
		function createMask(event) {
			let matrix = '+1 (___) ___-____',
				i = 0,
				def = matrix.replace(/\D/g, ''),
				val = this.value.replace(/\D/g, '');
			if (def.length > val.length){
				val = def;
			};
			if (val.charAt(i) != 1) {
				if (val.length <= 1) {
					val = val.replace(/(\d)/, '1$1');
				} else {
					val = val.replace(/(\d)(\d)/, '1$1');
				};
			};
			this.value = matrix.replace(/[_\d]/g, function(a) {
				return val.charAt(i++) || '_';
			});
			this.value.split('').forEach((a, index) => {
				if (!isNaN(a) && a != ' ') i = index+1;
				if (i < 5) i = this.value.indexOf('_');
			});
			if (event.type === 'click') {
				i = this.value.indexOf('_');
				event.target.removeEventListener('click', createMask);
			};
			setCursorPosition(i, this);
		};
			let inputs = document.querySelectorAll('#phone');
			inputs.forEach(input => {
				input.addEventListener('input', createMask);
				input.addEventListener('blur', () => {
					input.addEventListener('click', createMask);
				});
				input.addEventListener('focus', createMask);
				input.addEventListener('click', createMask);
			});
	}

	async postData (url, data) {
		let res = await fetch(url, {
			method: 'POST',
			body: data
		});
		 return await res.text();
	}

	init() {	
		this.checkEmailInputs();
		this.mask();
		this.forms.forEach(form => {
			form.addEventListener('submit', (e)=> {
				e.preventDefault();
				let statusMessage = document.createElement('div');
				statusMessage.style.cssText = `
					margin-top: 15px;
					font-size: 18px;
					color: grey;
				`;
				form.parentNode.appendChild(statusMessage);
				statusMessage.textContent = this.message.loading;
				const formData = new FormData(form);
				this.postData(this.path, formData)
					.then(resp => {
						console.log(resp);
						statusMessage.textContent = this.message.success;
					})
					.catch(() => {
						statusMessage.textContent = this.message.failure;
					})
					.finally(() => {
						this.clearInputs();
						setTimeout(() => {
							statusMessage.remove();
						}, 1500);
					});
			});
		});
	}
}