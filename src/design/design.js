const Utils = require('../utils');

const Message          = Utils.Message;
const fortmatTime      = Utils.fortmatTime;
const showNotification = Utils.showNotification;

let designList = require('./designListData');
designList.initProjectFromServer()
.then(function(){
    console.log(designList.data);
    renderDesignTable();
})
.catch((err) => console.log('Fetch error: ', err));


$('#create-design').click(function(){
    // Show create new form popup modal
    $('#showModal').click();
})

$('#save-design').click(function(){
    let name        = $('input[name=name]').val();
    if (name.length < 1) {
        $('input[name=name]').parent().addClass('has-error');
        return;
    }
    let description = $('input[name=description]').val();
    let resolution  = $('#revolution').val();
    console.log({name, description, resolution})
    //const status = designList.createNewDesign(name, description, resolution);
    $.post('/design/create', {
        name, description, resolution
    })
    .then((result) => {
        if (result.status == 'success'){
            console.log('New project: ', result.newProject);
            designList.createNewProject(result.newProject);
            showNotification('top', 'right', 'success', "<b>SUCCESS</b>: New Project is created successfully");
            renderDesignTable();
        }else if (result.status == 'fail'){
            console.log('Create new fail: ', result.reason);
            showNotification('top', 'right', 'warning', "<b>Duplicated ERROR</b>: Cannot create new Project.");
        }else{
            console.log('Get an error: ', result.error);
            showNotification('top', 'right', 'danger', "<b>Duplicated ERROR</b>: Cannot create new Project. Server return Error code");
        }
        //showNotification('top', 'right', 'success', "<b>SUCCESS</b>: New Project is created successfully");
    })
    .catch((err) => {
        console.log("PORT request error: ", err);
        showNotification('top', 'right', 'danger', "<b>Duplicated ERROR</b>: Cannot create new Project. Server response with ERROR code.");
    })
           
})


function deleteDesign(_designId){
  const status = designList.deleteProject(_designId)
  .then((result) => {
    renderDesignTable();
    alert(_designId + ' was deleted')
    return
  })
  .catch((err) => {
    alert(_designId + ' not found')
  })
}



function renderDesignTable() {

    $('#render-table').empty();
    designList.data.forEach((ds, index) => {

        let isCompile = (ds.compiled)? 'compiled' : 'notcompiled';

        let isRunable = (ds.compiled)? 
        `'class="btn btn-success" href="${ds.runLink}" target="_blank"'`:
         'class="btn btn-black"';

        let row = `
        <tr class="focus-table" id="${ds.designID}">
            <td class="text-center">${(index<10 ? '0'+ ++index : index++)}</td>
            <td class="text-center">${ds.name}</td>
            <td class="text-center">${fortmatTime(ds.createTime)}</td>
            <td class="text-center">${fortmatTime(ds.modified)}</td>
            <td class="td-actions text-center">
                <i class="material-icons ${isCompile}"
                rel="tooltip" data-original-title="${ds.compiled? 'Compiled': 'Not Compiled'}"
                >info</i>
            </td>
            <td class="td-actions text-center">
                <button type="button" rel="tooltip" class="btn btn-facebook"
                    data-original-title="Description" title=""
                    data-toggle="collapse" data-target="#row-${index+1}">
                    <i class="material-icons">description</i>
                </button>
            </td>
            <td class="td-actions text-center">
                <a type="button" rel="tooltip" ${isRunable} 
                    data-original-title="${ds.compiled? 'Run the Design': 'Unavailable'}" title="">
                    <i class="material-icons">play_circle_filled</i>
                </a>
            </td>
            <td class="td-actions text-center">
                <a rel="tooltip" class="btn btn-google" href="/design/drawing/#${ds.designID}" target="_blank"
                    data-original-title="Go to Design Page">
                    <i class="material-icons">launch</i>
                </a>
            </td>
            
            </tr>
            <tr id="row-${index+1}" class="collapse" style="background-color: #dddfd4;">
                <td colspan="8" rowspan="1">                                                      
                    <div class="row">
                        <div class="col-md-12"><b>Resolution</b>: ${Message(ds.resolution)}</div>
                    </div> 
                    <div class="row">
                        <div class="col-md-12"><b>Description</b>: ${ds.description}</div>
                    </div>                                                      
                </td>
            </tr>
        `
        $('#render-table').append(row);
        $('[rel=tooltip]').tooltip();
        addContextMenuDeleteDesign(ds.designID);
    })
}

function addContextMenuDeleteDesign(id){
    let menu = new ContextMenu({
        'theme': 'default', // or 'blue'
        'items': [
            { 'icon': 'trash', 'name': 'Delete this Design', 'action': () => deleteDesign(id) },
        ]
    });
    
    
    let openContextMenu = function(evt) {
    
            // prevent default event
            evt.preventDefault();
            // open the menu with a delay
            const time = menu.isOpen() ? 100 : 0;
            // hide the current menu (if any)
            menu.hide();
            // display menu at mouse click position
            setTimeout(() => { menu.show(evt.pageX, evt.pageY) }, time);
            // close the menu if the user clicks anywhere on the screen
            document.addEventListener('click', hideContextMenu, false);
    }
    
    let hideContextMenu = function(evt) {
    
        // hide the menu
        menu.hide();
        // remove the listener from the document
        document.removeEventListener('click', hideContextMenu);
    
    }
    
    document.getElementById(id).addEventListener('contextmenu', openContextMenu, false);
}