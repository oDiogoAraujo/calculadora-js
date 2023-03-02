const visorSuperior = document.querySelector('.visorSuperior')
const visorInferior = document.querySelector('.visorInferior')
const todasTeclasNumeros = document.querySelectorAll('.teclaNumero')
const todasTeclasOperador = document.querySelectorAll('.teclaOperador')
const teclaCE = document.querySelector('.teclaCE')
const teclaResultado = document.querySelector('.teclaResultado')
const inverteSinal = document.querySelector('#inverteSinal')
const porcentagem = document.querySelector('#porcentagem')


class Calcular {
    constructor(contaAnterior, contaAtual) {
        this.elementoContaAnterior = contaAnterior
        this.elementoContaAtual = contaAtual
        this.ApagarTudo()
    }

    ApagarTudo() {
        this.contaAnterior = ''
        this.contaAtual = '0'
        this.operadorAtual = ''
        this.AtualizarVisor()

        /*Uma maneira pratica que encontrei para o 0 permanecer no visor e 
        nao afetar toda a parte de atualizar os proximos numeros com o 0 inicialmente*/
        this.contaAtual = ''

    }

    AtualizarVisor() {
        this.elementoContaAnterior.innerText = `${this.contaAnterior} ${this.operadorAtual || ''}`
        this.elementoContaAtual.innerText = this.contaAtual
    }

    AdicionarDigito(digito) {
        if (digito == 0 && this.contaAtual === '0') return
        if (digito == '.' && this.contaAtual.includes('.')) return
        if (digito == '.' && this.contaAtual == '') return this.contaAtual = '0.'
        if (this.contaAtual.length > 16) return
        this.contaAtual += digito
    }

    AdicionarOperador(operador) {
        if (this.contaAtual == '' && this.contaAnterior == '') return
        if (this.contaAtual == '') {
            this.operadorAtual = operador
            this.AtualizarVisor()
            this.elementoContaAtual.innerText = this.contaAnterior
            return

        }
        if (this.operadorAtual != '') this.RealizarConta()

        this.contaAnterior = `${this.contaAtual} `
        this.operadorAtual = operador
        this.AtualizarVisor()
        this.contaAtual = ''
    }

    RealizarConta() {
        let result
        const _contaAnterior = parseFloat(this.contaAnterior)
        const _contaAtual = parseFloat(this.contaAtual)

        switch (this.operadorAtual) {
            case "+":
                result = _contaAnterior + _contaAtual
                break;
            case "-":
                result = _contaAnterior - _contaAtual
                break
            case "x":
                result = _contaAnterior * _contaAtual
                break
            case "/":
                result = _contaAnterior / _contaAtual
                break
            default:
                return
                break
        }
        return this.contaAtual = result
    }

    PressionarIgual() {
        if (this.contaAnterior == '') return
        if (this.operadorAtual == '') return
        if (this.operadorAtual != '' && this.contaAtual == '') return

        const resultadoFinal = `${this.contaAnterior} ${this.operadorAtual} ${this.contaAtual} =`
        this.RealizarConta()
        calc.AtualizarVisor()

        this.elementoContaAnterior.innerText = resultadoFinal

        this.contaAnterior = ''
        this.contaAtual = ''
        this.operadorAtual = ''

    }

    InverterSinal() {
        if (this.contaAtual == '') return
        this.contaAtual = this.contaAtual * -1
        console.log(this.contaAtual)
        this.AtualizarVisor()
    }

    FazerPorcentagem() {
        if (this.contaAnterior == '') return
        if (this.contaAtual == '') return

        const numeroDecimal = this.contaAtual / 100
        this.contaAtual = this.contaAnterior * numeroDecimal

        this.AtualizarVisor()
    }

}

const calc = new Calcular(visorSuperior, visorInferior)

//------------------------------------------------------------------

todasTeclasNumeros.forEach(teclaNumero => teclaNumero.addEventListener('click', (e) => {
    const teclaClicada = e.target.innerText

    calc.AdicionarDigito(teclaClicada)
    calc.AtualizarVisor()

}))

todasTeclasOperador.forEach(teclaOperador => teclaOperador.addEventListener('click', (e) => {
    const teclaClicada = e.target.innerText

    calc.AdicionarOperador(teclaClicada)
}))


teclaCE.addEventListener('click', () => {
    calc.ApagarTudo()
})

teclaResultado.addEventListener('click', () => {
    calc.PressionarIgual()

})

porcentagem.addEventListener('click', () => {
    calc.FazerPorcentagem()
})

inverteSinal.addEventListener('click', () => {
    calc.InverterSinal()
})