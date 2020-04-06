import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position, Message } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  constructor(private http: HttpClient) { }

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`)
  }

  create(position: Position, image?: File): Observable<Position> {
    const fd = new FormData()
    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', position.name)
    fd.append('cost', (position.cost).toString())
    fd.append('stock', (position.stock).toString())
    fd.append('rank', position.rank)
    fd.append('exposition', position.exposition)
    fd.append('category', position.category)
    return this.http.post<Position>('/api/position', fd)
  }

  update(position: Position, image?: File): Observable<Position> {
    const fd = new FormData()
    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', position.name)
    fd.append('cost', (position.cost).toString())
    fd.append('stock', (position.stock).toString())
    fd.append('rank', position.rank)
    fd.append('exposition', position.exposition)
    fd.append('category', position.category)
    return this.http.patch<Position>(`/api/position/${position._id}`, fd)
  }

  delete(position: Position): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${position._id}`)
  }
}
