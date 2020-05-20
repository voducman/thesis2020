class BaseView {
    static getDesignId(){
        let pathArr = location.pathname.split('/');
        return pathArr[pathArr.length - 1];
    }

    static disableToolbox(){
        $('.btn-symbol').each(function(){
            $(this).addClass('disabled');
        })

    }

    static enableToolbox(){
        $('.btn-symbol').each(function(){
            $(this).removeClass('disabled');
        })
    }

    static disableToolboxBasic(){
        $('.btn-basic').each(function(){
            $(this).addClass('disabled');
        })
    }

    static enableToolboxBasic(){
        $('.btn-basic').each(function(){
            $(this).removeClass('disabled');
        })
    }

    static disableToolboxElements(){
        $('.btn-element').each(function(){
            $(this).addClass('disabled');
        })
    }

    static enableToolboxElements(){
        $('.btn-element').each(function(){
            $(this).removeClass('disabled');
        })
    }

    static disableToolboxGraph(){
        $('.btn-graph').each(function(){
            $(this).addClass('disabled');
        })
    }

    static enableToolboxGraph(){
        $('.btn-graph').each(function(){
            $(this).removeClass('disabled');
        })
    }

    static disableToolboxAdvanced(){
        $('.btn-advance').each(function(){
            $(this).addClass('disabled');
        })
    }

    static enableToolboxAdvanced(){
        $('.btn-advance').each(function(){
            $(this).removeClass('disabled');
        })
    }

    static disableButtonByName(name){
        if (!name) return false;
        let eleName = `#symbol-${name}`;
        $(eleName).addClass('disabled');
    }
    
    static enableButtonByName(name){
        if (!name) return false;
        let eleName = `#symbol-${name}`;
        $(eleName).removeClass('disabled');
    }
}

export default BaseView;