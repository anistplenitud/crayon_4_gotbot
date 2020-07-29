import { Component, OnInit } from '@angular/core';
import { ExpressApiService } from '../express-api.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  step_no = 1;
  details = {
    name : "",
    email : "",
    mobile : "",
    doc_id : ""
  }
  constructor(
    private express_api : ExpressApiService
  ) { }

  step(step_no) {
    console.log(this.details);
    
    if (step_no == 4) {

      this.details.name = "";
      this.details.email = "";
      this.details.mobile = "";
      this.details.doc_id = "";
      this.step_no = 1;
    } 
    else if (step_no == 1) {
      document.getElementById("step_1_error").style.display = "none";
      var res = this.details.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (res) {
        console.log("fine");
        this.express_api.insert_record(this.details).subscribe(
          (x)=>{
            var doc : any;
            doc = x;
            console.log(doc);
            console.log(doc["_id"]);
            console.log(x);
            this.details.doc_id = doc["_id"];
            this.step_no = step_no + 1;
          },
          (e)=>{
            console.log(e);
          }
        )
        
      }
      else {
        console.log("not fine");
        document.getElementById("step_1_error").style.display = "block";


      }
    }
    else if (step_no == 2) {
      this.express_api.update_record(this.details).subscribe(
        (x)=>{
          this.step_no = step_no + 1;
          console.log(x);
        },
        (e)=>{
          console.log(e);
        }
      )
    
    }
    else if (step_no == 3) {
      document.getElementById("step_3_error").style.display = "none";
      var res = this.details.mobile.replace(/\s/g,'').match(/^(\+27|0)[6-8][0-9]{8}$/);
      if (res) {
        console.log("fine");
        this.express_api.update_record(this.details).subscribe(
          (x)=>{
            this.step_no = step_no + 1;
            this.step_no = step_no + 1;
            console.log(x);
          },
          (e)=>{
            console.log(e);
          }
        )
        
      }
      else {
        console.log("not fine");
        document.getElementById("step_3_error").style.display = "block";


      }
    }
    else
    {

      console.log(step_no)
      this.step_no = step_no + 1;
    }
    
  }

  ngOnInit(): void {
  }

}
