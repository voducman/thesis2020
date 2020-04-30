// Design List data for create new Design action
let designList = {
    data: [],

    initProjectFromServer: function(){
        return new Promise((resolve, reject) => {
            $.get('/design/fetch/projects')
                .then((result) => {
                    if (result) this.data = result;
                    resolve(true);
                })
                .catch((err) => {
                    console.log('Fetch Project list get error')
                    reject(false);
                })
        })
    },

    createNewProject: function(project){
        this.data.push(project);
    },

    deleteProject: function(id){
        return new Promise((resolve, reject) => {
            $.get('/design/delete/' + id)
                .then((result) => {
                    if (result) this.data = result;
                    resolve(true);
                })
                .catch((err) => {
                    console.log('Delete Project get error')
                    reject(false);
                })
        })

    }
}

module.exports = designList;