// Validator object
function validator(object){

    //ham thuc hien validate
    function validate(inputElement,rule){
        var errorMassage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector('.form-message')
        if(errorMassage){
            errorElement.innerHTML = errorMassage;
            inputElement.parentElement.classList.add('invalid');
            
        }else{
            errorElement.innerHTML = "";
            inputElement.parentElement.classList.remove('invalid')
        }
    }
    
    function removeError(){
        
    }

    //1.lay element cua form can validate
    var formElement = document.querySelector(object.form)
    if(formElement){
        object.rules.forEach (function(rule){
            var inputElement =  formElement.querySelector(rule.selector)
            if (inputElement) {
                inputElement.onblur = function (){
                    //value : inputElement.value
                    //test func  : \rule.test
                    validate(inputElement, rule)
                }
            }
        })
    }
}






//dinh nghia cac rules
//1.khi co loi  tra ra message loi
//2.khi hop le => undefine
validator.isRequired = function(selector){
    return {
        selector : selector,
        test : function (value){
            return value.trim() ? undefined : "Vui long nhap truong nay"
        }
    }
}

validator.isEmail = function (selector){
    return {
        selector: selector,
        test : function (value) {
            var emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return emailValidation.test(value) ? undefined : "Field nay phai la Email"
        }
        
    }
}

