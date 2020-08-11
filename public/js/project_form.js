
function sendForm() {


  data={};
  data_dom=[];
  descriptions=["","Тел: ", "Email: "];

    $("#changeContactForm .forminput").each(function(){data[$(this).attr('id')]=$(this).val(); data_dom.push($(this).val());  }); //Creates data JSON by inputs in #rightbar and ids.



    $.ajax({
      url: "saveContact.php",
      method: "POST",
      data: data,

      success: function() {
        $('.contact > p').each(function(i){$(this).html(descriptions[i]+data_dom[i]);}); //Places contact info directly to DOM
        alert("Изменения сохранены");

      },
      error: function() {
        alert("Ошибка");
      }
    }); 
  }

  function uploadFile(p) {
    var fd = new FormData();    
    console.log(p);
    attachement=p.files[0];
    fd.append('attachment', attachement, attachement.name);


    $.ajax({
      url: "/uploadFile.php",
      method: "POST",
      data: fd,
      processData: false,
      contentType: false,

      success: function() {
        alert("Файл загружен");
      },
      error: function() {
        alert("Ошибка");
      }
    });

  }