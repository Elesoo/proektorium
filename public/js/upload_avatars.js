var avatar = $('#avatar');
var image = $('#image_load');
var input = $('#input');
var cropper;


var minCroppedWidth = 320;
var minCroppedHeight = 160;
var maxCroppedWidth = 1484;
var maxCroppedHeight = 405;

$(document).ready(function(){

  $('#load_input').on('change', function (e) {
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
      aspectRatio: 1 / 1,
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

        var i = Math.random() * (1000 - 1) + 1;

        formData.append('attachment', blob, 'avatar_' + i);
        $.ajax('/user/changeAvatar', {
          method: 'POST',
          data: formData,
          processData: false,
          contentType: false,

          beforeSend: function(){
            $('.preloader').css("display", 'block');
            $('body').css('overflow', 'hidden');
          },

          success: function () {
            $('.preloader').css("display", 'none');
            $('body').css('overflow', 'auto');
            alert('Загрузка завершена');
            location.reload();
          },
          error: function() {
            $('.preloader').css("display", 'none');
            $('body').css('overflow', 'auto');
            alert("Ошибка");
          }
        });
      });
    }
  });
});