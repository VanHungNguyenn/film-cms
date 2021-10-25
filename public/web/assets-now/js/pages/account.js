"use strict";
var KTWizard3 = function() {
    var _wizardEl;
    var _formEl;
    var _wizardObj;
    var _validations = [];
    var _initWizard = function() {
        _wizardObj = new KTWizard(_wizardEl, {
            startStep: 1,
            clickableSteps: true
        });
        _wizardObj.on('change', function(wizard) {
            if (wizard.getStep() > wizard.getNewStep()) {
                return;
            }
            var validator = _validations[wizard.getStep() - 1];
            if (validator) {
                validator.validate().then(function(status) {
                    if (status == 'Valid') {
                        if (wizard.getStep() == 2) {
                            let credentials = $("#credentials").val();
                            $.ajax({
                                type: "POST",
                                url: `/${dashboard}/drive/auth/`,
                                data: `credentials=${credentials}`,
                                success: function(data) {
                                    if (data.status == 1) {
                                        $("#url").val(data.url);
                                        wizard.goTo(wizard.getNewStep());
                                        KTUtil.scrollTop();
                                    } else {
                                        toastr.error(data.msg);
                                    }
                                },
                                error: function() {
                                    toastr.error("Error");
                                }
                            });
                        } else {
                            wizard.goTo(wizard.getNewStep());
                            KTUtil.scrollTop();
                        }
                    } else {
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-light"
                            }
                        }).then(function() {
                            KTUtil.scrollTop();
                        });
                    }
                });
            }
            return false;
        });
        _wizardObj.on('changed', function(wizard) {
            KTUtil.scrollTop();
        });
        _wizardObj.on('submit', function(wizard) {
            var validator = _validations[wizard.getStep() - 1];
            if (validator) {
                validator.validate().then(function(status) {
                    if (status == 'Valid') {
                        var email = $("#email").val();
                        var credentials = $("#credentials").val();
                        var code = $("#code").val();
                        $.ajax({
                            type: "POST",
                            url: `/${dashboard}/drive/add`,
                            data: `email=${email}&code=${code}&credentials=${credentials}`,
                            success: function(data) {
                                if (data.status == 1) {
                                    toastr.success("Thêm tài khoản google thành công");
                                    setTimeout(() => {
                                        location.assign(data.redirect);
                                    }, 2000);
                                } else {
                                    toastr.error(data.msg);
                                }
                            }
                        });
                    } else {
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-light"
                            }
                        }).then(function() {
                            KTUtil.scrollTop();
                        });
                    }
                });
            }
        });
    }
    var _initValidation = function() {
        _validations.push(FormValidation.formValidation(_formEl, {
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Email is required'
                        }
                    }
                }
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap({
                    eleValidClass: '',
                })
            }
        }));
        _validations.push(FormValidation.formValidation(_formEl, {
            fields: {
                credentials: {
                    validators: {
                        notEmpty: {
                            message: 'Credentials is required'
                        }
                    }
                }
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap({
                    eleValidClass: '',
                })
            }
        }));
        _validations.push(FormValidation.formValidation(_formEl, {
            fields: {
                code: {
                    validators: {
                        notEmpty: {
                            message: 'Code is required'
                        }
                    }
                }
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap({
                    eleValidClass: '',
                })
            }
        }));
    }
    return {
        init: function() {
            _wizardEl = KTUtil.getById('kt_wizard_v3');
            _formEl = KTUtil.getById('kt_form');
            _initWizard();
            _initValidation();
        }
    };
}();
jQuery(document).ready(function() {
    KTWizard3.init();
    new ClipboardJS('[data-clipboard=true]').on('success', function(e) {
        e.clearSelection();
        toastr.success("Copied!");
    });
});