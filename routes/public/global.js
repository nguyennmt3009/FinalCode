function addnew() {
    let f = $("#fullname").val(),
        u = $("#username").val(),
        p = $("#password").val();
    let q = `
        mutation {
            createUser (input : {
                fullname: "${f}",
                username: "${u}",
                password: "${p}"
            })
            {
                id
            }
            }`;
    fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: q})
    })
    .then(() => {
        location.reload();
    });
}
    
$(document).ready(function() {
    populateTable();
});

var datatable = [];

function populateTable() {
    var tableContent = '';
    let q = `
        {
            allUser {
                id,
                fullname,
                username,
                password
            }
        }`;

    fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: q})
    })
    .then(r => r.json())
    .then(function(re) {
        
        $.each(re.data.allUser, function(i, u){
            datatable.push(u);
            
        tableContent += '<tr>';
        tableContent += '<td>'+ this.id + '</td>';
        tableContent += '<td>' + this.fullname + '</td>';
        tableContent += '<td>'+ this.username + '</td>';
        tableContent += '<td>'+ this.password + '</td>';
        tableContent += `<td><button onclick=edit(${i})>Edit</button>
                            <button onclick=deleteUser(${this.id})>Delete</button></td>`;
        tableContent += '</tr>';
        });
        $('#datatable tbody').html(tableContent);
    });
};


function edit(index) {
    modal.style.display = "block";
    $("#ei").val(datatable[index].id);
    $("#ef").val(datatable[index].fullname);
    $("#eu").val(datatable[index].username);
    $("#ep").val(datatable[index].password);
}

function submitEdit() {
    let f = $("#ef").val(),
        u = $("#eu").val(),
        i = $("#ei").val(),
        p = $("#ep").val();
    let q = `
        mutation {
            updateUser (id: ${i}, input : {
                fullname: "${f}",
                username: "${u}",
                password: "${p}"
            })
            {
                id
            }
            }`;
    fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: q})
    })
    .then(() => {
        location.reload();
    });
}

function deleteUser(id) {
    let q = `
        mutation {
            deleteUser (id: ${id})
            {
                id
            }
            }`;
    fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: q})
    })
    .then(() => {
        location.reload();
    });
}