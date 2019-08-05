import { Component, OnInit } from '@angular/core';
import { Flag } from 'src/app/shared/flag.model';
import { FlagService } from 'src/app/shared/flag.service';
import { RecordService } from 'src/app/shared/record.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styles: []
})
export class FlagComponent implements OnInit {

  flag : Flag [];
  imageUrl ="http://localhost:62921/Images/40/default-image.png";
  fileToUpload: File;
  
  constructor(private flagService : FlagService,
              private recordService : RecordService, 
              private toastr : ToastrService,
              public dialogRef: MatDialogRef<FlagComponent>) { 
  }

  ngOnInit() {
    this.flagService.getFlag().then( res =>{
      this.flag = res as Flag[];
    });

  }

  onFileSelected(file : FileList) {
    this.fileToUpload = file.item(0);
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (event: any) => {
        console.log("event.target: ", event);
        console.log("inputNode.files[0]: ", inputNode.files[0]);
        this.flagService.imageUrl = event.target.result;
        this.flagService.form.value.ImagePath = inputNode.files[0].name;
        
      };
      
      reader.readAsDataURL(this.fileToUpload);
      //reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  onClear() {
    this.flagService.form.reset();
    this.flagService.initializeFormGroup();
  }

  onSubmit(){
    this.flagService.form.value;
    console.log("form: ", this.flagService.form.value);
    if(!this.flagService.form.value.ID){
      this.insertFlag(this.flagService.form);
    }
    else{
      this.updateFlag(this.flagService.form);
    }
    this.flagService.form.reset();
    this.flagService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClose() {
    this.flagService.form.reset();
    this.flagService.initializeFormGroup();
    this.dialogRef.close();
  }

  insertFlag(form : any){
    this.flagService.postFlag(form.value, this.fileToUpload).subscribe(res => {
      this.toastr.success("inserted successfully", 'EMP. Register');
    },
    err =>{
      debugger;
      console.log(err);
    });
  }

  updateFlag(form : any){
    console.log("form.value: ", form.value);
    this.flagService.putFlag(form.value, this.fileToUpload).subscribe(res =>{
      this.toastr.info("updated successfully", 'EMP. Register');
    });
  }

}
