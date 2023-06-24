class PhoneMask {
    constructor() {
        this.value = '';
    }

    onInput(element) {
        let data = element.value;
        if (data.length > 19) {
            data = data.substring(0, 19);
        }
        if (data === '+375 ' || data === '+37' || data === '+3' || data === '+') {
            this.value = '';
        } else {
            if (!data.startsWith('+375 (') && data.length > 0) {
                this.value = data.split('').filter(c => /[0-9]/.test(c)).join('');
            } else if (data.length > 0) {
                const temp = data.substring(6);
                this.value = temp.split('').filter(c => /[0-9]/.test(c)).join('');
            }
        }

        element.value = this.getMaskedOutput();
    }

    getMaskedOutput() {
        let result = '+375 (';

        if(this.value.length > 0) {
            if(this.value.length > 2) {
                result += this.value.substring(0, 2) + ') ';
            } else {
                result += this.value.substring(0);
            }
        } else {
            return result;
        }

        if(this.value.length > 2) {
            if(this.value.length > 5) {
                result += this.value.substring(2, 5) + '-';
            } else {
                result += this.value.substring(2);
            }
        }

        if(this.value.length > 5) {
            if(this.value.length > 7) {
                result += this.value.substring(5, 7) + '-';
            } else {
                result += this.value.substring(5);
            }
        }

        if(this.value.length > 7) {
            if(this.value.length > 9) {
                result += this.value.substring(7, 9);
            } else {
                result += this.value.substring(7);
            }
        }

        return result;
    }
}

window.onload = () => {
    const submit = document.getElementById('submit');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const emailInvalid = document.getElementById('emailError');
    const phoneInvalid = document.getElementById('phoneError');

    const phoneRegExp = /^\+375\s\(\d{2}\)\s\d{3}\-\d{2}\-\d{2}$/;
    const emailRegExp = /^[a-zA-Z0-9_\.]+@[a-zA-Z]+\.[a-zA-Z]+$/;

    const mask = new PhoneMask();

    const validate = (element, pattern, onError) => {
        const value = element.value;

        if (!pattern.test(value)) {
            element.classList.add('invalid');
            onError.style.display = 'block';
            return false;
        } else {
            element.classList.remove('invalid');
            onError.style.display = 'none';
            return true;
        }
    };

    const onFormFilled = (e) => {
        let success = true;
        success = success * validate(phone, phoneRegExp, phoneInvalid);
        success = success * validate(email, emailRegExp, emailInvalid);

        if (!success) {
            e.preventDefault();
        }
    };

    const clean = (element, onError) => {
        element.classList.remove('invalid');
        onError.style.display = 'none';
    };

    phone.onkeydown = () => clean(phone, phoneInvalid);
    email.onkeydown = () => clean(email, emailInvalid);

    phone.onfocusout = () => validate(phone, phoneRegExp, phoneInvalid);
    email.onfocusout = () => validate(email, emailRegExp, emailInvalid);

    phone.addEventListener('input', e => mask.onInput(e.target));

    submit.onclick = onFormFilled;
};