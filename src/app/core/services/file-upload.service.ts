import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  url = `${environment.baseUrl}/files`;

  constructor(private http: HttpClient) {
  }

  upload(files: File[], documentType: string) {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f));
    formData.append('documentType', documentType);
    return this.http.post(
      this.url + '/upload',
      formData, {reportProgress: true, observe: 'events'});
  }
}
