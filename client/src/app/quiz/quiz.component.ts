import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
    user: object;
    quizset: Array<any>;
    answerset: object;

    constructor( private _mainService: MainService, private _router: Router ) {
        this.user = { name: "" };
        this.quizset = [];
    }

    get_quiz() {
        this._mainService.get_quiz((res)=>{
            // console.log("get quiz", res);
            this.quizset = res.quizset;
            // console.log("quizset:", this.quizset);
        });
    }

    grade_quiz() {
        var score = 0;
        for (let i = 0; i < this.quizset.length; i++) {
            // console.log("this.quizset", i, this.quizset[i]);
            if (this.quizset[i].chosen == this.quizset[i].answer) {
                score += 1;
            }
        }
        this.user['score'] = score;
        // console.log("scored:", this.user['score']);
        this._mainService.grade_quiz(this.user['score'], (res)=>{
            this._router.navigate(['/index']);
        });
    }

    logged_in() {
        this._mainService.logged_in((res)=>{
            // console.log("service", res);
            if(res.user != null) {
                // console.log("now logged in", res);
                this.user = res.user;
                // console.log("this.user:", this.user);
                this.get_quiz();
            } else {
                // console.log("not logged in.");
                this._router.navigate(['/index']);
            }
        });
    }

    ngOnInit() {
        this.logged_in();
    }

}
