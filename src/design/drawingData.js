module.exports = {
    drawing: {},

    initDrawingFromServer: function(designId){
        $.get('/design/fetch/drawing/' + designId)
        .then((data) => {
            if (data != {}){
                this.renderDrawing();
            }
        })
        .catch((err) => {
            console.log('Error is: ', err);
        })
    },

    renderDrawing: function(){
        // get from this.drawing and render
    }
}