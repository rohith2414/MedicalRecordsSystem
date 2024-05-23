let urlMockApi="https://6643590b6c6a65658706b2f3.mockapi.io/mediacalRecordsSystem";
const table = document.getElementById('innerTable');

document.addEventListener('DOMContentLoaded', function() {
    

    table.addEventListener('click', function(event) {
        if (event.target.classList.contains('ebtn')) {
            const row = event.target.closest('.tableRow');

            // if( row.querySelector('.ebtn').innerText === 'Edit'){
                let cols = row.querySelectorAll(".box");
                cols.forEach((col, idx) => {
                    
                  if (idx < cols.length - 1 && idx>0) {
                    col.setAttribute("contenteditable", true);
                  }
                });
                console.log(row.querySelector('.box:last-child').innerText);
                if(row.querySelector('.box:last-child').innerText === 'EditDelete'){
                    const button =document.createElement('button');
                    button.innerText='Save';
                    button.classList.add('savebtn');

                    const lastCell=row.querySelector('.box:last-child');

                    lastCell.appendChild(button);
                }
            // }
            // else{
                
            //     let cols = row.querySelectorAll(".box");
                
            //     cols.forEach((col, idx) => {
            //       if (idx < cols.length - 1  && idx>0) {
            //         col.setAttribute("contenteditable", false);
            //       }
            //     });
            //     row.querySelector('.ebtn').innerText="Edit";  
            //     let Modifieddata={
            //         "patient":cols[1].innerText,
            //         "dob":cols[2].innerText,
            //         "mh":cols[3].innerText,
            //         "doctor":cols[4].innerText
            //     }    
                
            //     updateData(cols[0].innerText,Modifieddata);
                
            // }
            
        }
        else if (event.target.classList.contains('dbtn')){
            const row = event.target.closest('.tableRow');
            let cols = row.querySelectorAll(".box");

            var modal = document.getElementById("deletePopUp");

            var span = document.getElementsByClassName("close")[0];

            var deleteContent=document.getElementById('delete-content');

            var div=modal.querySelector('#delete-item');
            div.innerText=`Deleting: ${cols[1].innerText}`;

            var deleteBtn = document.getElementById("deleteBtn");
            var cancelBtn = document.getElementById("cancelBtn");

            modal.style.display = "block";

            span.onclick = function () {
              modal.style.display = "none";
            };

            deleteBtn.onclick = function () {
              deletePatient(cols[0].innerText,row);
              modal.style.display = "none";
            };

            cancelBtn.onclick = function () {
              modal.style.display = "none";
            };

            window.onclick = function (event) {
              if (event.target == modal) {
                modal.style.display = "none";
              }
            };
        }
        else if(event.target.classList.contains('savebtn')){
            const row = event.target.closest('.tableRow');
            let cols = row.querySelectorAll(".box");
                
                cols.forEach((col, idx) => {
                  if (idx < cols.length - 1  && idx>0) {
                    col.setAttribute("contenteditable", false);
                  }
                });
                let Modifieddata={
                    "patient":cols[1].innerText,
                    "dob":cols[2].innerText,
                    "mh":cols[3].innerText,
                    "doctor":cols[4].innerText
                }    
                const box=row.querySelector('.box:last-child');
                console.log(box);
                const btns=box.getElementsByTagName('button');

                box.removeChild(btns[btns.length-1]);
                
            updateData(cols[0].innerText,Modifieddata);
        }
        // document.addEventListener('keydown',function(event){
        //     if(event.key === 'Enter'){
        //         const row = event.target.closest(".tableRow");
        //         let cols = row.querySelectorAll(".box");

        //         cols.forEach((col, idx) => {
        //             if (idx < cols.length - 1 && idx > 0) {
        //             col.setAttribute("contenteditable", false);
        //             }
        //         });
        //         let Modifieddata = {
        //             patient: cols[1].innerText,
        //             dob: cols[2].innerText,
        //             mh: cols[3].innerText,
        //             doctor: cols[4].innerText,
        //         };
        //         const box = row.querySelector(".box:last-child");
        //         console.log(box);

        //         const btns = box.getElementsByTagName("button");

        //         box.removeChild(btns[btns.length - 1]);

        //         updateData(cols[0].innerText, Modifieddata);
        //     }

        // })
        // function deleteSave(){
        //     const row = event.target.closest('.tableRow');
        //     let cols = row.querySelectorAll(".box");
                
        //         cols.forEach((col, idx) => {
        //           if (idx < cols.length - 1  && idx>0) {
        //             col.setAttribute("contenteditable", false);
        //           }
        //         });
        //         let Modifieddata={
        //             "patient":cols[1].innerText,
        //             "dob":cols[2].innerText,
        //             "mh":cols[3].innerText,
        //             "doctor":cols[4].innerText
        //         }    
        //         const box=row.querySelector('.box:last-child');
        //         console.log(box);
        //         const btns=box.getElementsByTagName('button');

        //         box.removeChild(btns[btns.length-1]);
                
        //     updateData(cols[0].innerText,Modifieddata);
        // }
    });
});

function deletePatient(id, row) {
    const http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            row.remove();
        }
    };
    http.open("DELETE",urlMockApi+'/'+ + id, true);
    http.send();
}


function updateData(id, Modifieddata) {
    var xhrUpdate = new XMLHttpRequest();
    xhrUpdate.open("PUT", urlMockApi+'/'+ + id, true);
    xhrUpdate.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhrUpdate.onreadystatechange = function() {
        if (xhrUpdate.readyState == 4) {
            if (xhrUpdate.status == 200) {
                console.log("Data updated successfully:", xhrUpdate.responseText);
            } else {
                console.log("Error updating data:", xhrUpdate.statusText);
            }
        }
    };

    xhrUpdate.send(JSON.stringify(Modifieddata));
}


function fetchUsers(){
    var http =new XMLHttpRequest();

    http.onreadystatechange = function () {
        if(this.readyState==4 && this.status == 200){
            var jsonResponse = JSON.parse(http.responseText);
            for (let i=0;i<jsonResponse.length;i++) {
                let row=document.createElement('div');
                row.classList.add('tableRow');
                let keys=jsonResponse[i];
                for(let key in keys){
                    let col=document.createElement('div');
                    col.classList.add('box');
                    col.innerText=`${keys[key]}`;
                    row.appendChild(col);
                    
                }
                var btnDiv=document.createElement('div');
                btnDiv.classList.add('box');
                btnDiv.innerHTML='<button class="ebtn">Edit</button><button class="dbtn">Delete</button>';
                row.appendChild(btnDiv);
                table.appendChild(row);
            }
        }
    }
    
    http.open("Get",urlMockApi,true);

    


    http.send();

    
    
}

fetchUsers();

function popUp(){
    var main=document.querySelector('.outer');
    var add=document.querySelector('.addUser');
    main.style.display='none';
    add.style.display='block';

    
}
function addUser(pname, dob, mh,dname){
    var main=document.querySelector('.outer');
    var add=document.querySelector('.addUser');
    main.style.display='block';
    add.style.display='none';
    
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function () {
        console.log('readystate');
        if(this.readyState==4){
            let jsonResponse=JSON.parse(this.responseText);
            let row=document.createElement('div');
            row.classList.add('tableRow');
            for(let key in jsonResponse){
                let col=document.createElement('div');
                col.classList.add('box');
                col.innerText=`${jsonResponse[key]}`;
                row.appendChild(col);
            }
            var btnDiv=document.createElement('div');
            btnDiv.classList.add('box');
            btnDiv.innerHTML='<button class="ebtn">Edit</button><button class="dbtn">Delete</button>';
            row.appendChild(btnDiv);
            table.appendChild(row);

            // fetchUsers();


        }
        else{
            console.log(this.readyState +' ' +this.status)
        }
    };

    xhr.onerror = ()=>{
        console.log('error ocurred')
    }

    xhr.open("POST",urlMockApi,true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onprogress =() => {
        console.log('loading');
    }


    let str={
        "patient":pname,
        "dob":dob,
        "mh":mh,
        "doctor":dname
    }

    let params=JSON.stringify(str);

    xhr.send(params);   
    
}

let form=document.getElementById('myForm');
function handleSubmit(event) {
    event.preventDefault();
    let pname=document.getElementById('pname').value;
    let dob=document.getElementById('dob').value;
    let mh=document.getElementById('mh').value;
    let dname=document.getElementById('dname').value;

    if (pname && dob && mh && dname) {
        addUser(pname, dob, mh,dname);

        form.reset();
    }
}


form.addEventListener("submit",function rohith(event){
    handleSubmit(event);
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleSubmit(event);
    }
});


document.getElementById('dob').max = new Date().toISOString().split("T")[0];