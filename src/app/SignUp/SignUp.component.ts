import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.css']
})
export class SignUpComponent implements OnInit {

  public signupForm !:FormGroup;
  router: any;
  constructor(private formBuilder:FormBuilder ,private http : HttpClient){  }

  ngOnInit(): void{
    this.signupForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.pattern('[A-Za-z]{3,}')]],
      email:['',[Validators.required,Validators.pattern(new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g))]],
      mobileNumber:['',Validators.required,Validators.pattern('[1-9]{10}')],
      password:['',[Validators.required,Validators.pattern('(?=.\d)(?=.[a-z])(?=.*[A-Z]).{3,}')]],
      confirmPassword:['',[Validators.required,Validators.pattern('(?=.\d)(?=.[a-z])(?=.*[A-Z]).{3,}')]]
    })
  }
signUp(){
this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value)
.subscribe(res=>{
  alert("Signup Successfull");
  this.signupForm.reset();
  this.router.navigate(['/login']);
},err=>{
  alert("Something went wrong");
})
  }
}
