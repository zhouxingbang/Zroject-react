
namespace Utils {

    export function parseNumerical(value:number, decimal?:number):string {
        if(isNaN(value)) return "0";
        return (value.toFixed(decimal ? decimal : 0) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    }

    /**
     * rgb值转换成十六进制颜色
     * @param {"rgb()"、"rgba()"、""} rgbColor 
     * @return 十六进制颜色，例如#ffffff
     */
    export function parseRgbaColor(rgbColor:string):string {

        let temp = rgbColor.split(',');
        if (temp.length < 3) return "";
    
        let strR = temp[0];
        if (strR.indexOf("rgba") === 0) {
            strR = strR.substring(5);
        }
        else if (strR.indexOf("rgb") === 0) {
            strR = strR.substring(4);
        }
        let r = parseInt(strR).toString(16);
        if (r.length < 2) r = "0" + r;
        let g = parseInt(temp[1]).toString(16);
        if (g.length < 2) g = "0" + g;
        let b = parseInt(temp[2]).toString(16);
        if (b.length < 2) b = "0" + b;
        let a = "";
        if (temp.length === 4) {
            a = parseInt(temp[3]).toString(16);
            if (a.length < 2) a = "0" + a;
        }
        return "#" + r + g + b + a;
    }

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18

    export function formatDate(date:Date, fmt:string):string {
        //author: meizz
        let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (date.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
        }
        (Object.keys(o) as Array<keyof typeof o>).forEach(k => {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k].toString() : ("00" + o[k]).substr((o[k].toString()).length));
            }
        });
        return fmt;
    }
}

export = Utils;