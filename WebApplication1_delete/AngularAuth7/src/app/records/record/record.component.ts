import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/shared/record.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  imageFile: File = null;
  imageUrl : string = "/assets/img/default-image.png";
  fileToUpload : File = null;

  constructor(private service : RecordService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if (form != null)
      form.resetForm();
    this.service.formData = {
      RecordID : 0,
      Band : "",
      Album : "",
      Year : "",
      Genre : "",
      Image : null
    }
    this.imageUrl = "/assets/img/default-image.png";
  }

  onSubmit(form : NgForm){
    console.log("form.value.RecordID: ", Image);
    if(form.value.RecordID == null){
      console.log("event: ", form.value);
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
    this.imageUrl = "/assets/img/default-image.png";
  }

  onFileSelected(file : FileList){
    console.log("file: ", file);
    console.log("file[0]: ", file[0]);
    console.log("file.item(0): ", file.item(0));
    this.fileToUpload = <File>file[0];

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);
    console.log("event: ", this.imageUrl);
    //this.imageFile = <File>event.target.files[0];
  }

  insertRecord(form : NgForm){
    console.log("form.value: ", form.value.Image);
    //form.value.Image = this.fileToUpload;

    //form.value.Image = "sdsdcfsd";
    console.log("this.fileToUpload: ", form.value);
    this.service.postRecord(form.value, this.fileToUpload).subscribe(res => {
      this.toastr.success("inserted successfully", 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
      
    },
    err =>{
      debugger;
      console.log(err);
    });
  }

  updateRecord(form : NgForm){
    this.service.putRecord(form.value).subscribe(res =>{
      this.toastr.info("inserted successfully", 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }


}
