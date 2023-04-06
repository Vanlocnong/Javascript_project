function validator (object) {
    var selectorRules = {}

    function getParent(inputElement , selector){
        while(inputElement.parentElement){
            if(inputElement.parentElement.matches(selector)){
                return inputElement.parentElement
            }
            inputElement = inputElement.parentElement
        }
    }

    function validate (inputElement , rule) {
        var parentEle = getParent(inputElement,object.formMessage)
        var formMessage = parentEle.querySelector(".form-message")
        var erroMessage;
        var ruleHandle;
        ruleHandle = selectorRules[rule.selector]
        for (var i = 0 ; i < ruleHandle.length ; i++){
            switch(inputElement.type){
                case 'radio':
                case 'checkbox':
                default:
                    erroMessage = ruleHandle[i](inputElement.value)
            }
            if(erroMessage) break;
        }
        if(erroMessage) { 
            parentEle.classList.add("invalid")
            formMessage.innerHTML = erroMessage
        }else{
            parentEle.classList.remove("invalid")
            formMessage.innerHTML = ""
        }
        return erroMessage
    }
    var formValidator = document.querySelector(object.form)

    if(formValidator) {
        formValidator.onsubmit = function (events){
            events.preventDefault();
            var isFormValid = true;
            object.rules.forEach(function(rule){
                var inputElement = formValidator.querySelector(rule.selector)
                var validResult = validate(inputElement , rule)
                if(validResult){
                    isFormValid = false;
                }
            })
            if(isFormValid){
                var enableInput = formValidator.querySelectorAll("[name]:not([disable])")
                var nodeListToArray = Array.from(enableInput)
                var data = nodeListToArray.reduce((acc,element , index) => {
                    return (acc[element.name]  = element.value) && acc
                },{})
                
            }
            if(typeof object.onSubmit === 'function'){
                object.onSubmit(data)
            }
        }
        object.rules.forEach(function(rule) {
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test)
            }
            else{
                selectorRules[rule.selector] = [rule.test]
            }
            var inputElement = formValidator.querySelector(rule.selector)
            inputElement.onblur  = function (e) {
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