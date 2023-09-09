var courseApi = 'http://localhost:3000/course';

function start(){
    getCourses(renderCourses);
    handleCreateForm();
}


start();


function getCourses(callback){
    fetch(courseApi)
        .then(function(response){
            return response.json();
        })
        .then(callback);
    }

function createCourses(data, callback) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data),
    }
    fetch(courseApi, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

function handleDeleteCourse(id){
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          },
    }
    fetch(courseApi + '/' + id, options)
        .then(function(response){
            response.json();
        })
        .then(function(){
            var couresItem = document.querySelector('.coures-item-' + id);
            if(couresItem) {
                couresItem.remove();
            }
        });
}

function renderCourses(courses){
    var listCourseBlock = document.querySelector('#list-course');

    var htmls = courses.map(function(course){
        return `
            <li class="coures-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
            </li>
        `
    });
    listCourseBlock.innerHTML = htmls.join('');
}

function handleCreateForm(){
    window.onload = function(){
       var createBtn = document.getElementById("create");
       createBtn.onclick = function(){
            var name = document.querySelector('input[name="name"]').value;
            var description = document.querySelector('input[name="description"]').value;

            var fomData = {
                name: name,
                description: description,
            }
            createCourses(fomData, function(){
                getCourses(renderCourses);
            });
        }
    }
}