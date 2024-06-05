import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApicallService } from '../../services/apicall.service';
import { ActivatedRoute } from '@angular/router';
import { comentario } from '../../models/comment';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [FormsModule],
  providers: [ApicallService],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})

export class CommentsComponent {
  apicallservice = inject (ApicallService);
  route = inject (ActivatedRoute);
  
  comment: comentario | any;
  comments: comentario[] = [];
  content: string = '';
  language: string = 'EN';
  urlName = this.route.snapshot.paramMap.get('urlName') ?? '';
  capNro = parseInt(this.route.snapshot.paramMap.get('capNro')?? '');
  
  constructor() {
    this.buscaComantarios();
  }

  buscaComantarios() {
    this.apicallservice
      .getComment(this.urlName, this.capNro, this.language)
      .subscribe((comments) => {
        if (comments) {
          this.comments = comments;
        }
      });
  }
  enviarComentario() {
    let newComment: comentario = {
      Novel_id: 1,
      Content: this.content,
      Cap_nro: this.capNro,
      Url_name: this.urlName,
    };
    console.log(newComment);
    this.apicallservice
      .postComment(newComment, this.urlName, this.capNro, this.language)
      .subscribe((resposta) => console.log(resposta));
    this.buscaComantarios();
  }
}
