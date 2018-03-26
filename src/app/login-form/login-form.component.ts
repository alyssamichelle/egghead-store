import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-login-form",
  template: `
    <form (submit)="onLoginClick(userName.value)">
    <input #userName placeholder="username" type="text"/>
    <input (submit)="onLoginClick(userName.value)" value="Login" type="submit">
    </form>
  `,
  styles: []
})
export class LoginFormComponent implements OnInit {
  onLoginClick(value) {
    //prevent default
    console.log('hi');
    return false;
  }

  constructor() {}

  ngOnInit() {}
}
