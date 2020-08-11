var photo_header,
    file_event;

var avatar = $('#avatar');
var image = $('#image_load')[0];
var input = $('#input');
var cropper;

var minCroppedWidth = 320;
var minCroppedHeight = 160;
var maxCroppedWidth = 1484;
var maxCroppedHeight = 405;

$(document).ready(function(){
  $('#advantage_edit').on('click', edit_advantage);
  // $('#persone_edit').on('click', edit_persone);
  // $('#advantage_save').on('click', save_advantage);
  // $('#persone_save').on('click', save_persone);
  $('#file_head').on('change', function(e){
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
    // if(image.width < 1919 && image.height < 1079){
    //   $('#modal').modal('hide');
    //   // $('#modal').modal('dispose');
    //   alert('Вы выбрали неправильный размер шапки');
    //   return;
    // }
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
        height: maxCroppedWidth,
      });
      initialAvatarURL = avatar.src;
      avatar.src = canvas.toDataURL();
      canvas.toBlob(function (blob) {

        photo_header = blob;
        $('#btn_header').html('Изменить фото шапки (Добавлено)');
        
      });
    }
  });

  $('#load_file').on('change', function(e){
    if(e.target.files.length != 0){
      $('#event_add').html('Изменить программу (Добавлено)');
      file_event = e.target.files[0];
      // console.log(file_event);
    } else {
      $('#event_add').html('Изменить программу')
    }
  })
});

function save_advantage(){
  $('#advantage_edit').css('display', 'block');
  $('#advantage_save').css('display', 'none');
  $('.cardsitem').css({
    "border"        : "none",
    "border-radius" : "none"
  });
  $('#card_advantage .card__close').css('display', 'none');

  $('#title_advantage').attr('readonly', 'true');
  $('#title_advantage').css('border-bottom', 'none');

  $('#card_advantage > .col-md-12:first-child').remove();
}

// function save_persone(){
//   $('#persone_edit').css('display', 'block');
//   $('#persone_save').css('display', 'none');
//   $('.persons__item').css({
//     "border"        : "none",
//     "border-radius" : "none"
//   });
//   $('#card_persone .card__close').css('display', 'none');

//   $('#card_persone > .col-md-12:first-child').remove();
// }

function edit_advantage(){
  $('#advantage_edit').css('display', 'none');
  $('#advantage_save').css('display', 'block');
  var item = `<div class="col-md-12 col-lg-6 col-xl-4 edit">
                <div class="cardsitem">
                  <div class="cardsitem__image">
                    <label for="file_advantage"><img class="load_img" id="load_img_advantage" src="/img/add.png"></label>
                    <input style="display: none;" type="file" id="file_advantage" onchange="handleFileAdvantage(event)" name="file" />
                  </div>
                  <textarea rows="3" id="load_textarea_advantage" placeholder="введите название преимуществ"></textarea>
                  <button class="btn btn-success mt-3" id="load_button_advantage"onclick="add_new_advantage()">Сохранить</button>
                </div>
              </div>`;

  $('#card_advantage').prepend(item);
  $('#title_advantage').removeAttr('readonly');
  $('#title_advantage').attr('required', 'true');
  $('#title_advantage').css('border-bottom', '2px solid #545353');
  $('#title_advantage').css('cursor', 'text');
  $('.cardsitem').css({
    "border"        : "2px solid #8E8E8E",
    "border-radius" : "10px"
  });
  $('#card_advantage .card__close').css('display', 'block');
}

// function edit_persone() {

//   var item = `<div class="col-md-12 col-lg-6 col-xl-4">
//                 <div class="persons__item">
//                   <div class="persons__item_img">
//                     <label for="file_persone"><img class="load_img" id="load_img_persone" src="/img/add.png"></label>
//                     <input style="display: none;" type="file" id="file_persone" onchange="handleFilePersone(event)" name="file" />
//                   </div>
//                   <div class="persons__item_text">
//                     <p class="persons__item_text_name">
//                       <input type="text" name="" id="load_name" placeholder="Введите ФИО">
//                     </p>
//                     <p class="persons__item_text_job">
//                       <select id="select_job">
//                         <option>Спикер</option>
//                         <option>Эксперт-практик</option>
//                         <option>Эксперт-теоретик</option>
//                       </select>
//                     </p>
//                     <p class="persons__item_text_position">
//                       <textarea rows="3" id="load_textarea_persone" placeholder="Введите область профессионального интереса"></textarea>
//                     </p>
//                   </div>
//                   <button class="btn btn-success" id="load_button_persone" onclick="add_new_person()">Сохранить</button>
//                 </div>
//               </div>`;

//   $('#card_persone').prepend(item);
//   $('#persone_edit').css('display', 'none');
//   $('#persone_save').css('display', 'block');
//   $('.persons__item').css({
//     "border"        : "2px solid #8E8E8E",
//     "border-radius" : "10px"
//   });
//   $('#card_persone .card__close').css('display', 'block');
// }


function handleFileAdvantage(e){
  // console.log(e);
  var file = e.target.files;
  var f = file[0];
  // Only process image files.
  if (!f.type.match('image.*')) {
      alert("Image only please....");
  }

  var reader = new FileReader();
  reader.onload = (function(theFile) {
      return function(e) {
          // Render thumbnail.
          $('#load_img_advantage').attr('src', e.target.result);
          // span.innerHTML = ['<img class="thumb" title="', escape(theFile.name), '" src="', e.target.result, '" />'].join('');
          // document.getElementById('output').insertBefore(span, null);
      };
    })(f);
    // Read in the image file as a data URL.
  reader.readAsDataURL(f);
}

// function handleFilePersone(e) {
//   console.log(e);
//   var file = e.target.files;
//   var f = file[0];
//   // Only process image files.
//   if (!f.type.match('image.*')) {
//       alert("Image only please....");
//   }

//   var reader = new FileReader();
//   reader.onload = (function(theFile) {
//         return function(e) {
//             // Render thumbnail.
//             $('#load_img_persone').attr('src', e.target.result);

//             // span.innerHTML = ['<img class="thumb" title="', escape(theFile.name), '" src="', e.target.result, '" />'].join('');
//             // document.getElementById('output').insertBefore(span, null);
//         };
//     })(f);
//     // Read in the image file as a data URL.
//   reader.readAsDataURL(f);
// }

function add_new_advantage(){
  if( $('#file_advantage').val() == '' || $('#load_textarea_advantage').val() == ''){
    alert('Введены неверные данные');
    return;
  }

  var item = `<div class="col-md-12 col-lg-6 col-xl-4">
                <div class="cardsitem">
                  <div class="card__close" onclick="delete_item(this)">
                    <img src="/img/close.png">
                  </div>
                  <div class="cardsitem__image">
                    <img src="${$('#load_img_advantage').attr('src')}" alt="" class="load_img">
                  </div>
                  <div class="cardsitem__text">
                    <p class="cardsitem__text_descr">
                      ${$('#load_textarea_advantage').val()}
                    </p>
                  </div>
                </div>
              </div>`;

  $('#card_advantage').append(item);

  $('.cardsitem').css({
    "border"        : "2px solid #8E8E8E",
    "border-radius" : "10px"
  });
  $('#card_advantage .card__close').css('display', 'block');
  $('#load_img_advantage').attr('src', '/img/add.png');
  $('#load_textarea_advantage').val('');

}

// function add_new_person(){
//   if( $('#file_persone').val() == '' || $('#load_textarea_persone').val() == '' || $('#load_name').val() == ''){
//     alert('Введены неверные данные');
//     return;
//   }

//   var item = `<div class="col-md-12 col-lg-6 col-xl-4">
//                 <div class="persons__item">
//                   <div class="card__close" onclick="delete_item(this)">
//                     <img src="/img/close.png">
//                   </div>
//                   <div class="persons__item_img">
//                     <img src="${$('#load_img_persone').attr('src')}" alt="" class="img-fluid">
//                   </div>
//                   <div class="persons__item_text">
//                     <p class="persons__item_text_name">
//                       ${$('#load_name').val()}
//                     </p>
//                     <p class="persons__item_text_job">
//                       ${$('#select_job').val()}
//                     </p>
//                     <p class="persons__item_text_position">
//                       ${$('#load_textarea_persone').val()}
//                     </p>
//                   </div>
//                 </div>
//               </div>`;
//   $('#card_persone').append(item);


//   $('#load_img_persone').attr('src', '/img/add.png');
//   $('#load_name').val('');
//   $('#load_textarea_persone').val('');
// }

function delete_item(elem){
  $(elem).parent().parent().remove();
}


function load_advantage(id, eventID){
  var listString,
      listPhoto,
      listInfo,

      fd = new FormData(),

      json_fields={},
      json_photo={},
      json_list = {},
      json_head = {};

  // console.log('"'+id+'"');

  $( id ).find('.cardsitem__text_descr').each(function (index) {
    var blockText = $(this).html().trim();
    json_fields[index]=blockText;
    // console.log(json_fields);
  });

  $( id ).find('.load_img').each(function (index) {
    var blockPhoto = $(this);
    json_photo[index] = blockPhoto.attr('src');

    // console.log(json_photo);
  });


  listString=JSON.stringify(json_fields);
  listPhoto=JSON.stringify(json_photo);

  var elem = $('.edit');

  if(elem.length > 0){
    alert('Вы не закончили редактирование блока.');
    return false;
  }else {
      if (listString.length == 2 & $('#title_advantage').val() != 0){
        alert('Проверьте правильность заполнение блока ' + $('#title_advantage').val());
        return false;
      } else {
        if(listString.length != 2 & $('#title_advantage').val() == 0){
          alert('Проверьте правильность заполнение блока.');
          return false;
        }
      }
  }

  $('body').find('.list_input').each(function(){
    json_list[$(this).attr('name')] = $(this).val();
    // console.log(json_list);
  });

  $('body').find('.input_textarea').each(function(){
    json_list[$(this).attr('name')] = $(this).val();
  });

  listInfo=JSON.stringify(json_list);

  fd.append('label', $('#title_advantage').val());
  fd.append('listString', listString);
  fd.append('listPhoto', listPhoto);
  fd.append('listInfo', listInfo);
  fd.append('PhotoHeader', photo_header);
  fd.append('FileEvent', file_event);


  $.ajax({
    url: "/event/edit/"+eventID+"/process",
    method: "POST",
    data: fd,
    processData: false,
    contentType: false,

    beforeSend: function(){
      $('.preloader').css("display", 'block');
      $('body').css('overflow', 'hidden');
    },

    success: function(data) {
      $('.preloader').css("display", 'none');
      $('body').css('overflow', 'auto');
      alert("Изменения сохранены!");
      window.location.href = "/event/show/"+eventID;
    },

    error: function(data) {
      $('.preloader').css("display", 'none');
      $('body').css('overflow', 'auto');
      if (data == "photo")
        alert("Ошибка загрузки фотографии!");
      else
        alert("Ошибка сохранения изменений!");
    }
  });
}