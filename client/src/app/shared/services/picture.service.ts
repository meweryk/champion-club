import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  // GridFS Way
  //Get photo from server
  //@param photo_id ID of photo to retrieve
  getPhoto(photo_id): Observable<Blob> {
    return this.http.get(`/api/pictures/${photo_id}`, { responseType: 'blob' });
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
  deletePhoto(pictureId) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    return this.http.delete(`/api/pictures/${pictureId}`, { headers: headers });
  }
}
