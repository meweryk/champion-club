import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album, Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class AlbumService {

  albums: Album[]

  constructor(private http: HttpClient) { }

  getAlbum(id: string): Observable<any> {
    let headers = new HttpHeaders()
    headers = headers.set('Content-type', 'application/json')
    return this.http.get(`/api/albums/${id}`, { headers: headers })
  }

  getAlbums(): Observable<Album[]> {
    let headers = new HttpHeaders()
    headers = headers.set('Content-type', 'application/json')
    return this.http.get<Album[]>('/api/albums', { headers: headers })
  }

  addAlbum(album: Album): Observable<Album> {
    let headers = new HttpHeaders()
    headers = headers.set('Content-type', 'application/json')
    return this.http.post<Album>('/api/albums', album, { headers: headers })
  }

  delete(albumId: string): Observable<Message> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'appliction/json');
    return this.http.delete<Message>(`/api/albums/${albumId}`, { headers: headers });
  }
}
