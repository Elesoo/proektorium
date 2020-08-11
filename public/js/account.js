function changeFormState(onlyChange=0) {
  if ($('#savebutton').html()=="Сохранить") {

    if (onlyChange==0) {
      sendForm();
      return;
    } 

    $('#rightbar input, #rightbar select, #rightbar option, #rightbar textarea').prop('disabled', true).addClass('readonlyinputs');
    $('#savebutton').html("Редактировать");
    $('#addCareer').hide();
    $('#addLecture').hide();
    $('#addProgram').hide();
    $('#changeContactAvatar').hide();




  } else {
   $('#rightbar input, #rightbar select, #rightbar option, #rightbar textarea').prop('disabled', false).removeClass('readonlyinputs');
   $('#savebutton').html("Сохранить");
    $('#addCareer').show();
    $('#addLecture').show();
    $('#addProgram').show();
    $('#changeContactAvatar').show();


   return;
 }

}



  function replaceInputs() {
    $('input').each(function() {id=$(this).attr('id'); ph=$(this).attr("placeholder"); $(this).replaceWith(`<div class=\"form-group row\">
      <label for=\"livingplace\" class=\"col-sm-3 col-form-label\">`+ph+`</label>
      <div class=\"col-sm-9\">
      <input class="forminput" id=\"`+id+`\">
      </div>
      </div>`);   });
  }



function sendForm() {


  data={};
    $("#rightbar .forminput").each(function(){data[$(this).attr('id')]=$(this).val()}); //Creates data JSON by inputs in #rightbar and ids.

    $.ajax({
      url: "/user/save",
      method: "POST",
      data: data,

      success: function() {
        changeFormState(1);
        alert("Изменения сохранены");
      },
      error: function() {
        alert("Ошибка");
      }
    }); 
  }


  function uploadPhoto(p, isContactAvatar=false) {
    var fd = new FormData();    
    console.log(p);
    attachement=p.files[0];
    fd.append('attachment', attachement, attachement.name);
    Url="/user/changeAvatar";
    if (isContactAvatar) { Url='/user/changeContactAvatar';}

    $.ajax({
      url: Url,
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

/*Career form*/

  function updateCareerList() {
    currPositions=[];
    currOrgs=[];
    currCareer=[];
    currInns=[];

    $(".careerOrgInput").each(function() {if($(this).val()=='') return; currOrgs.push($(this).val());});
    $(".careerPosInput").each(function() {if($(this).val()=='') return; currPositions.push($(this).val());});
    $(".careerInnInput").each(function() {if($(this).val()=='') return; currInns.push($(this).val());});

    for (var i=0; i<currPositions.length; i++) {
      currCareer[i]={};
      currCareer[i]['org']=currOrgs[i];
      currCareer[i]['position']=currPositions[i];
      currCareer[i]['inn']=currInns[i];

    }

    $('#positions').val(JSON.stringify(currCareer));
  }

    function parseCareer() { //Turns JSON career to fields
    lastRow=$(".careerOrgInput").last().parent().parent().parent();

    if ( $('#positions').val() == '' || $('#positions').val() == undefined ){
      return
    } else {
      arr=JSON.parse($('#positions').val());
    }

    lastRow.find('.careerOrgInput').first().val(arr[0]['org']);
    lastRow.find('.careerPosInput').first().val(arr[0]['position']);
    lastRow.find('.careerInnInput').first().val(arr[0]['inn']);


    for (var i=arr.length-1; i>0; i--) {
      clone=lastRow.clone();
      clone.find('.careerOrgInput').first().val(arr[i]['org']);
      clone.find('.careerPosInput').first().val(arr[i]['position']);
      clone.find('.careerInnInput').first().val(arr[i]['inn']);


      lastRow.after(clone);
    }

  }

    function addCareer() {

    lastRow=$(".careerOrgInput").last().parent().parent().parent();
    if ($(".careerOrgInput").last().val()=='' && $(".careerPosInput").last().val()=='') return;
    clone=lastRow.clone();
    clone.find('input').val('');
    lastRow.after(clone);
  }

  /*Lectures form*/
  function updateLecturesList() {
    currLectures=[];
    currNames=[];
    currDescs=[];

    $(".profintNameInput").each(function() {if($(this).val()=='') return; currNames.push($(this).val());});
    $(".profintDescInput").each(function() {if($(this).val()=='') return; currDescs.push($(this).val());});

    for (var i=0; i<currNames.length; i++) {
      currLectures[i]={};
      currLectures[i]['name']=currNames[i];
      currLectures[i]['desc']=currDescs[i];
    }


    $('#professional_interests').val(JSON.stringify(currLectures));
  }


  function addLecture() {
    lastRow=$(".profintNameInput").last().parent().parent().parent();


    if ($(".profintNameInput").last().val()=='' && $(".profintDescInput").last().val()=='') return;
    clone=lastRow.clone();
    clone.find('input, textarea').val('');
    lastRow.after(clone);
  }




  function parseLectures() { //Turns JSON lectures list to fields
    lastRow=$(".profintNameInput").last().parent().parent().parent();

    if ($('#professional_interests').val() == '' || $('#professional_interests').val() == undefined){
      return;
    } else {
      arr=JSON.parse($('#professional_interests').val());
    }

    lastRow.find('.profintNameInput').first().val(arr[0]['name']);
    lastRow.find('.profintDescInput').first().val(arr[0]['desc']);

    for (var i=arr.length-1; i>0; i--) {
      clone=lastRow.clone();
      clone.find('.profintNameInput').first().val(arr[i]['name']);
      clone.find('.profintDescInput').first().val(arr[i]['desc']);

      lastRow.after(clone);
    }

  }


/* Programm Form */

  function updateProgramList() {
    currProgram=[];
    currProgramSelect=[];
    currProgramFio=[];

    $(".type_programm").each(function() {if($(this).val()=='') return; currProgramSelect.push($(this).val());});
    $(".fio_spiker").each(function() {if($(this).val()=='') return; currProgramFio.push($(this).val());});

    for (var i=0; i<currProgramSelect.length; i++) {
      currProgram[i]={};
      currProgram[i]['select']=currProgramSelect[i];
      currProgram[i]['fio']=currProgramFio[i];
    }


    $('#materialsProgram').val(JSON.stringify(currProgram));
  }

function addProgram() {
  lastRow=$(".type_programm").last().parent().parent().parent();


  if ($(".type_programm").last().val()=='' && $(".fio_spiker").last().val()=='') return;
  clone=lastRow.clone();
  clone.find('select, input').val('');
  lastRow.after(clone);
}

function parseProgram() { //Turns JSON program list to fields
    lastRow=$(".type_programm").last().parent().parent().parent();

    arr=JSON.parse($('#materialsProgram').val());

    console.log($('#materialsProgram').val());

    lastRow.find('.type_programm').first().val(arr[0]['select']);
    lastRow.find('.fio_spiker').first().val(arr[0]['fio']);

    for (var i=arr.length-1; i>0; i--) {
      clone=lastRow.clone();
      clone.find('.type_programm').first().val(arr[i]['select']);
      clone.find('.fio_spiker').first().val(arr[i]['fio']);

      lastRow.after(clone);
    }

  }

function resetPassword(){
  var fd = new FormData();

  fd.append('pastPass', $('#inputPasswordPast').val());
  fd.append('newPass', $('#inputPasswordNew').val());
  fd.append('repPass', $('#inputPasswordNewRep').val());


  $.ajax('/user/resetPassword', {
    method: 'POST',
    data: fd,
    processData: false,
    contentType: false,

    beforeSend: function(){
      $('.preloader').css("display", 'block');
      $('body').css('overflow', 'hidden');
    },

    success: function () {
      $('.preloader').css("display", 'none');
      $('body').css('overflow', 'auto');
      alert('Пароль изменен');
      $('#resetPassword').modal('hide');
      location.reload();
    },
    error: function() {
      $('.preloader').css("display", 'none');
      $('body').css('overflow', 'auto');
      $('#inputPasswordPast').val('');
      $('#inputPasswordNew').val('');
      $('#inputPasswordNewRep').val('');
      $('#resetPassword').modal('hide');
      alert("Ошибка");
    }
  });
}

function parseSelects() { //Turns select's value attribute to real value
  $('select').each(function(i, el) {el.value=el.getAttribute('value');});
}

  $(document).ready(function() {changeFormState(1); parseSelects(); parseLectures(); parseProgram(); parseCareer();});
