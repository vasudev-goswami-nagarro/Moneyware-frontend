import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {FileUploadService} from '../../../core/services/file-upload.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  documentUploadForm: FormGroup;
  percentDone: number;
  uploadSuccess: boolean;
  files: File[] = [];
  submitted = false;
  uploadError = false;
  errorMessage = '';
  errorStatus: number;

  constructor(private fileUploadService: FileUploadService, private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    this.documentUploadForm = this.formBuilder.group({
      documentType: ['', Validators.required],
    });
  }

  onChange(event) {
    this.files = event.target.files;
    this.submitted = false;
    this.uploadSuccess = false;
    this.percentDone = 0;
  }

  uploadAndProgress(files: File[], documentType) {
    this.fileUploadService.upload(files, documentType) .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
        this.percentDone = Math.round(100 * event.loaded / event.total);
        console.log(`File is ${this.percentDone}% loaded.`);
      } else if (event instanceof HttpResponse) {
        this.uploadSuccess = true;
      }
    },
      (err: HttpErrorResponse) => {
        console.log('Upload Error:', err);
        this.uploadError = true;
        this.errorMessage = err.message;
        this.errorStatus = err.status;
      }, () => {
        this.uploadSuccess = true;
        console.log('Upload done');
      });
  }

  onSubmit() {
    this.uploadError = false;
    this.errorMessage = '';
    this.errorStatus = -1;
    this.submitted = true;
    if (this.documentUploadForm.invalid) {
      return;
    }
    if (this.files.length > 0) {
      this.uploadAndProgress(this.files, this.documentUploadForm.get('documentType').value);
    }
  }

  get data() { return this.documentUploadForm.controls; }

}
