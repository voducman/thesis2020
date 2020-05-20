module.exports = class AddDesignForm{

    /**
     *Creates an instance of AddDesignForm.
     * @param {string} name
     * @param {string} description
     * @param {string} resolution
     */
    constructor(name, description, resolution){
        this.name = name;
        this.description = description;
        this.resolution = resolution;
    }

    /**
     * Pars form and create new instance of AddDesignForm
     * @static
     * @param {AddDesignForm} addDesignForm
     */
    static parseDesignForm(addDesignForm){
        console.debug(addDesignForm)
        let {name, description, resolution} = addDesignForm;
        return new AddDesignForm(name, description, resolution);
    }

    getName(){
        return this.name;
    }

    getDescription(){
        return this.description;
    }

    getResolution(){
        return this.resolution;
    }
}