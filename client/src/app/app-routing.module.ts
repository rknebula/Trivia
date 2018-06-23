import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
    {path:"", component: MainComponent},
    {path:"index", component: LoginComponent},
    {path:"new_question", component: QuestionComponent},
    {path:"quiz", component: QuizComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
