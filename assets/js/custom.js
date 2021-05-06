(function($){
    "use strict";
// RIGHT SIDE PROGRESS BAR JS START
    $('.nxt_cntl_btn').on('click', function() {

        var currentStepNum = $('#checkout-progress').data('current-step');
        var nextStepNum = (currentStepNum + 1);
        var currentStep = $('.step.step-' + currentStepNum);
        var nextStep = $('.step.step-' + nextStepNum);
        var progressBar = $('#checkout-progress');
        $('.prev_cn_btn').removeClass('disabled');
        if(currentStepNum == 3) {
            return false;
        }
        if(nextStepNum == 3){
            $(this).addClass('disabled');
        }
        $('.checkout-progress').removeClass('.step-' + currentStepNum).addClass('.step-' + (currentStepNum + 1));
        
        currentStep.removeClass('active').addClass('valid');
        
        nextStep.addClass('active');
        progressBar.removeAttr('class').addClass('step-' + nextStepNum).data('current-step', nextStepNum);
    });   
    $('.prev_cn_btn').on('click', function() {
        
        var currentStepNum = $('#checkout-progress').data('current-step');
        var prevStepNum = (currentStepNum - 1);
        var currentStep = $('.step.step-' + currentStepNum);
        var prevStep = $('.step.step-' + prevStepNum);
        var progressBar = $('#checkout-progress');
        $('.nxt_cntl_btn').removeClass('disabled');
        if(currentStepNum == 1) {
            return false;
        }
        if(prevStepNum == 1){
            $(this).addClass('disabled');
        }
        $('.checkout-progress').removeClass('.step-' + currentStepNum).addClass('.step-' + (prevStepNum));
        
        currentStep.removeClass('active');
        
        prevStep.addClass('active').removeClass('valid');
        progressBar.removeAttr('class').addClass('step-' + prevStepNum).data('current-step', prevStepNum);
    });
    // RIGHT SIDE PROGRESS BAR JS END
    // STEP CONTROLL JS START
    $('.nx_step_1').click(function(){
        $('#step_2_right_content').show();
        $('#step_1_right_content,#step_3_right_content').hide();
    });
    $('.nx_step_2').click(function(){
        $('#step_3_right_content').show();
        $('#step_1_right_content,#step_2_right_content').hide();
    });
    $('.prv_step_1').click(function(){
        $('#step_1_right_content').show();
        $('#step_2_right_content,#step_3_right_content').hide();
    });
    $('.prv_step_2').click(function(){
        $('#step_2_right_content').show();
        $('#step_1_right_content,#step_3_right_content').hide();
    });
    // STEP CONTROLL JS END
})(jQuery);