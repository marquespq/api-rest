const TabelaFornecedor = require('./TabelaFornecedor')
class Fornecedor{
    constructor({ id, nome, preco, categoria, dataCriacao, dataAtualizacao, versao }){
        this.id = id
        this.nome = nome
        this.preco = preco
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }
    async criar (){
        this.validar()
        const resultado = await TabelaFornecedor.inserir({
            nome: this.nome,
            preco: this.preco,
            categoria: this.categoria
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }
    async carregar(){
        const fornecedorEncontrado = await TabelaFornecedor.pegarPorId(this.id)
        this.nome = fornecedorEncontrado.nome
        this.preco = fornecedorEncontrado.preco
        this.categoria = fornecedorEncontrado.categoria
        this.dataCriacao = fornecedorEncontrado.dataCriacao
        this.dataAtualizacao = fornecedorEncontrado.dataAtualizacao
        this.versao = fornecedorEncontrado.versao
    }
    async atualizar(){
        await TabelaFornecedor.pegarPorId(this.id)
        const campos = ['nome', 'preco', 'categoria']
        const dadosParaAtualizar = {}

        campos.forEach((campo) =>{
            const valor = this[campo]
            if (typeof valor === 'string' && valor.length > 0){
                dadosParaAtualizar[campo] = valor
            }
        })
        if(Object.keys(dadosParaAtualizar).length === 0){
            throw new Error ('Não foram fornecidos dados para atualizar')
        }
        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
    }
    remover(){
        return TabelaFornecedor.remover(this.id)
    }
    validar(){
        const campos = ['nome', 'preco', 'categoria']

        campos.forEach(campo => {
            const valor = this[campo]

            if(typeof valor !== 'string' || valor.length === 0){
                throw new Error(`Campo invalido ${campo}`)
            }
        })
    }

}

module.exports = Fornecedor