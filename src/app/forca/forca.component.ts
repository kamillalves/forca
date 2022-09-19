import {Component, HostListener, OnInit} from '@angular/core';
import {ForcaService} from "./forca.service";


@Component({
  selector: 'app-forca',
  templateUrl: './forca.component.html',
  styleUrls: ['./forca.component.css']
})
export class ForcaComponent implements OnInit {

  letras: string[] = []
  palavra: string = ''
  digitadas: string[] = []
  alfabeto: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'W', 'Y', 'Z']
  erros: number = 0
  tentativas: number = 6;


  constructor(public forcaService: ForcaService) {
  }

  ngOnInit(): void {
   this.proximaPalavra();

  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {

    let letra = event.key.toUpperCase()
    if (this.erros < this.tentativas && !this.digitadas.includes(letra)) {

      this.digitadas.push(letra)

      if (this.isErrado(letra)) {
        this.erros = this.erros + 1;

      }
    }

  }

  apresenta(letra: string) {
    if (this.digitadas.includes(letra)) {
      return letra
    }
    return ''

  }

  isCorreta(letra: string): boolean {
    return this.letras.includes(letra) && this.digitadas.includes(letra)
  }

  isErrado(letra: string): boolean {
    return !this.letras.includes(letra) && this.digitadas.includes(letra)
  }

  isVencedor(): boolean {
    return !!this.letras.length && !this.letras.filter(letra => !this.digitadas.includes(letra)).length
  }
  proximaPalavra(){
    this.letras = []
    this.digitadas = []
    this.erros = 0

    this.forcaService.buscarpalavra().subscribe((resposta:any)=>{
      this.palavra = resposta.word.toUpperCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
      this.letras = this.palavra.split('')
    })
  }
}
