import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { ActionSheetController, ToastController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() i: number;
  @Input() enFav;

  constructor(private iab: InAppBrowser,
              private actionSheetCtrl: ActionSheetController,
              private social: SocialSharing,
              private localstorage: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia() {
    console.log(this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }
  async lanzarMenu() {
    let btn;
    if (this.enFav ) {
      btn = {
        text: 'Borrar',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.localstorage.borrarNoticias( this.noticia );

        }
      };
    } else {
      btn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.localstorage.guardarNoticias( this.noticia );

        }
      };
    }
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [btn, {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.social.share(
            this.noticia.title,
            this.noticia.source.name,
            null,
            this.noticia.url
            ).then(() => {
          }).catch(function(e) {
            console.error(e);
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


}
