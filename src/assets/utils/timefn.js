/*eslint-disable*/
function add0(m){return m<10?'0'+m:m }
export function formatDate(timeStamp){

    //shijianchuo是整数，否则要parseInt转换
        timeStamp = parseInt(timeStamp) === NaN ? 0 : parseInt(timeStamp)
        var time = new Date(timeStamp);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        // return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
        return y+'/'+add0(m)+'/'+add0(d);
}
