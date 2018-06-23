import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class MainService {
    quizFlag: BehaviorSubject<any> = new BehaviorSubject(false);
    questionFlag: BehaviorSubject<any> = new BehaviorSubject(false);

    constructor(private _http: Http) {

    }

    add_question(question, cb) {
        this.questionFlag.next(true);
        this._http.post("/add_question", question).subscribe((res)=>{
            // console.log("flipping added question");
            cb(res.json());
        })
    }

    get_quiz(cb) {
        // console.log("getting quiz....");
        this._http.get("/get_quiz").subscribe((res)=>{
            // console.log("got quiz", res.json());
            cb(res.json());
        })
    }

    grade_quiz(score, cb) {
        // console.log("scoring quiz....");
        this.quizFlag.next(true);
        this._http.post("/grade_quiz", {score: score}).subscribe((res)=>{
            cb(res.json());
        })
    }

    login(user, cb) {
        this._http.post("/login", user).subscribe((res)=>{
            // console.log("service login", res.json());
            cb(res.json());
        });
    }

    logged_in(cb) {
        this._http.get("/logged_in").subscribe((res)=> {
            // console.log("service check", res);
            cb(res.json());
        })
    }
}
