import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";
import 'rxjs/add/observable/throw';
import "rxjs/add/operator/map";

export const BASEURL = "http://120.76.247.73:11006";

/**
 * 通用API服务，用于简单的调用后端的Controller及其方法，避免后端人员自行处理Restful类型API的麻烦
 */
@Injectable()
export class API {

    _url = BASEURL + '/api.do';
    /**
     * 设置API地址，如果是多个服务器，请使用Nginx或者其它网关软件先行统一地址
     * @param url API地址
     */
    set url(url: string) {
        this._url = url;
    }

    /**
     * 注入http服务
     * @param http
     */
    constructor(public http: Http, public router: Router) {
    }

    public call(...args: any[]): any {
        if (args.length < 1) {
            throw new Error("At least one argument for $rpc call ");
        }
        let name = args[0];
        args = args.slice(1);
        // 定义Http头
        let headers = new Headers({
            "Content-Type": "application/json"
        });
        // 从localStorage中获取登录令牌
        let jwt = localStorage["jwt"];
        if (jwt) {
            headers.append("Authorization", "Bearer " + jwt);
        }
        else {
            headers.append("Authorization", "Bearer anonymous.anonymous");
        }
        // 设置http头
        let options = new RequestOptions({ headers: headers });
        // 优化名字参数，提高鲁棒性
        name = name.substring(0, 1).toLowerCase() + name.substring(1);
        let request = {
            name: name,
            token: localStorage.getItem("request-token"),
            args: args
        };
        // 请求服务器
        let response = this.http.post(this._url, request, options)
            .map(res => res.json())
            .catch(error => (error && error.json()));
        // 定义处理器
        let handlers = {};
        // 订阅返回结果并处理
        response.subscribe(json => {
            let ok = handlers["ok"];
            let fail = handlers["fail"];
            if (json["error"] || json["cause"]) {
                //登录失效，自动跳转登录页面
                if (json["code"] === -9999) {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('jwt');
                    this.router.navigateByUrl("security/login");
                    return;
                }
                console.error(name + ":" + json["cause"]);
                if (fail instanceof Function) {
                    fail(json);
                }
            }
            else {
                if (ok instanceof Function) {
                    ok(json);
                }
            }
        }, error => {
            let fail = handlers["fail"];
            if (fail instanceof Function) {
                fail(error);
            }
        });
        // 拟态返回器
        let result = {
            ok: fn => {
                handlers["ok"] = fn;
                return result;
            },
            fail: fn => {
                handlers["fail"] = fn;
                return result;
            }
        };
        return result;
    }

    /**
     *  get请求
     * @param url
     * @param paramObj
     */
    public get(url: string, paramObj: any) {
        return this.http.get(url + this.toQueryString(paramObj))
            .toPromise()
        // .then(res => this.handleSuccess(res.json()))
        // .catch(error => this.handleError(error));
    }

    toQueryString(obj) {
        let ret = [];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                key = encodeURIComponent(key);
                let values = obj[key];
                if (values && values.constructor === Array) {
                    let queryValues = [];
                    for (let i = 0, len = values.length, value; i < len; i++) {
                        value = values[i];
                        queryValues.push(this.toQueryPair(key, value));
                    }
                    ret = ret.concat(queryValues);
                } else {
                    //字符串
                    ret.push(this.toQueryPair(key, values));
                }
            }
        }
        return '?' + ret.join('&');
    }

    toQueryPair(key, value) {
        if (typeof value === 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    }
}
