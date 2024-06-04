import { Component } from '@angular/core';
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
  comentario: comentario | any;
  comments: comentario[] = [];
  content: string = '';
  language: string = 'EN';
  urlName: any;
  capNro: any;

  constructor(
    private apiService: ApicallService,
    private route: ActivatedRoute,
  ) {
    this.urlName = this.route.snapshot.paramMap.get('urlName');
    this.capNro = this.route.snapshot.paramMap.get('capNro');
    this.buscaComantarios();
  }

  buscaComantarios() {
    this.apiService
      .getComment(this.urlName, this.capNro, this.language)
      .subscribe((comments) => {
        if (comments) {
          this.comments = comments;
        }
        console.log(this.comments);
      });
  }
  enviarComentario() {
    let newComment: comentario = {
      Novel_id: 1,
      Content: this.content,
    };
    console.log(newComment);
    this.apiService
      .postComment(newComment, this.urlName, this.capNro, this.language)
      .subscribe((resposta) => console.log(resposta));
    this.buscaComantarios();
  }
}
