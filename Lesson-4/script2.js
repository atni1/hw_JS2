class Form{
    static patternName = /^[а-яёА-ЯЁ\s]+$/;
    static patternTell = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
	static patternMail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;

    static getElement(el) {
        return el.parentElement.nextElementSibling;
    }
    
	static errorMess = [
		'Незаполненное поле ввода', // 0
		'Введите Ваше реальное имя', // 1
		'Укажите Вашу электронную почту', // 2
		'Неверный формат электронной почты', // 3
		'Укажите Ваш номер телефона', // 4
		'Неверный вормат номера телефона' // 5
	];
    constructor(form){
        this.form = form;
        this.fields = this.form.querySelectorAll('.form-control');
        this.btn = this.form.querySelector('[type=submit]');
        this.iserror = false;
        this.registerEventsHandler();
    }
    registerEventsHandler() {
        this.btn.addEventListener('click', this.validForm.bind(this));
	    this.form.addEventListener('focus', () => {
		    const el = document.activeElement;
		    if (el === this.btn) return;
		    this.cleanError(el);
	    }, true);
        for (let field of this.fields) {
            field.addEventListener('blur', this.validBlurField.bind(this));
        }
    }
    validForm(e) {
	    e.preventDefault();
	    const formData = new FormData(this.form);
	    let error;
	    for (let property of formData.keys()) {
		    error = this.getError(formData, property);
            if (error.length == 0) continue;
            this.iserror = true;
            this.showError(property, error);
	    }
        if (this.iserror) return;
    }
    validBlurField(e) {
        const target = e.target;
        const property = target.getAttribute('name');
        const value = target.value;
        const formData = new FormData();
        formData.append(property, value);
        const error = this.getError(formData, property);
        if (error.length == 0) return;
        this.showError(property, error);
    }
    getError(formData, property) {
        let error = '';
        const validate = {
            username: () => {
                if (formData.get('username').length == 0 || Form.patternName.test(formData.get('username')) == false) {
                    error = Form.errorMess[1];
                }
            },
            usermail: () => {
                if (formData.get('usermail').length == 0) {
                    error = Form.errorMess[2];
                } else if (Form.patternMail.test(formData.get('usermail')) == false) {
                    error = Form.errorMess[3];
                }
            },
            telefon: () => {
                // console.log(Form.patternTell.test(formData.get('telefon')));
                if (formData.get('telefon').length == 0) {
                    error = Form.errorMess[4];
                } else if (Form.patternTell.test(formData.get('telefon')) == false) {
                    error = Form.errorMess[5];
                }
            },
        }
        if (property in validate) {
            validate[property]();
        }
        return error;
    }
    showError(property, error) {
        const el = this.form.querySelector(`[name=${property}]`);
        const errorBox = Form.getElement(el);
        el.classList.add('form-control_error');
        errorBox.innerHTML = error;
        errorBox.style.display = 'block';
    }
    cleanError(el) {
        const errorBox = Form.getElement(el);
        el.classList.remove('form-control_error');
        errorBox.removeAttribute('style');
        this.iserror = false;
    }
    
}


const forms = document.querySelectorAll('.registration');
for (const form of forms) {
    const f = new Form(form);
}
