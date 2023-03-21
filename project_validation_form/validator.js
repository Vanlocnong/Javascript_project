function validator (object){


    //tao phuong thuc validat de kiem thuc hien kiem tra va cap nhat HTML
    //dua vao value cua inputElement & ket qua tra tu pthuc test cua doi tuong 

    function validate(inputElement , rule){
        var formMessage = inputElement.parentElement.querySelector('.form-message')
        var errorMessage = rule.test(inputElement.value)
        if(errorMessage){
            formMessage.innerHTML = errorMessage
            inputElement.parentElement.classList.add('invalid')
        }else {
            formMessage.innerHTML = ""
            inputElement.parentElement.classList.remove('invalid')
        }
    }
    function clearErrorMessage (inputElement){
        var formMessage = inputElement.parentElement.querySelector('.form-message')
        formMessage.innerHTML = ""
        inputElement.parentElement.classList.remove("invalid")
    }

    //lay ra form can validate
    let formElement = document.querySelector(object.form)
    if(formElement) {
        object.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector)
            if(inputElement) {
                inputElement.onblur = function() {
                    validate(inputElement,rule)
                }
                inputElement.oninput = function () {
                    clearErrorMessage(inputElement)
                }
                
            }
            
        })
    }
}



validator.isRequired = function(selector){
    return {
        selector : selector,
        test : function (value){
            return value.trim() ? undefined : "Vui long nhap fied nay"
        }
    }
}

validator.isEmail = function(selector){
    return {
        selector : selector,
        test : function (value){
            var checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return checkEmail.test(value) ? undefined : "Fied nay phai la Email"
        }
    }
}

validator.checkPassword = function (selector , min) {
    return {
        selector : selector,
        test : function (value){
            if (value.length >= min){
                return undefined
            }else {
                return "Mat khau khoi tao tu 7 ky tu tro len"
            }
        }
    }
}

validator.confirmPassword = function (selector , getConfirmValue) {
    return {
        selector : selector,
        test : function (value){
            return value === getConfirmValue() ? undefined : "Mat khau xac nhan khong trung khop"
        }
    }
}