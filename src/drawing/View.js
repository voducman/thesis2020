import BaseView from './BaseView';
import {SVG}    from '@svgdotjs/svg.js';
import interact from 'interactjs';
import '@svgdotjs/svg.draggable.js'

class View extends BaseView{
    /**
     *Creates an instance of View.
     * @param {string} pageId - Id of page where set whiteboard
     * @memberof View
     */
    constructor(pageId){
        super();
        let timeId = pageId.split('-')[1];
        let [width, height] = View.getResolution();
        this.whiteBoard = SVG().addTo(`#${pageId} .col-md-12`).size(width, height)
            .id(`wb-${timeId}`).css({ position: "relative", zIndex: 0 })

    }

    static getResolution(){
        const width = $('#whiteboard-management').data("width");
        const height = $('#whiteboard-management').data("height");
        return [width, height];
    }

    static getCurrentActivePageId(){
        let pageId;
        $('#whiteboard-management > div').each(function(){
    
            if ($(this).hasClass("active")){
                pageId = $(this).attr('id');
                return;
            }
        })

        return pageId;
    }

    static genPageId(){
        const time = new Date().getTime();
        return `page-${time}`;
    }

    static genDefaultPageName(){
        const pageLength = $('#tab-management li').length;
        return `page ${pageLength}`;
    }

    static getTotalNumPage(){
        const pageLength = $('#tab-management li').length - 1;
        return pageLength;
    }

    static showAddPageModal(){
        $('#addNewPage').modal('show');
    }

    static createNewPage2Drawing(pageId, pageName, icon){
        let [width, height] = View.getResolution();
        // De-active other pages
        $('#tab-management li').each(function(){
            $(this).removeClass("active");
        })
        $('#whiteboard-management div').each(function(){
            $(this).removeClass("active");
        })

        $('#tab-management li').last().before(`
            <li class="active"><a data-toggle="tab" href="#${pageId}"><i class="material-icons">${icon}</i><span>${pageName}<span></a></li>
        `);

        $('#whiteboard-management').append(`
            <div id="${pageId}" class="tab-pane fade in active drawing-page">
                <div class="col-md-12" style="width: ${width}px; height: ${height}px; z-index: 0; background-color: #e4e4e4; position: absolute; padding:0">
                                        
                </div>
            </div>
        `);
    }

    static deletePageByPageId(pageId){
        $(`#tab-management li a[href=#${pageId}]`).parent().remove();
        $(`#${pageId}`).remove();
    }
}

export default View;