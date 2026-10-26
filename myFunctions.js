

$(document).ready(function () {

    $(".showDetails").click(function () {
        $(this).closest("tr").next().toggle();
    });

    $("#bntContinue").click(function () {
        var count = $(".selectCar:checked").length;
        if (count == 0) {
        
            alert("الرجاء اختيار سيارة واحدة على الأقل");
        } else {
          
            $("#bookingForm").slideDown();
        }
    });

   
    $("#sendBtn").click(function () {
        sendForm();
    });
});





function setError(fieldId, message) {
    $("#" + fieldId).addClass("invalid");
    $("#" + fieldId + "Err").text(message);
}

function clearErrors() {
    $("input").removeClass("invalid");
    $(".err").text("");
}



function checkName(name) {
   if(name==""){
    return true
   }
}


function checkNationalId(id) {
    // {11} => 11 رقم فقط
    if (!/^[0-9]{11}$/.test(id)) {
        return false;
    }
    var province = Number(id.substring(0, 2));   
    return province >= 1 && province <= 14;
}

function checkPhone(phone) {
    if (phone == "") {
        return true;
    }
   
    return /^(093|094|095|096|098|099)[0-9]{7}$/.test(phone);
}


function checkEmail(email) {
    if (email == "") {
        return true;
    }
   
    return /^[^ @]+@[^ @]+\.[^ @]+$/.test(email);
}



function sendForm() {

    
    var name = $("#fullName").val();
    var id = $("#nationalId").val();
    var start = $("#startDate").val();   
    var end = $("#endDate").val();
    var phone = $("#phone").val();
    var email = $("#email").val();

    clearErrors();
    var ok = true;      

 
    if (!checkNationalId(id)) {
        setError("nationalId", "الرقم الوطني إلزامي: 11 رقماً وأول رقمين من 01 إلى 14");
        ok = false;
    }
    if (!checkPhone(phone)) {
        setError("phone", "رقم الموبايل غير صحيح (Syriatel أو MTN)");
        ok = false;
    }
    if (!checkEmail(email)) {
        setError("email", "البريد الإلكتروني غير صحيح");
        ok = false;
    }

 
    if (start == "") {
        setError("startDate", "تاريخ البداية إلزامي");
        ok = false;
    }
    if (end == "") {
        setError("endDate", "تاريخ النهاية إلزامي");
        ok = false;
    }
    if (start != "" && end != "" && end <= start) {
        setError("endDate", "تاريخ النهاية يجب أن يكون بعد تاريخ البداية");
        ok = false;
    }

 
    if (ok == false) {
        return;
    }

   
    var days = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);


    var result = "عدد أيام التأجير: " + days + "\n\n";
    var total = 0;

    $(".selectCar:checked").each(function () {
        var cells = $(this).closest("tr").find("td");
        var code = cells.eq(0).text();
        var model = cells.eq(2).text();
        var price = parseInt(cells.eq(4).text(), 10);
        var carTotal = price * days;
        total = total + carTotal;
        
        result = result + "الرمز: " + code + "\n";
        result = result + "السيارة: " + model + "\n";
        result = result + "السعر اليومي: " + price + " ل.س\n";
        result = result + "عدد الأيام: " + days + "\n";
        result = result + "إجمالي السيارة: " + carTotal + " ل.س\n\n";
    });


    var discount = 0;
    if (days > 7) {
        discount = total * 0.10;
    }
    var finalAmount = total - discount;

    result = result + "\nالمجموع: " + total + " ل.س";
    result = result + "\nالخصم: " + discount + " ل.س";
    result = result + "\nالمبلغ النهائي: " + finalAmount + " ل.س";

    alert(result);
}