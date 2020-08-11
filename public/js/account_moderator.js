        function sendNewCard() {
            emptyFieldsFlag=false;

            isCompleted=$("#isCompleted").is(':checked');
            if (isCompleted==null) {
                isCompleted=false;
            }
              data={};
                $(".forminput").each(function(){data[$(this).attr('id')]=$(this).val()}); //Creates data JSON by inputs in #rightbar and ids.
                data['isCompleted']=isCompleted;

            $.each(data, function(i,val){console.log(i); if (val===null || val==="") {
                emptyFieldsFlag=true;
                return false;
            }});

            if (emptyFieldsFlag) {
                alert("Пустые поля");
                return false;
            }
            $.ajax({
                url: "newcard.php",
                method: "POST",
                data: data,

                success: function() {
                    alert("Карточка отправлена");
                },
                error: function() {
                    alert("Ошибка");
                }
            }); 
        }


    $(document).ready(function() {
chosenInit();
parseSelects();
});