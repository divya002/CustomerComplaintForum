import { Component, OnInit } from '@angular/core';
import { ComplainService } from '../complain.service';
import { Router } from '@angular/router';
import { FLAGS } from '@angular/core/src/render3/interfaces/view';
import { Complain } from '../complain';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  type=localStorage.getItem('type');
  email=localStorage.getItem('email');
  complainTableData= [];
  complainPopupData=new Complain();
  popComment= [];
  status="";
  submitted: boolean = false;
  complain = new Complain();
  comment = {
    text: "",
    createdby: localStorage.getItem('email'),
    creationdate: new Date()
  };
  flag = false;
  addcomment = false;
  display = 'none';
  addNew() {
    this.flag = !this.flag;
    this.complain.heading = "";
    this.complain.description = "";
  }
  addComment() {
    this.addcomment = !this.addcomment;
    this.comment.text = "";

  }
  openModal() {
    this.display = 'block';
  }
  onCloseHandled() {
    this.display = 'none';
  }
  constructor(private complainService: ComplainService, private router: Router) { }
  submitComplain() {
    this.submitted = true;
    this.complain.email = localStorage.getItem('email');
    if (this.complain.email != "" && this.complain.heading != "" && this.complain.description != "") {
      this.complainService.postComplaint(this.complain)
        .subscribe((res) => {
          alert("Saved Successfully");
        },
          (err) => {
            alert(err);
          });
    }
    else
      alert("Please fill all details");

  }
  updateComplain(id) {
    var updateComplain = {
      dateupdated: new Date(),
      status:'',
      comment: []
    };
    updateComplain.comment = this.popComment;
    updateComplain.status=this.status;
    if (this.comment.text != "") {
      updateComplain.comment.push(this.comment);
      this.complainService.postSingleComplaint(updateComplain, id)
        .subscribe((res) => {
          alert("Updated Successfully");
        },
          (err) => {
            alert(err);
          });
    }
    else
      alert("Fill comment First");
  }
  getComplaint() {
    this.complainService.getComplaint()
      .subscribe((res) => {
        var email=localStorage.getItem('email');
        var type=localStorage.getItem('type');
        if(res.result!=[]){
        if(type=="Agent")
        this.complainTableData = res.result;
        else{
          this.complainTableData=res.result.filter((obj)=>{
            return(obj.email==email);
          })
        }
      }
      else
      alert("No Complaints from You");
      });
  };
  getSingleComplaint(id) {
    this.complainService.getSingleComplaint(id)
      .subscribe((res) => {
        this.complainPopupData = res.result;
        this.status=res.result.status;
        this.popComment = res.result.comment;
      });
  };
  ngOnInit() {
    this.getComplaint();
  }

}
