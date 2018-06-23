import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    user: object;
    userList: Array<any>;
    quizFlag: boolean;
    questionFlag: boolean;

    constructor( private _mainService: MainService, private _router: Router ) {
        this.user = { name: "" };
        this.userList = [];
        this.quizFlag = false;
        this.questionFlag = false;
    }

    get_quiz() {
        this._router.navigate(['/quiz']);
    }

    logged_in() {
        this._mainService.logged_in((res)=>{
            // console.log("service", res);
            if(res.user != null) {
                // console.log("now logged in", res);
                this.user = res.user;
                this.userList = res.users;
                // console.log("THIS USERLIST:", this.userList);
            } else {
                // console.log("not logged in.");
                this._router.navigate(['/index']);
            }
        });
    }

    ngOnInit() {
        this.logged_in();
        this._mainService.quizFlag.subscribe((flag)=>{
            console.log(flag);
            this.quizFlag = flag;
            // console.log("quizFlag is now:", this.quizFlag);
        })
        this._mainService.questionFlag.subscribe((flag)=>{
            console.log(flag);
            this.questionFlag = flag;
            // console.log("questionFlag is now:", this.questionFlag);
        })

    }

}
