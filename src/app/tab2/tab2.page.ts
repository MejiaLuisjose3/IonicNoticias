import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../services/noticias.service';
import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment) segment;
  categorias: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticia: Article[] = [];
  constructor(private noticias: NoticiasService) {

  }

  ngOnInit(): void {
    this.segment.value = this.categorias[0];
    this.articulos(this.categorias[0]);
  }
  segmentChanded( event ) {
    console.log(event.detail.value);
    this.articulos(event.detail.value);
  }
  articulos(categoria: string, event?) {
    this.noticias.getTopHeadlinescategoria( categoria ).subscribe(resp => {
      this.noticia = [];
      this.noticia.push(...resp.articles);
      if (event) {
        event.target.complete();
        return;
      }
    });
  }
  loadData(event) {
    this.articulos(this.segment.value, event);

  }

}
