//import md5 = require('md5');
import * as md5 from 'md5';

export interface InvalidMsg {
    code: string;
    msg: string;
}

export interface Enterprise {
    id: number;
    name: string;
}

class ServerMgr {

    static userNameItem:string = "lubango-userName";
    static lubanUrlItem:string = "lubango-lubanUrl";
    static epidItem:string = "lubango-epid";
    static epnameItem:string = "lubango-epname";
    // private member
    private _listenerList: Array<(error: InvalidMsg) => void> = [];
    private _intervalBeat: NodeJS.Timeout | null = null;

    userName(): string {
        return sessionStorage.getItem(ServerMgr.userNameItem) as string;
    }

    lubanUrl(): string {
        return sessionStorage.getItem(ServerMgr.lubanUrlItem) as string;
    }

    addListener(listener: (error: InvalidMsg) => void): void {
        if(!this._listenerList.includes(listener)) {
            this._listenerList.push(listener);
        }
    }

    removeListener(listener: (error: InvalidMsg) => void): void {
        this._listenerList = this._listenerList.filter(el => el !== listener);
    }

    loginLuban(url: string, userName: string, password: string, fnRet: (error?:string) => void): void {
        if(!url) {
            fnRet("服务地址为空！");
            return;
        }
        if(url && url[url.length-1] === '/') {
            url = url.slice(0,url.length-1);
        }
        let passwdMd5 = md5.default(password);
        const onLogined = () => {
            sessionStorage.setItem(ServerMgr.lubanUrlItem, url);
            sessionStorage.setItem(ServerMgr.userNameItem, userName);
            this.startHeartBeat();
            fnRet();
        };      
        fetch(url+"/login", {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
        .then(response => response.text())
        .then(htmlText => {
            let parser: DOMParser = new DOMParser();
            let htmlDoc: Document = parser.parseFromString(htmlText, 'text/html');
            let success = htmlDoc.getElementsByClassName("success");
            if(success.length > 0) {
                onLogined();
                return;
            }
            let lt: string|null = htmlDoc.getElementsByName('lt')[0].getAttribute('value');
            let execution: string|null = htmlDoc.getElementsByName('execution')[0].getAttribute('value');
            let eventId: string|null = htmlDoc.getElementsByName('_eventId')[0].getAttribute('value');
            let requestBody: string = "username="+userName+"&password="+passwdMd5+"&productId=87&lt="+lt+"&execution="+execution+"&_eventId="+eventId+"&submit=LOGIN";
            fetch(url + "/login", {
                method: 'POST',                
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: requestBody
            })
            .then(response => {
                if(!response.ok) {
                    response.json()
                    .then(data => {
                        fnRet(data.message);
                    })
                    .catch(() => {
                        fnRet("登录失败！");
                    });
                    return;
                }
                onLogined();
            })
        })
        .catch(() => {
            fnRet("登录失败！");
        });
    }

    logoutLuban(fnRet?: () => void): void {
        this.stopHearBeat();
        this.fetchGet(this.lubanUrl(), "/rs/casLogin/logout")
        .then(() => {
            if(fnRet) {
                fnRet();
            }
        })
        .catch(() => {
            if(fnRet) {
                fnRet();
            }
        });
    }

    getEnterpriseList(fnRet: (enterpriseList: Enterprise[], error?: string) => void) {

        this.fetchGet(this.lubanUrl(), "/rs/casLogin/listCompany")
        .then(data => {
            let enterpriseList: Enterprise[] = [];
            if(Array.isArray(data)) {
                data.forEach(el => {
                    enterpriseList.push({id: el.enterpriseId, name: el.enterpriseName});
                });
            }
            fnRet(enterpriseList);
        })
        .catch(error => {
            fnRet([],error);
        });
    }

    enterEnterprise(epid:number, epName:string, fnRet: (error?:string) => void) {
        this.fetchPost(this.lubanUrl(), "/rs/casLogin/casLogin", {
            platform: window.navigator.userAgent,
            systemVersion: window.navigator.appVersion,
            epid: epid
        })
        .then(data => {
            sessionStorage.setItem(ServerMgr.epidItem, epid.toString());
            sessionStorage.setItem(ServerMgr.epnameItem, epName.toString());
            fnRet();
        })
        .catch(fnRet);
    }

    // private method
    private startHeartBeat(): void {
        this.stopHearBeat();
        this._intervalBeat = setInterval(() => {
            this.fetchGet(this.lubanUrl(), '/casLogin/heartBeat')
            .then(() => {})
            .catch(() => {});
        }, 5*60*1000);
    }

    private stopHearBeat(): void {
        if(this._intervalBeat) {
            clearInterval(this._intervalBeat);
        }
        this._intervalBeat = null;
    }

    private fetchGet(url: string, method: string, parameter?: object) { 
        
        return new Promise((resolve, reject) => {
            let paramStr: string = "";
            if(parameter) {
                let paramList: string[] = [];
                (Object.keys(parameter) as Array<keyof typeof parameter>).forEach(el => {
                    paramList.push(el+"="+parameter[el]);
                });
                if(paramList.length > 0) {
                    paramStr = "?" + paramList.join("&");
                }
            }
            fetch(url+method+paramStr, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            })
            .then(response => {
                if(!response.ok) {
                    this.invalidRequest(response, reject);
                    return;
                }
                response.json().then(data => {
                    resolve(data);
                });
            })
            .catch(() => reject(method+"异常！"));
        });
    }

    private fetchPost(url: string, method: string, paramerter: any) {

        return new Promise((resolve, reject) => {
            fetch(url+method, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers : {
                    'content-type': 'application/json;chartset=utf-8'
                },
                body: JSON.stringify(paramerter)
            })
            .then(response => {
                if(!response.ok) {
                    this.invalidRequest(response, reject);
                    return;
                }
                response.json().then(data => {
                    if("code" in data) {
                        if(data.code === 200 || data.code === 0) {
                            resolve(data);
                        }
                        else {
                            reject(data.msg);
                        }
                    }
                    else {
                        resolve(data);
                    }
                });
            })
            .catch(() => reject(method+"异常！"));
        });
    }

    private invalidRequest(response: Response, fnRet?: (error: string) => void) {
        response.json().then(data => {
            if(data.infoCode === "1002" || data.infoCode === "1007") {
                let invalidMsg: InvalidMsg = {
                    code: data.infoCode,
                    msg: data.infoCode === "1002"?"当前账号登录信息已过期，请您重新登录！" : "同一账号在别处登录，您被迫下线！"
                };
                this._listenerList.forEach(el => {el(invalidMsg);});
            }
            if(fnRet) {
                fnRet(data.message);
            }
        })
    }
}

const serverMgr: ServerMgr = new ServerMgr;
export default serverMgr;