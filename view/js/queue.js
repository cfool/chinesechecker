(function($){
    $.fn.Queue = $.Queue = function(){
        var queue = new Object();

        queue.start = 0;
        queue.end = -1;

        queue.empty = function(){
            return queue.start > queue.end;
        }

        queue.push = function(v){
            queue.end ++;
            queue[queue.end] = v;
        }

        queue.pop = function(){
            if(queue.start > queue.end) return undefined;
            return queue[queue.start++];
        }

        queue.size = function(){
            return queue.end + 1 - queue.start;
        }


        return queue;
    }
}(jQuery))
