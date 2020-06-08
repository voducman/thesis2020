
const PageInfo = function(pageId, name, icon, width, height, components){
    this.pageId = pageId;
    this.name = name;
    this.icon = icon;
    this.width = width;
    this.height = height;
    this.components = components || [];

}

PageInfo.prototype.setPageId = function(pageId){
    this.pageId = pageId;
}


PageInfo.prototype.addComponent = function(component){
    this.components.push(component);
}

PageInfo.prototype.setComponents = function(components){
    this.components = components;
}

PageInfo.prototype.setSize = function(width, height){
    this.width = width;
    this.height = height;
}

export default PageInfo;

