import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
    user: object;
    question: object;

    constructor( private _mainService: MainService, private _router: Router ) {
        this.user = { name: "" };
        this.question = { new_question: "", answer: "", fake_answer1:"", fake_answer2:"" };
    }

    add_question() {
        // console.log("question to add:", this.question);
        this._mainService.add_question(this.question, (res)=> {
            // console.log("got question back: ", res);
            this._router.navigate(['/']);
        })
    }

    logged_in() {
        this._mainService.logged_in((res)=>{
            // console.log("service", res);
            if(res.user != null) {
                // console.log("logged in", res);
                this.user = res.user;
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
