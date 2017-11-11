import { Component, OnInit } from '@angular/core';
import { LlamaService } from '../../core/llama.service'
import { LoginService } from '../../core/login.service'
import { Llama } from '../../core/llama.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup-box',
  templateUrl: './signup-box.component.html',
  styleUrls: ['./signup-box.component.css'],
  providers: [ LlamaService ]
})
export class SignupBoxComponent implements OnInit {

  llama: Llama = new Llama();
  alreadyExists;
  requiredFields;

  constructor(
    private llamaService: LlamaService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.requiredFields = true;
  }

  addLlama(): void {
    this.llamaService.createLlama(this.llama).subscribe(() => {
      this.loginOnRegister();
    }, (error) => {
      if(error.error.code == 11000) {
        this.alreadyExists = true;
        this.requiredFields = true;
      } else {
        this.requiredFields = false;
      }
    })
  }

  loginOnRegister() {
    let llama = this.llama
    
    return this.loginService.login(llama)
      .subscribe((res) => {
        localStorage.setItem('currentUser', res['token'])
        this.router.navigate(['/account']);
      })
  }

}
