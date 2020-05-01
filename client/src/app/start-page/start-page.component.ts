import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private title: Title,
    private meta: Meta) {
    title.setTitle('Спортклуб Чемпион')
    meta.addTags([
      { name: 'keywords', content: 'Чемпион,Запорожье,Champion-club,Champion-zp,спортклуб,тренажерный,зал,фитнесс,пауэрлифтинг,спортивное питание,спортпит.zp,качалка' },
      { name: 'description', content: 'Стартовая страница клуба Чемпион' }
    ])
  }

  ngOnInit(): void {
  }

}
