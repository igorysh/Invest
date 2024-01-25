/*(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MWBSDZK');*/

let inputs = $(document).find('input[type="text"]');

inputs.on('focus', function(){
    let $this = $(this);
    $this.removeClass('error');
});

function formValidate(form){
    let inputs = form.find('input[type="text"]');
    let status = true;

    inputs.each(function(){
        let $this = $(this);
        if ($this.val() == ''){
            $this.addClass('error');
            status = false;
        }
    });

    return status;
}

$(document).on('submit', '.js-invest__form', function(e){
    e.preventDefault();
    let f = $(this);
    let wrap = f.closest('section');
    if (!formValidate(f)){ return false; }
    $.ajax({
        type: "POST",
        url: "https://mohylevskyi.digital/invest/assets/php/mail.php",
        data: f.serialize(),
    }).done(function(res) {
        if (res == 'OK'){
            f.find('input, button').prop('disabled', true);
            f.find('input').val('');
            wrap.addClass('success');
            setTimeout(function(){
                wrap.removeClass('success');
            }, 4000);
        } else {
            console.log('Error');
        }
    });   
});