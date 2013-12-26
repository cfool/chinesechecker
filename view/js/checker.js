(function($,win,doc){
    var position=[ [292,55], [274,87.3],[310,87.3], [256,119.6],[292,119.6],[328,119.6], [238,151.9],[274,151.9],[310,151.9],[346,151.9], [76,184.2],[112,184.2],[148,184.2],[184,184.2],[220,184.2],[256,184.2],[292,184.2],[328,184.2],[364,184.2],[400,184.2],[436,184.2],[472,184.2],[508,184.2], [94,216.5],[130,216.5],[166,216.5],[202,216.5],[238,216.5],[274,216.5],[310,216.5],[346,216.5],[382,216.5],[418,216.5],[454,216.5],[490,216.5], [112,248.8],[148,248.8],[184,248.8],[220,248.8],[256,248.8],[292,248.8],[328,248.8],[364,248.8],[400,248.8],[436,248.8],[472,248.8], [130,281.1],[166,281.1],[202,281.1],[238,281.1],[274,281.1],[310,281.1],[346,281.1],[382,281.1],[418,281.1],[454,281.1], [148,313.4],[184,313.4],[220,313.4],[256,313.4],[292,313.4],[328,313.4],[364,313.4],[400,313.4],[436,313.4], [130,345.7],[166,345.7],[202,345.7],[238,345.7],[274,345.7],[310,345.7],[346,345.7],[382,345.7],[418,345.7],[454,345.7], [112,378],[148,378],[184,378],[220,378],[256,378],[292,378],[328,378],[364,378],[400,378],[436,378],[472,378], [94,410.3],[130,410.3],[166,410.3],[202,410.3],[238,410.3],[274,410.3],[310,410.3],[346,410.3],[382,410.3],[418,410.3],[454,410.3],[490,410.3], [76,442.6],[112,442.6],[148,442.6],[184,442.6],[220,442.6],[256,442.6],[292,442.6],[328,442.6],[364,442.6],[400,442.6],[436,442.6],[472,442.6],[508,442.6], [238,474.9],[274,474.9],[310,474.9],[346,474.9], [256,507.2],[292,507.2],[328,507.2], [274,539.5],[310,539.5], [292,571.8] ];
    var color=['Red','Blue','Purple','Brown','Green','Yellow'];
    var area=[
    [0,1,2,3,4,5,6,7,8,9],
    [10,11,12,13,23,24,25,35,36,46],
    [19,20,21,22,32,33,34,44,45,55],
    [65,75,76,86,87,88,98,99,100,101],
    [74,84,85,95,96,97,107,108,109,110],
    [111,112,113,114,115,116,117,118,119,120]];
    var checkerPos=false;
    var map=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    var players = false;
    var turn = 0;



    
    function $ico(id,c){
        return $('<img id="'+id+'" class="checker" src="../image/'+c+'.ico"/>');
    }
    function $blank(id){
        return $('<div id="'+id+'" class="blank" ></div>');
    }

    function setPos($img,x,y){
        $img.css("left",x+"px");
        $img.css("top",y+"px");
    }

    function m(c,id){
        return (c<<4)+id;
    }

    function brain(m,c){
        var pre = false;
        var cur = false;

        for(var i = 0, len = m.length; i < len; ++i){
            if(m[i] >> 4 == c && !pre){
                pre = i+1;
            }
            if(m[i] == -1 && !cur){
                cur = i+1;
            }
        }

        return [pre-1,cur-1];
    }
    function init(checker){
        checkerPos= new Object();
        players = new Object();
        players.sum = checker.length;
        for(var i=0,len=checker.length;i < len; ++i){
            var c = checker[i][0];
            var a = checker[i][1];
            players[i] = new Object();
            players[i].color = c;
            players[i].brain = brain;

            for(var id=0, len1=area[a].length; id < len1; ++id){
                map[area[a][id]] = m(c,id);
                var icoid = 'c'+color[c]+id;
                var $img = $ico(icoid,color[c]);
                setPos($img,position[area[a][id]][0]-16,position[area[a][id]][1]-16);
                $("#mainview").append($img);
                checkerPos[icoid] = new Object();
                checkerPos[icoid]["color"]=c;
                checkerPos[icoid]["id"]=id;
                checkerPos[icoid]["pos"]=area[a][id];
            }
        }
        (function(){
            $("#mainview").bind("selectstart",function(){
                return false;
            });
        })();
    }

    function pause(){
        alert("pause");
    }
    function movesys(prev,curr) {
        $.ajax( 
            {
                url: 'http://localhost/chinesechecker/system/game.php/login',
        type: 'POST',
        data:
        {
            pre: prev,
        cur: curr       
        },
        dataType: 'json',
        error: function(){
            alert("Ooooooops! Something Wrong happened!");
        },
        success: function(response){
            if (response.state != 0) {
                alert("Incorrect account or password!");
            }
            else {
                alert(response.comeurl);
            }
        }
            });
    }

    function move(pre,cur){
        var c = map[pre]>>4;
        var id = map[pre] & 0xf;

        movesys(pre,cur);
        $('#c'+color[c]+id).animate(
            {
            left:position[cur][0]-16,
            top:position[cur][1]-16
            },
            1000
        );
    }
    function run(){
        var step = players[turn].brain(map,players[turn].color);
        move(step[0],step[1]);

        map[step[1]] = map[step[0]];
        map[step[0]] = -1;
        turn = (turn + 1) % players.sum;
        setTimeout(run,1500);
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
