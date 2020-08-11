        function sendNewCard(id) {
          data={}
          var fd = new FormData();

          sendUrl="/news/editor/save/"+id;
          data['name']=$('#newsname').val();
          fd.append('name', data['name']);
          data['description'] = $("#description").val();
          fd.append('description', data['description']);
          if ((data['name'] == "") || (data['description'] == "")) {
          	alert("Не все поля заполнены!");
          	return;
          }
          data['newsString']=$('#summernote').summernote('code');
          fd.append('newsString', data['newsString']);
          data['preview'] = $('#preview')[0].files[0];
          fd.append('preview', data['preview'], data['preview'].name);

          $.ajax({
            url: sendUrl,
            method: "POST",
            processData: false,
            data: fd,
            contentType: false,

            success: function() {
              alert("Новость отправлена");
              //window.location.href='/user'
            },

            error: function() {
              alert("Ошибка");
            }
          }); 
        }

        $(window).on('resize', function(){
          let h=(window.innerHeight-220)*0.90;
          $('#summernote').summernote({height : h});
          $('div.note-editable').height(h);
        });

        $(document).ready(function() {
          let h=(window.innerHeight-220)*0.90;
          $('#summernote').summernote({
            placeholder: 'Введите текст Новости',
            tabsize: 2,
            lang: 'ru-RU',
            height: h,
            toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['help']],
            ]      });

        });