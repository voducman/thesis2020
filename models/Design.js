const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email: String,
    design: Array,
    drawing: Array,
    createdTime: { type: Date, default: Date.now },

}, {
    collection: 'design',
});

userSchema.methods.isDuplicate = function(projectName){
    let index = this.design.findIndex((project) => project.name == projectName);
    if (index == -1) return false;
    else return true;
}

userSchema.methods.getDesignById = function(designId){
    let index = this.design.findIndex((design) => design.designId = designId);
    if (index == -1) return false;
    else return this.design[index];
}

userSchema.methods.getDrawingById = function(designId){
    let index = this.drawing.findIndex((drawing) => drawing.designId = designId);
    if (index == -1) return false;
    else return this.drawing[index];
}

module.exports = mongoose.model('design', userSchema);
