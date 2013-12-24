(function($,win,doc){
    var position=[
    [300,50],
    [200,50]
    ];
    function $ico(id){
        var ico='<img id="'+id+'" class="ico" src="../image/Red.ico"/>';
        var $ico=$(ico);
        return $ico;
    }

    function setPos($img,x,y){
        $img.css("left",x+"px");
        $img.css("top",y+"px");
    }

    function init(){
        for(var i=0,len=position.length;i < len; ++i){
            var $img=$ico("ico"+i);
            setPos($img,position[i][0],position[i][1]);
            $("#mainview").append($img);
        }
    }
    function run(){
        alert("run");
    }
    function pause(){
        alert("pause");
    }
    function move(id,cur){
        $('#'+id).animate({
            left:position[cur][0]+'px',
            top:position[cur][1]+'px'
        });
    }
    $.fn.checker=$.checker=function(){
        var api={
            init: init,
            run:  run,
            move: move,
            pause: pause
        };
        return api;
    }
}(jQuery,window,document))
