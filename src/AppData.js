class AppData {

    constructor() {
        this.userName = "";
        this.passwd = "";
        this.motorAddr = "";
        this.motorToken = "";
        this.builderAddr = "";
        this.builderToken = "";
    }

    /**
     * 
     * @param {string} addr 
     * @param {() => {}} fnSuccess 
     * @param {(error) => {}} fnError 
     */
    loginMotor(addr, fnSuccess, fnError) {

        this.motorAddr = addr;

        let appId = "d0b3c61c6639434e84900b1fd8d391cb";
        let appSecret = "459dc8b77a63a0c009aec27f818febf6";
        let url=addr+"/v1.0/service/uc/auth/token?appid="+appId+"&secret=" +appSecret;

        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            if(typeof fnError === 'function') {
                fnError(error);
            }
        })
        .then(data => {
            if(data.code == 200) {
                this.motorToken = data.data;
                if(typeof fnSuccess === 'function') {
                    fnSuccess(data);
                }
            }
            else {
                if(typeof fnError === 'function') {
                    fnError(data.msg);
                }
            } 
        })
    }

    loginBuilder(addr, fnSuccess, fnError) {
        
        this.builderAddr = addr;

        let appId = "7efac727912d4867844025038e0bc9bf";
        let appSecret = "e8bdecbdcef970c0bd6cabe2ba891432";
        let url=addr+"/token/"+appId+"/" +appSecret;
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            if(typeof fnError === 'function') {
                fnError("服务器地址错误");
            }
        })
        .then(data => {
            if(data.code == 200) {
                this.builderToken = data.data;
                if(typeof fnSuccess === 'function') {
                    fnSuccess(data);
                }
            }
            else {
                if(typeof fnError === 'function') {
                    fnError(data.msg);
                }
            } 
        })
    }
}

let appData = new AppData();
export default appData;