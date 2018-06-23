import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: object;

    constructor( private _mainService: MainService, private _router: Router ) {
        this.user = { name: "" };
    }

    login() {
        this._mainService.login(this.user, (res)=> {
            // console.log("service returned", res.user);
            // console.log("name:", res.user.name);
            this._router.navigate(['/']);
        });
    }

    logged_in() {
        this._mainService.logged_in((res)=>{
            if(res.user) {
                // console.log("logged in:", res);
                this._router.navigate(['/']);
            } else {
                // console.log("not logged in:", res);
                this.user = { name: "" };
            }
        });
    }

    ngOnInit() {
        this.logged_in();
    }

}
