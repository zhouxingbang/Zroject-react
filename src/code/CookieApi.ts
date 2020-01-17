
export default class CookieApi {

    static getItem(key:string): string {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1"));
    }

    static setItem(key:string,value:string):void {
        let exp = new Date();
        exp.setTime(exp.getTime() + 365*24*60*60*1000);
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + "; expires=" + exp.toUTCString();
    }

    static removeItem(key:string):void {
        if(CookieApi.hasItem(key)) {
            document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    static hasItem(key:string):boolean {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
}