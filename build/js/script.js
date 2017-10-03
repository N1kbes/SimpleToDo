var data = (function(){
    var tasks = {
        done: [
            {
                title: "first"
            },
            {
                title: "second"
            }
        ],
        plan: [
            {
                title: "third"
            }
        ]
    };

    return {
        getItems: function(){
            return tasks;
        },
        addItem: function(item){
            tasks.plan.push({title: item});
        },
        doneItem: function(item){
            tasks.done.push(item);
        }
    }
}());

var handletemplate = (function(){
    var needTaskTemplate = `
    {{#each plan}}
        <li class="list-group-item">
                <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"> {{title}}
                </label>
        </li>
    {{/each}}
    `;

    var doneTaskTemplate = `
    {{#each done}}
        <li class="list-group-item">{{title}}</li>
    {{/each}}
    `;

    return{
        renderNeed: function(){
            var list = data.getItems();
            var template = Handlebars.compile(needTaskTemplate);
            $('.need-tasks').html( template(list) );
        },
        renderDone: function(){
            var list = data.getItems();
            var template = Handlebars.compile(doneTaskTemplate);
            $('.done-tasks').html( template(list) );
        },
        render: function(){
            this.renderDone();
            this.renderNeed();
        }
    }
}());


$(document).ready(function(){
    $('#list-menu a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('.add-new').click(function(){
        $('.new-task').slideDown(300);
        $(this).addClass('disabled');
    })
    handletemplate.render();
});

$("#create-task").click(function(){
    var value = $('#new-task-text');
    data.addItem(value.val());
    value.val("");
    handletemplate.render();
});