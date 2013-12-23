(function($,win,doc){
    function init(){
        alert("init");
    }
    function run(){
        alert("run");
    }
    function pause(){
        alert("pause");
    }
    $.fn.checker=$.checker=function(){
        var api={
            init: init,
            run:  run,
            pause: pause
        };
        return api;
    }
}(jQuery,window,document))
