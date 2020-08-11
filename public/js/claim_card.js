var photo_header;

function sendNewCard(sendUrl="/claim/convert") {
    emptyFieldsFlag=false;
    var fd = new FormData();    


    data={};
        $(".forminput").each(function(){data[$(this).attr('id')]=$(this).val()}); //Creates data JSON by inputs in #rightbar and ids.

        $.each(data, function(i,val){if (val===null || val==="") {
            emptyFieldsFlag=true;
            return false;
        }});

        if (emptyFieldsFlag) {
            alert("Пустые поля");
            return false;
        }

        listString=JSON.stringify(data);
        fd.append('listString', listString);

        if ($('input[type="file"]')[0].files.length>0) { //Adds attachment only if presents
          attachement=$('input[type="file"]')[0].files[0];
          fd.append('attachment', attachement, attachement.name);
        }

        if ($('input[type="file"]')[1].files.length>0) { //Adds attachment only if presents
          attachement=$('input[type="file"]')[1].files[0];
          fd.append('header_image', photo_header);
        }


        $.ajax({
            url: sendUrl,
            method: "POST",
            data: fd,
            processData: false,
            contentType: false,

            beforeSend: function(){
              $('.preloader').css("display", 'block');
              $('body').css('overflow', 'hidden');
            },

            success: function() {
              $('.preloader').css("display", 'none');
              $('body').css('overflow', 'auto');
                alert("Карточка отправлена");
                window.location.href='/user';
            },
            error: function() {
                $('.preloader').css("display", 'none');
                $('body').css('overflow', 'auto');
                alert("Ошибка");
            }
        }); 
    }


function updateTeamRolesList() {

    roles=[];

    $('.role').each(function(i, e) {
      baseSkills=[];
      techSkills=[];
      overProfSkills=[];
      roleNameInput="";
      roleName=$(e).find(".roleNameInput")[0].value;
      $(e).find(".baseSkillsInput").each(function() {if($(this).val()=='') return; baseSkills.push($(this).val());});
      $(e).find(".techSkillsInput").each(function() {if($(this).val()=='') return; techSkills.push($(this).val());});
      $(e).find(".overProfSkillsInput").each(function() {if($(this).val()=='') return; overProfSkills.push($(this).val());});

      roles.push({'roleName' : roleName, 'baseSkills' : baseSkills, 'techSkills' : techSkills, 'overProfSkills' : overProfSkills});

    });


  $('#teamRolesList').val(JSON.stringify(roles));
}
          

/* function parseTeamRoles() { //Turns JSON career to fields
    lastRow=$(".rolesInput").last().parent().parent();
    arr=JSON.parse($('#teamRolesList').val());

    lastRow.find('.rolesInput').first().val(arr[0]['role']);
    lastRow.find('.skillsInput').first().val(arr[0]['skills']);
    lastRow.find('.amountsInput').first().val(arr[0]['amount']);


    for (var i=arr.length-1; i>0; i--) {
      clone=lastRow.clone();
      clone.find('.rolesInput').first().val(arr[i]['role']);
      clone.find('.skillsInput').first().val(arr[i]['skills']);
      clone.find('.amountsInput').first().val(arr[i]['amount']);


      lastRow.after(clone);
  }

}*/


function addSkill(e) {
  lastSkill=$(e).parent().parent().find('.skillsInput').last();
  if (lastSkill.val()=='') return;
  clone=lastSkill.clone();
  clone.val('');
  lastSkill.after(clone);
}

function addRole() {
  lastRow=$(".role").last();
  if (lastRow.find('textarea')[0].value=='') return;
  clone=lastRow.clone();
  clone.find('textarea').val('');
  /*sel=clone.find('select');
  sel.css('display', 'block');
  sel.val('');
  clone.find('.chosen-container').remove();*/

  lastRow.after(clone);

    //chosenInit();
}

function parseSelects() { //Turns select's value attribute to real value
  $('select').each(function(i, el) {el.value=el.getAttribute('value');});
}

var avatar = $('#avatar');
var image = $('#image_load');
var input = $('#input');
var cropper;


var minCroppedWidth = 320;
var minCroppedHeight = 160;
var maxCroppedWidth = 1484;
var maxCroppedHeight = 405;

$(document).ready(function() {
    // chosenInit();
    //parseSelects();

  $('#load_header').on('change', function (e) {
    var files = e.target.files;
    var done = function (url) {
      input.value = '';
      $('#image_load').attr('src', url);
      $('#modal').modal('show');
    };
    var reader;
    var file;
    var url;

    if (files && files.length > 0) {
      file = files[0];

      if (URL) {
        done(URL.createObjectURL(file));
      } else if (FileReader) {
        reader = new FileReader();
        reader.onload = function (e) {
          done(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  });

  $('#modal').on('shown.bs.modal', function () {
    var image = $('#image_load')[0];
    console.log(image);
    cropper = new Cropper(image, {
      aspectRatio: 2 / 1,
      // cropBoxResizable: false,
      viewMode: 3,
      data: {
        width: (minCroppedWidth + maxCroppedWidth),
        height: (minCroppedHeight + maxCroppedHeight),
      },
      crop: function(){

        var width = event.detail.width;
        var height = event.detail.height;

        // if (
        // width < minCroppedWidth
        // || height < minCroppedHeight
        // || width > maxCroppedWidth
        // || height > maxCroppedHeight
        // ) {
        //   cropper.setData({
        //     width: Math.max(maxCroppedWidth, maxCroppedWidth),
        //     height: Math.max(maxCroppedHeight, maxCroppedHeight),
        //   });
        // }
      },
    });
  }).on('hidden.bs.modal', function () {
    cropper.destroy();
    cropper = null;
  });

  $('#load_btn').on('click', function () {
    var initialAvatarURL;
    var canvas;

    $('#modal').modal('hide');

    if (cropper) {
      canvas = cropper.getCroppedCanvas({
        width: maxCroppedWidth,
        height: maxCroppedHeight,
      });
      initialAvatarURL = avatar.src;
      avatar.src = canvas.toDataURL();
      canvas.toBlob(function (blob) {
        var formData = new FormData();

        photo_header = blob;
        $('#label_header').append('<span class="badge-success ml-2">Добавлено</span>');

      });
    }
  });
});