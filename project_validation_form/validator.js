function validator  (object) {

    var selectorRules = {}

    validate = function (inputElement , rules) {
        var formMessage = inputElement.parentElement.querySelector('.form-message')
        var erroMessage;
        var ruleHandle;
        ruleHandle = selectorRules[rules.selector]
        for (var i = 0 ; i < ruleHandle.length ; ++i) {
            erroMessage = ruleHandle[i](inputElement.value)
            if(erroMessage) break;
        }

        if(erroMessage) {
            formMessage.innerHTML = erroMessage
            inputElement.parentElement.classList.add('invalid')
        }else {
            formMessage.innerHTML = ""
            inputElement.parentElement.classList.remove('invalid')
        }
        return erroMessage;
    }

    var formElement = document.querySelector(object.form)
    var nodeList = formElement.querySelectorAll('[name]')

    if(formElement) {
        
        formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormValid = true;
            object.rules.forEach(function(ele){
                var inputElement = formElement.querySelector(ele.selector)
                var isValid = validate(inputElement,ele)
                if(isValid){
                    isFormValid = false
                }
            })
            if(isFormValid) {
                var enableInput = formElement.querySelectorAll("[name]:not([disable])")
                var formValue = Array.from(enableInput).reduce((acc , ele) => 
                (acc[ele.name]  = ele.value) && acc
                ,{})
                
                object.onSubmit(formValue)
            }          
        }
        
        object.rules.forEach(function(rule) {
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            }else {
                selectorRules[rule.selector] = [rule.test]
            }
            var inputElement = formElement.querySelector(rule.selector)
            inputElement.onblur = function() {
                validate(inputElement , rule)
            }
        })
        
    }
}




validator.isRequired = function(selector) {
    return {
        selector : selector,
        test : function (value) {
            return value ? undefined : "Vui Long nhap truong nay"
        }
    }
}

validator.isEmail = function (selector) {
    return {
        selector : selector,
        test : function (value) {
            var checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return checkEmail.test(value) ? undefined : "Truong nay phai la Email"
        }
    }
}

validator.isPassword = function (selector, minLength) {
    return {
        selector : selector,
        test : function (value) {
            return value.length >= minLength ? undefined : "Mat khau dang nhap tu 8 ky tu tro len"
        }
    }
}

validator.passwordConfirmation = function (selector, getPassword) {
    return {
        selector : selector,
        test : function (value) {
            return value === getPassword() ? undefined : "Mat khau xac nhan khong trung khop"
        }
    }
}