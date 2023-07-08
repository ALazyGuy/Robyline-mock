let iti = null;

const masks = {
    ru: '(XXX) XXX-XX-XX',
    by: '(XX) XXX-XX-XX',
    kz: '(XXX) XXX-XX-XX',
    uz: '(XX) XXX-XX-XX',
    ua: '(XX) XXX-XX-XX',
    pl: '(XX) XXX-XX-XX',
    tm: '(XXX) XX-XX-X',
    tj: '(XXX) XX-XX-XX',
    kg: '(XXX) XX-XX-XX'
};

class PhoneMask {
    constructor() {
        this.value = '';
        this.mask = '';
        this.previouseLength = 0;
        this.maskLength = 0;
    }

    setMask(mask) {
        this.mask = mask;
        this.cleanMask = this.mask.split('').filter(c => 'X' === c).join('');
        this.maskLength = this.mask.length;
    }

    isValid() {
        return this.cleanMask.length === this.value.length;
    }

    onInput(element) {
        let data = element.value;
        if (data.length > this.maskLength) {
            data = data.substring(0, this.maskLength);
        }

        if(this.previouseLength > data.length) {
            let done = false;
            data = data.split('').reverse().filter(c => {                
                if(done) {
                    return true;
                }

                const isDigit = /\d/.test(c);
                if(isDigit) {
                    done = true;
                    return true;
                }

                return false;
            }).reverse().join('');
        }

        if (data.length > 0) {
            this.value = data.split('').filter(c => /[0-9]/.test(c)).join('');
        } else {
            this.value = '';
        }

        this.previouseLength = data.length;
        element.value = this.getMaskedOutput();
    }

    getMaskedOutput() {
        let result = '';

        let counter = 0;

        for (let c of this.mask.split('')) {
            if (c === 'X') {
                if (this.value.length <= counter) {
                    break;
                }

                result += this.value[counter++];
                if(counter === this.value.length) {
                    break;
                }
            } else {
                result += c;
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

    const showValidationResults = (element, expression, onError) => {
        if (!expression) {
            element.classList.add('invalid');
            onError.style.display = 'block';
            return false;
        } else {
            element.classList.remove('invalid');
            onError.style.display = 'none';
            return true;
        }
    };

    const validate = (element, pattern, onError) => {
        const value = element.value;
        return showValidationResults(element, pattern.test(value), onError);
    };

    const onFormFilled = (e) => {
        let success = true;
        success = success * showValidationResults(phone, mask.isValid(), phoneInvalid);
        success = success * validate(email, emailRegExp, emailInvalid);

        if (!success) {
            e.preventDefault();
        }

        input.value = `+${iti.s.dialCode} ${input.value}`; 
    };

    const clean = (element, onError) => {
        element.classList.remove('invalid');
        onError.style.display = 'none';
    };

    mask.setMask(masks['ru']);

    phone.onkeydown = () => clean(phone, phoneInvalid);
    email.onkeydown = () => clean(email, emailInvalid);

    phone.onfocusout = () => showValidationResults(phone, mask.isValid(), phoneInvalid);
    email.onfocusout = () => validate(email, emailRegExp, emailInvalid);

    phone.addEventListener('input', e => mask.onInput(e.target));

    submit.onclick = onFormFilled;

    const input = document.querySelector("#phone");
    iti = window.intlTelInput(input, {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
        autoPlaceholder: 'off',
        initialCountry: 'ru',
        separateDialCode: true,
        onlyCountries: ['ru', 'by', 'kz', 'uz', 'ua', 'pl', 'tm', 'tj', 'kg'],
    });

    input.placeholder = masks['ru'];

    input.addEventListener("countrychange", function () {
        mask.setMask(masks[iti.s.iso2]);
        input.value = '';
        input.placeholder = masks[iti.s.iso2];
        clean(input, phoneInvalid);
    });
};