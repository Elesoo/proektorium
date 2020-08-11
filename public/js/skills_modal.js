    $(document).on("keyup", '.skills_search', function (e) {
        var str = $(this).val().toLowerCase();
        //var clear_search = $('#clear_search');
        var skills_li = $(this).next().children();


        if (str.length > 2) {
            skills_li.each(function (i, e) {
            	if ($(e).html().toLowerCase().indexOf(str) != -1) {
            		$(this).css('display', 'block');
            	}
            	else {
            		$(this).css('display', 'none');
            	}
            });

            // if (clear_search.hasClass('hidden')) {
            //     clear_search.removeClass('hidden');
            // }
        } else {
            skills_li.each(function (i, e) {
                $(e).css('display', 'block');
            });
        }
    });

function removeSkill(e) {
	$(e).parent().remove();
}

//.show class used to work only with currently visible modal window

function addSkill(e) {
	let skillsTypeClass=$(e).parent().parent().parent().parent().attr('class').split(' ')[1];
	let skillName=$(e).parent().contents().get(0).nodeValue;
	let skillId=$(e).parent().attr("tag");
	let alreadyExistFlag=false;
	$(`.show .${skillsTypeClass} .currSkills > li`).each(function(i, e) {
		val=$(e).contents().get(0).nodeValue;
		if (val==skillName) {
			alreadyExistFlag=true;
			return false;
		}
	});
	if (alreadyExistFlag) return false;
	$(`<li tag="${skillId}">${skillName}<div class=\"modifySkillBtn\" onclick=\"removeSkill(this)\"><i class=\"fas fa-times\"></i></div></li>`)
	.appendTo(`.show .${skillsTypeClass} .currSkills`)
}

function sendSkills(isWannaLearn=false) {
	currSkills={};

	baseSkills=[];
	techSkills=[];
	overProfSkills=[];

	$(".show .skills-base .currSkills > li").each(function(i, e) {
		baseSkills.push(e.innerText + ">" + $(e).attr('tag'));
	});

	$(".show .skills-tech .currSkills > li").each(function(i, e) {
		techSkills.push(e.innerText + ">" + $(e).attr('tag'));
	});

	$(".show .skills-overprof .currSkills > li").each(function(i, e) {
		overProfSkills.push(e.innerText + ">" + $(e).attr('tag'));
	});

	currSkills['base']=baseSkills;
	currSkills['tech']=techSkills;
	currSkills['profi']=overProfSkills;

sendurl="/user/student/setSkills/skills"

if (isWannaLearn) {
	sendurl="/user/student/setSkills/wannalearn"
}

	$.ajax({
		url: sendurl,
		method: "POST",
		data: currSkills,

		success: function() {
			alert("Навыки сохранены");
		},
		error: function() {
			alert("Ошибка");
		}
	});
}