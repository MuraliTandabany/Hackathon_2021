import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  SignInFormGroup: FormGroup;
  isSignInFailed = false;
  requiredFieldMissing = false;
  isSignIn = true;
  // signin: FormGroup = new FormGroup({
  //   email: new FormControl('', [Validators.email, Validators.required ]),
  //   password: new FormControl('', [Validators.required, Validators.min(3) ])
  // });
  // email = '';
  // password = '';

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);
  hide = true;
  // get emailInput() { return this.signin.get('email'); }
  // get passwordInput() { return this.signin.get('password'); }

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.SignInFormGroup = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
  signIn() {
    if (this.SignInFormGroup.valid) {
      this.isSignInFailed = false;
      this.loginService.signIn(this.SignInFormGroup.value.email, this.SignInFormGroup.value.password).subscribe(() => {
        this.router.navigate(['/checkout']);
      }, (err) => {
        this.isSignInFailed = true;
        this.SignInFormGroup.get('password').setValue('');
      });
    } else {
      this.isSignInFailed = false;
      this.requiredFieldMissing = true;
    }
  }
  onClickRegister() {
    if (this.SignInFormGroup.valid) {
      this.isSignInFailed = false;
      this.loginService.register(this.SignInFormGroup.value.email, this.SignInFormGroup.value.password).subscribe(() => {
        // condition to be checked to navigate to home or checkout
        this.router.navigate(['/checkout']);
      }, (err) => {
        this.isSignInFailed = true;
        this.SignInFormGroup.get('password').setValue('');
      });
    } else {
      this.isSignInFailed = false;
      this.requiredFieldMissing = true;
    }
  }

  onClickCreateAccount() {
    this.isSignIn = false;
    document.getElementById('signinContainer').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('signinContainer').style.opacity = '1';
    }, 500);
  }

  onClickHaveAccount() {
    this.isSignIn = true;
    document.getElementById('signinContainer').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('signinContainer').style.opacity = '1';
    }, 500);
  }

  guestCheckoutClick(){
    this.router.navigate(['/checkout']);
  }
}
