import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  constructor(private data: Storage,
              private toastCtrl: ToastController) {
    this.cargarNoticias();
  }

  guardarNoticias(  noticia: Article ) {

    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if (!existe) {
    this.noticias.unshift( noticia );
    this.data.set('favoritos', this.noticias).then(() => {
      this.presentToast('Agregado a Favorito');
    }).catch( e => {
      console.log('Error', e);
    });
  } else {
    this.presentToast('Este registro ya existe en Favorito');

    }
  }

  async cargarNoticias() {
     const favorito = await this.data.get('favoritos');
     if (favorito) {
       this.noticias = favorito;
     }
    }

    borrarNoticias(noticia: Article) {
      this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
      this.data.set('favoritos', this.noticias);
      this.presentToast('Eliminado de Favorito');
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }
}
