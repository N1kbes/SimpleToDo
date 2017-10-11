var data = (function(){
    var tasks = {
        done: [
            {
                title: "Done first"
            },
            {
                title: "Done second"
            }
        ],
        plan: [
            {
                id: 1,
                title: "First task"
            },
            {
                id: 2,
                title: "Second task"
            },
            
        ]
    };

    return {
        getItems: function(){
            return tasks;
        },
        addItem: function(item, id){
            tasks.plan.push({
                title: item, 
                id: id
            });
        },
        doneItem: function(num){
            var o = num;
            var item = $.map(tasks.plan, function(obj, index) {
                if(obj.id == o) {
                    return index;
                }
            })
            var add_obj = tasks.plan[item[0]];
            tasks.done.push({
                title: add_obj.title
            });

            tasks.plan.splice(item[0],1);


            handletemplate.renderDone();
        }
    }
}());

var handletemplate = (function () {

    var listItem = "<li class='list-group-item fadeInDown'><label class='form-check-label'><input class='form-check-input' type='checkbox' id='inlineCheckbox1' value='option1' data-id = {{id}}> {{title}}</label></li>";

    var needTaskTemplate = "{{#each plan}}<li class='list-group-item'><label class='form-check-label'><input class='form-check-input' type='checkbox' id='inlineCheckbox1' value='option1' data-id = {{id}}> {{title}}</label></li>{{/each}}";

    var doneTaskTemplate = "{{#each done}}<li class='list-group-item'>{{title}}</li>{{/each}}";

    return {
        renderNeed: function () {
            var list = data.getItems();
            var template = Handlebars.compile(needTaskTemplate);
            $('.need-tasks').html(template(list));
        },
        renderDone: function () {
            var list = data.getItems();
            var template = Handlebars.compile(doneTaskTemplate);
            $('.done-tasks').html(template(list));
        },
        render: function () {
            this.renderDone();
            this.renderNeed();
        },
        addItem: function (value, id) {
            var data = {title: value, id: id};
            var template = Handlebars.compile(listItem);
            $('.need-tasks').prepend(template(data));
        }
    }
}());


$(document).ready(function(){

    $('#list-menu').find('a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $('.add-new').click(function(){
        $('.new-task').slideDown(300);
        $(this).addClass('disabled');
    });



    handletemplate.render();

    $('#need-tasks').on('change', 'input[type="checkbox"]', function(e) {
        if (this.checked) {
            var id = $(this).attr('data-id');
            data.doneItem(id);
            $(this).closest('li').fadeOut('slow');
        }
    });

    var addTask = function(){
        var value = $('#new-task-text');
        if(value.val()){
            var items = data.getItems();
            var id = items.plan.length > 0 ? items.plan[items.plan.length-1].id+1 : 1;
            //добавляем в базу
            data.addItem(value.val(), id);
            //передаем handlebars
            handletemplate.addItem(value.val(), id);
            value.val('');
            setTimeout(function() {
                $('.list-group-item').removeClass('fadeInDown');
            }, 5000);
        }else{
            $('#task-valid').removeClass('hidden')
            setTimeout(function() {
                $('#task-valid').addClass('hidden');
            }, 2000);
        }

    };
    
    $('#create-task').click(function(){
        addTask();
    });
    
    $("#new-task-text").keyup(function(event){
        if(event.keyCode == 13){
            event.preventDefault();
            addTask();
        }
    });

});