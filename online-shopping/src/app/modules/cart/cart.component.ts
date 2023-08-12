import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    questions: any[];
    isAgreementChecked: boolean = false;

    constructor() {
      this.questions = [[1, 562, 'Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1Questionestion1Question1Question1Question1'],
          [2,2,'Question2'],
          [3,3,'Question 3']];

  }

  ngOnInit(): void {

  }
    rgAttempt(qId, val){
        //if not exist insert into directly but if exist change the old answer values
        console.log(qId, val);
    }

    protected readonly document = document;
}
export class Question {
    id: number;
    no: number;
    description: string;
}

