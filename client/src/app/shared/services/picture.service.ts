import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private http: HttpClient) { }

  getPhotoId(albumId: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'appliction/json')
    return this.http.get<any>(`/api/pictures/album/${albumId}`)
  }

  getPhoto(filename: string, type): Observable<Blob> {
    return this.http.get(`/api/pictures/${filename}`, {
      responseType: 'blob'
    })
  }

  //Uploads the photos to the backend server
  //@param id photo album to add the picture to
  //@param photos picture to upload to server
  uploadPhotos(albumId: string, image?: File): Observable<Message> {
    const fd = new FormData()
    if (image) {
      fd.append('image', image, image.name)
      fd.append('albumId', albumId)
    }
    return this.http.post<Message>(`/api/pictures/write`, fd)
  }

  //Delete photo
  //@param pictureId picture ID to delete
  deletePhoto(pictureId: string): Observable<Message> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    return this.http.delete<Message>(`/api/pictures/${pictureId}`, { headers: headers });
  }
}
