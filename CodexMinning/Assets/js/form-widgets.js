//== Class definition

var FormWidgets = function () {
    //== Private functions
    var validator;

    var initWidgets = function() {
        // datepicker
        $('.m_datepicker').datepicker({
            todayHighlight: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        });


        // select2
        $('.m_select2').select2({
            placeholder: "Select a state",
        });
        $('#m_select2').on('select2:change', function(){
            validator.element($(this)); // validate element
        });


    }
    
    

    return {
        // public functions
        init: function() {
            initWidgets(); 
           
        }
    };
}();

jQuery(document).ready(function() {    
    FormWidgets.init();
});