class BaseView {
    getDesignId(){
        return location.hash.replace('#','');
    }

    disableToolbox(){
        $('.btn-symbol').each(function(){
            $(this).addClass('disabled');
        })

    }

    enableToolbox(){
        $('.btn-symbol').each(function(){
            $(this).removeClass('disabled');
        })
    }

    disableToolboxBasic(){
        $('.btn-basic').each(function(){
            $(this).addClass('disabled');
        })
    }

    enableToolboxBasic(){
        $('.btn-basic').each(function(){
            $(this).removeClass('disabled');
        })
    }

    disableToolboxElements(){
        $('.btn-element').each(function(){
            $(this).addClass('disabled');
        })
    }

    enableToolboxElements(){
        $('.btn-element').each(function(){
            $(this).removeClass('disabled');
        })
    }

    disableToolboxGraph(){
        $('.btn-graph').each(function(){
            $(this).addClass('disabled');
        })
    }

    enableToolboxGraph(){
        $('.btn-graph').each(function(){
            $(this).removeClass('disabled');
        })
    }

    disableToolboxAdvanced(){
        $('.btn-advance').each(function(){
            $(this).addClass('disabled');
        })
    }

    enableToolboxAdvanced(){
        $('.btn-advance').each(function(){
            $(this).removeClass('disabled');
        })
    }

    disableButtonByName(name){
        if (!name) return false;
        let eleName = `#symbol-${name}`;
        $(eleName).addClass('disabled');
    }
    
    enableButtonByName(name){
        if (!name) return false;
        let eleName = `#symbol-${name}`;
        $(eleName).removeClass('disabled');
    }
}

export default BaseView;