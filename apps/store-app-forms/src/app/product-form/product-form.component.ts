import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  showMessage = false;
  constructor() { 
  }

  ngOnInit() {
  }

  // onSubmit(form: NgForm) {
  //   console.log('Form submitted. f=', form);
  // }

  onSubmit() {
    console.log(this.form);
  }
}
