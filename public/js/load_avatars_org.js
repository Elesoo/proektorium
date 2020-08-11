var avatar = $('#avatar');
var image = $('#image_load_logo');
var input = $('#input');
var cropper;


var minCroppedWidth = 320;
var minCroppedHeight = 160;
var maxCroppedWidth = 1484;
var maxCroppedHeight = 405;

$(document).ready(function(){

  $('#load_input_logo').on('change', function (e) {
    var files = e.target.files;
    var done = function (url) {
      input.value = '';
      $('#image_load_logo').attr('src', url);
      $('#editPhoto').modal('hide');
      $('#modal_logo').modal('show');
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

  $('#modal_logo').on('shown.bs.modal', function () {
    var image = $('#image_load_logo')[0];
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

  $('#load_logo_btn').on('click', function () {
    var initialAvatarURL;
    var canvas;

    $('#modal_logo').modal('hide');

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

        formData.append('logo_avatar', blob, 'avatar_' + i);
        $.ajax('', {
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






  $('#load_input_header').on('change', function (e) {
    var files = e.target.files;
    var done = function (url) {
      input.value = '';
      $('#image_load_header').attr('src', url);
      $('#editPhoto').modal('hide');
      $('#modal_header').modal('show');
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

  $('#modal_header').on('shown.bs.modal', function () {
    var image = $('#image_load_header')[0];
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

  $('#load_header_btn').on('click', function () {
    var initialAvatarURL;
    var canvas;

    $('#modal_header').modal('hide');

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

        formData.append('header_avatar', blob, 'avatar_' + i);
        $.ajax('', {
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