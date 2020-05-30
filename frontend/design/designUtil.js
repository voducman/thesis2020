const Util           = require('../utils');
const designListData = require('./designListData');
const AddDesignForm  = require('../../models/form/AddDesignForm');


module.exports = (function(){
    
    function _initCreateNewBtn(){
        $('#create-design').click(function () {
            // Show create new form popup modal
            $('#showModal').click();
        })
    }

    /**
     *
     * @param {string} designId
     * @param {Promise<designListData} designListObj
     */
    async function _deleteDesign(designId, designListObj) {
        const status = await designListObj.deleteDesign(designId);
        
    }

    function _addContextMenuDeleteDesign(id, designListObj) {
        let menu = new ContextMenu({
            'theme': 'default', // or 'blue'
            'items': [
                { 'icon': 'trash', 'name': 'Delete this Design', 'action': () => _deleteDesign(id, designListObj) },
            ]
        });
    
    
        let openContextMenu = function (evt) {
    
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
    
        let hideContextMenu = function (evt) {
    
            // hide the menu
            menu.hide();
            // remove the listener from the document
            document.removeEventListener('click', hideContextMenu);
    
        }
    
        document.getElementById(id).addEventListener('contextmenu', openContextMenu, false);
    }


    function _renderDesignTable(designListObj) {

        $('#render-table').empty();
        let data = designListObj.getData();

        if (!Array.isArray(data)){
            console.debug("DesignList not an Array. Bug here!")
            return false;
        }

        data.forEach((ds, index) => {
    
            let isCompile = (ds.compiled) ? 'compiled' : 'notcompiled';
    
            let isRunable = (ds.compiled) ?
                `'class="btn btn-success" href="${ds.runLink}" target="_blank"'` :
                'class="btn btn-black"';
    
            let row = `
            <tr class="focus-table" id="${ds.designId}">
                <td class="text-center">${(index < 10 ? '0' + ++index : index++)}</td>
                <td class="text-center">${ds.name}</td>
                <td class="text-center">${Util.fortmatTime(ds.createdTime)}</td>
                <td class="text-center">${Util.fortmatTime(ds.lastModified)}</td>
                <td class="td-actions text-center">
                    <i class="material-icons ${isCompile}"
                    rel="tooltip" data-original-title="${ds.compiled ? 'Compiled' : 'Not Compiled'}"
                    >info</i>
                </td>
                <td class="td-actions text-center">
                    <button type="button" rel="tooltip" class="btn btn-facebook"
                        data-original-title="Description" title=""
                        data-toggle="collapse" data-target="#row-${index + 1}">
                        <i class="material-icons">description</i>
                    </button>
                </td>
                <td class="td-actions text-center">
                    <a type="button" rel="tooltip" ${isRunable} 
                        data-original-title="${ds.compiled ? 'Run the Design' : 'Unavailable'}" title="">
                        <i class="material-icons">play_circle_filled</i>
                    </a>
                </td>
                <td class="td-actions text-center">
                    <a rel="tooltip" class="btn btn-google" href="/drawing/${ds.name}/${ds.designId}" target="_blank"
                        data-original-title="Go to Design Page">
                        <i class="material-icons">launch</i>
                    </a>
                </td>
                
                </tr>
                <tr id="row-${index + 1}" class="collapse" style="background-color: #dddfd4;">
                    <td colspan="8" rowspan="1">                                                      
                        <div class="row">
                            <div class="col-md-12"><b>Resolution</b>: ${Util.Message(ds.resolution)}</div>
                        </div> 
                        <div class="row">
                            <div class="col-md-12"><b>Description</b>: ${ds.description}</div>
                        </div>                                                      
                    </td>
                </tr>
            `
            $('#render-table').append(row);
            $('[rel=tooltip]').tooltip();
            _addContextMenuDeleteDesign(ds.designId, designListObj);
        })
    }


    
    return {

        setupEventCreateNewBtn: function(){
            _initCreateNewBtn();
        },

        /**
         * Render table on design page
         * @param {designListData} data - a list of design
         */
        renderDesignTable: function(designListObj){
            _renderDesignTable(designListObj);
        },

         /**
         * Get new design data from create new popup modal
         * @returns {AddDesignForm} - a Data form of new design
         */
        parseDataCreateForm: function () {

            let name = $('input[name=name]').val();
            if (name.length < 1) {
                $('input[name=name]').parent().addClass('has-error');
                return null;
            }

            let description = $('input[name=description]').val();
            let resolution = $('#revolution').val();

            return new AddDesignForm(name, description, resolution);
        }

    }

})()