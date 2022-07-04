
export class Impressao {

    constructor(dadosParaImpressao) {
        this.dadosParaImpressao = dadosParaImpressao;
    }
    // Pedidos vencendo no dia
    async relatorioVencimentoDiario() {
        const corpoDocumento = this.CriarRelatorioVencimentoDiario();
        const documento = this.GerarRelatorioVencimentoDiario(corpoDocumento, 'RELATÓRIO DE COBRANÇA DIARIAAA');
        return documento;
    }

    CriarRelatorioVencimentoDiario() {
        const header = [
            { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Total da nota', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] }
        ];
        const body = this.dadosParaImpressao.map((prod) => {
            return [
                { text: prod.name, fontSize: 8 },
                { text: prod.quilo, fontSize: 8 },
                { text: prod.valor, fontSize: 8 },
                { text: prod.desconto, fontSize: 8 },
                { text: prod.totalDaNota, fontSize: 8 },
                { text: prod.dataPedido, fontSize: 8 },
                { text: prod.dataVencimentoPedido, fontSize: 8 },
            ];
        });

        let content = [header];
        content = [...content, ...body];
        return content;
    }

    GerarRelatorioVencimentoDiario(corpoDocumento, tituloRelatorio) {
        const documento = {
            pageSize: 'A4',
            pageMargins: [14, 53, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'lightHorizontalLines',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: tituloRelatorio, style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        body: corpoDocumento
                    }
                },
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'lightHorizontalLines',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: '© MauBoa_Softwares',
                                        fontSize: 7,
                                        alignment: 'left',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }

    // Pedidos realizados no dia
    async relatorioListaPedidosDoDia() {
        const corpoDocumento = this.CriarRelatorioListaPedidosDoDia();
        const documento = this.GerarRelatorioListaPedidosDoDia(corpoDocumento, 'RELATÓRIO PEDIDOS REALIZADOS DO DIA');
        return documento;
    }

    CriarRelatorioListaPedidosDoDia() {
        const header = [
            { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Total da nota', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] }
        ];
        const body = this.dadosParaImpressao.map((prod) => {
            return [
                { text: prod.name, fontSize: 8 },
                { text: prod.quilo, fontSize: 8 },
                { text: prod.valor, fontSize: 8 },
                { text: prod.desconto, fontSize: 8 },
                { text: prod.totalDaNota, fontSize: 8 },
                { text: prod.dataPedido, fontSize: 8 },
                { text: prod.dataVencimentoPedido, fontSize: 8 },
            ];
        });

        let content = [header];
        content = [...content, ...body];
        return content;
    }

    GerarRelatorioListaPedidosDoDia(corpoDocumento, tituloRelatorio) {
        const documento = {
            pageSize: 'A4',
            pageMargins: [14, 53, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'lightHorizontalLines',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: tituloRelatorio, style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        headerRows: 1,
                        widths: [150, 50, 50, 50, 100, 50, 70],

                        body: corpoDocumento
                    }
                },
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'lightHorizontalLines',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: '© MauBoa_Softwares',
                                        fontSize: 7,
                                        alignment: 'left',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }

    // Pedidos cadastrados no dia
    async relatorioPedidosCadastradosHoje() {
        const corpoDocumento = this.CriarRelatorioPedidosCadastradosHoje();
        const documento = this.GerarRelatorioPedidosCadastradosHoje(corpoDocumento, 'RELATÓRIO PEDIDOS CADASTRADOS DO DIA');
        return documento;
    }

    CriarRelatorioPedidosCadastradosHoje() {
        const header = [
            { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Total da nota', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] }
        ];
        const body = this.dadosParaImpressao.map((prod) => {
            return [
                { text: prod.name, fontSize: 8 },
                { text: prod.quilo, fontSize: 8 },
                { text: prod.valor, fontSize: 8 },
                { text: prod.desconto, fontSize: 8 },
                { text: prod.totalDaNota, fontSize: 8 },
                { text: prod.dataPedido, fontSize: 8 },
                { text: prod.dataVencimentoPedido, fontSize: 8 },
            ];
        });
        let content = [header];
        content = [...content, ...body];
        return content;
    }

    GerarRelatorioPedidosCadastradosHoje(corpoDocumento, tituloRelatorio) {
        const documento = {
            pageSize: 'A4',
            pageMargins: [14, 53, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'lightHorizontalLines',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: tituloRelatorio, style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        headerRows: 1,
                        widths: [150, 50, 50, 50, 100, 50, 70],

                        body: corpoDocumento
                    }
                },
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'lightHorizontalLines',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: '© MauBoa_Softwares',
                                        fontSize: 7,
                                        alignment: 'left',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }

    // Pedidos Pedidos entre datas
    async relatorioPorIntervaloDataDoPedido(somas) {
        const corpoDocumento = this.CriarRelatorioPorIntervaloDataDoPedido(somas);
        const documento = this.GerarRelatorioPorIntervaloDataDoPedido(corpoDocumento, 'RELATÓRIO PEDIDOS ENTRE DATAS');
        return documento;
    }

    CriarRelatorioPorIntervaloDataDoPedido(somas) {
        const header = [
            { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Frangos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Total da nota', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Situação', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
        ];
        const body = this.dadosParaImpressao.map((prod) => {
            return [
                { text: prod.dataPedido, fontSize: 8 },
                { text: prod.name, fontSize: 8 },
                { text: prod.valor, fontSize: 8 },
                { text: prod.dataVencimentoPedido, fontSize: 8 },
                { text: prod.quant_frango, fontSize: 8 },
                { text: prod.quilo, fontSize: 8 },
                { text: prod.desconto, fontSize: 8 },
                { text: prod.totalDaNota, fontSize: 8 },
                { text: prod.situacao, fontSize: 8 },
            ];
        });
        const lineSum = [
            {
                text: 'TOTAL',
                bold: true,
                fontSize: 8,
            },
            { text: '-', bold: true, fontSize: 8 },
            { text: '-', bold: true, fontSize: 8 },
            { text: '-', bold: true, fontSize: 8 },
            { text: somas ? somas[0] : '-', bold: true, fontSize: 8 },
            { text: somas ? somas[1].toLocaleString('pt-BR', { style: 'decimal' }) + ' kg' : '-', bold: true, fontSize: 8 },
            { text: somas ? somas[2].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-', bold: true, fontSize: 8 },
            { text: somas ? somas[3].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-', bold: true, fontSize: 8 },
            { text: '-', bold: true, fontSize: 8 },
        ];

        let content = [header];
        content = [...content, ...body, lineSum];
        return content;
    }

    GerarRelatorioPorIntervaloDataDoPedido(corpoDocumento, tituloRelatorio) {
        const documento = {
            pageSize: 'A4',
            pageMargins: [14, 53, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'lightHorizontalLines',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: tituloRelatorio, style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        headerRows: 1,
                        widths: ['10%', '18%', '10%', '15%', '8%', '8%', '9%', '11%', '10%'],
                        body: corpoDocumento
                    }
                },
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'lightHorizontalLines',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: '© MauBoa_Softwares',
                                        fontSize: 7,
                                        alignment: 'left',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }

    // Pedidos Pedidos entre datas por cliente
    async relatorioPorIntervaloDataDoPedidoPorCliente(somas) {
        const corpoDocumento = this.CriarRelatorioPorIntervaloDataDoPedidoPorCliente(somas);
        const documento = this.GerarRelatorioPorIntervaloDataDoPedidoPorCliente(corpoDocumento, 'RELATÓRIO PEDIDOS POR CLIENTE ENTRE DATAS');
        return documento;
    }

    CriarRelatorioPorIntervaloDataDoPedidoPorCliente(somas) {
        const header = [
            { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Frangos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Total da nota', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Situação', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
        ];
        const body = this.dadosParaImpressao.map((prod) => {
            return [
                { text: prod.dataPedido, fontSize: 8 },
                { text: prod.name, fontSize: 8 },
                { text: prod.dataVencimentoPedido, fontSize: 8 },
                { text: prod.quant_frango, fontSize: 8 },
                { text: prod.valor, fontSize: 8 },
                { text: prod.quilo, fontSize: 8 },
                { text: prod.desconto, fontSize: 8 },
                { text: prod.totalDaNota, fontSize: 8 },
                { text: prod.situacao, fontSize: 8 },
            ];
        });

        const lineSum = [
            {
                text: 'TOTAL',
                bold: true,
                fontSize: 8,
            },
            { text: '-', bold: true, fontSize: 8 },
            { text: '-', bold: true, fontSize: 8 },
            { text: somas ? somas[0] : '-', bold: true, fontSize: 8 },
            { text: '-', bold: true, fontSize: 8 },
            { text: somas ? somas[1].toLocaleString('pt-BR', { style: 'decimal' }) + ' kg' : '-', bold: true, fontSize: 8 },
            { text: somas ? somas[2].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-', bold: true, fontSize: 8 },
            { text: somas ? somas[3].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-', bold: true, fontSize: 8 },
            { text: '-', bold: true, fontSize: 8 },
        ];

        let content = [header];
        content = [...content, ...body, lineSum];
        return content;
    }

    GerarRelatorioPorIntervaloDataDoPedidoPorCliente(corpoDocumento, tituloRelatorio) {
        const documento = {
            pageSize: 'A4',
            pageMargins: [14, 53, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'lightHorizontalLines',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: tituloRelatorio, style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        headerRows: 1,
                        widths: ['15%', '20%', '12%', '8%', '10%', '8%', '9%', '10%', '9%'],
                        body: corpoDocumento
                    }
                },
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'lightHorizontalLines',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: '© MauBoa_Softwares',
                                        fontSize: 7,
                                        alignment: 'left',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }

    // Custos com frete
    async relatorioCustoComFrete(somas) {
        const corpoDocumento = this.CriarRelatorioCustoComFrete(somas);
        const documento = this.GerarRelatorioCustoComFrete(corpoDocumento, 'RELATÓRIO CUSTO COM FRETE ENTRE DATAS');
        return documento;
    }

    CriarRelatorioCustoComFrete(somas) {
        const header = [
            { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Frete', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
        ];
        const body = this.dadosParaImpressao.map((prod) => {
            return [
                { text: prod.dataPedido, fontSize: 8 },
                { text: prod.quilo, fontSize: 8 },
                { text: prod.frete, fontSize: 8 },
            ];
        });

        const lineSum = [
            {
                text: 'TOTAL',
                bold: true,
                fontSize: 8,
            },
            { text: somas ? somas[0].toLocaleString('pt-BR', { style: 'decimal' }) + ' kg' : '-', bold: true, fontSize: 8 },
            { text: somas ? somas[1].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-', bold: true, fontSize: 8 },
        ];

        let content = [header];
        content = [...content, ...body, lineSum];
        return content;
    }

    GerarRelatorioCustoComFrete(corpoDocumento, tituloRelatorio) {
        const documento = {
            pageSize: 'A4',
            pageMargins: [14, 53, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'lightHorizontalLines',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: tituloRelatorio, style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        // headerRows: 1,
                        // widths: ['*', '*', '*'],
                        alignment: 'center',
                        body: corpoDocumento
                    }
                },
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'lightHorizontalLines',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: '© MauBoa_Softwares',
                                        fontSize: 7,
                                        alignment: 'left',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }

    // Carregamento
    async relatorioPedidosParaCarregamento() {
        const corpoDocumento = this.CriarRelatorioPedidosParaCarregamento();
        const documento = this.GerarRelatorioPedidosParaCarregamento(corpoDocumento, 'ORDEM DE CARREGAMENTO');
        return documento;
    }

    CriarRelatorioPedidosParaCarregamento() {
        var somas = [0, 0]
        const header = [
            { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Frangos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Caixas', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
        ];
        const body = this.dadosParaImpressao.map((prod) => {
            somas = [somas[0] + prod.quant_frango, somas[1] + prod.quant_caixa]
            return [
                { text: prod.dataPedido, fontSize: 8 },
                { text: prod.name, fontSize: 8 },
                { text: prod.quant_frango, fontSize: 8 },
                { text: prod.quant_caixa, fontSize: 8 },
            ];
        });
        const lineSum = [
            {
                text: 'TOTAL',
                bold: true,
                fontSize: 8,
            },
            { text: '-', bold: true, fontSize: 8 },
            { text: somas ? somas[0] : '-', bold: true, fontSize: 8 },
            { text: somas ? somas[1] : '-', bold: true, fontSize: 8 },
        ];

        let content = [header];
        content = [...content, ...body, lineSum];
        return content;
    }

    GerarRelatorioPedidosParaCarregamento(corpoDocumento, tituloRelatorio) {
        const documento = {
            pageSize: 'A4',
            pageMargins: [14, 53, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'lightHorizontalLines',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: tituloRelatorio, style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        // headerRows: 1,
                        // widths: ['*', '*', '*', '*'],

                        body: corpoDocumento
                    }
                },
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'lightHorizontalLines',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: '© MauBoa_Softwares',
                                        fontSize: 7,
                                        alignment: 'left',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }

    // Relatorio Geral
    async relatorioGeral(somas) {
        const corpoDocumento = this.CriarRelatorioGeral(somas);
        const documento = this.GerarRelatorioGeral(corpoDocumento, 'RELATÓRIO GERAL');
        return documento;
    }

    CriarRelatorioGeral(somas) {
        const header = [
            { text: 'Data do pedido', bold: true, fontSize: 8, margin: [0, 4, 0, 0] },
            { text: 'Nome Cliente', bold: true, fontSize: 8, margin: [0, 4, 0, 0] },
            { text: 'Preço Venda', bold: true, fontSize: 8, margin: [0, 4, 0, 0] },
            { text: 'Preço Compra', bold: true, fontSize: 8, margin: [0, 4, 0, 0] },
            { text: 'Data do Vencimento', bold: true, fontSize: 8, margin: [0, 4, 0, 0] },
            { text: 'Frg', bold: true, fontSize: 8, margin: [0, 4, 0, 0] },
            { text: 'CX', bold: true, fontSize: 8, margin: [0, 4, 0, 0] },
            { text: 'Quilos', bold: true, fontSize: 8, margin: [0, 4, 0, 0] },
            { text: 'Desconto', bold: true, fontSize: 8, margin: [0, 4, 0, 0] },
            { text: 'Total da nota', bold: true, fontSize: 8, margin: [0, 4, 0, 0] },
            { text: 'Lucro', bold: true, fontSize: 8, margin: [0, 4, 0, 0] },
        ];
        const body = this.dadosParaImpressao.map((prod) => {
            return [
                { text: prod.dataPedido, fontSize: 8 },
                { text: prod.name, fontSize: 8 },
                { text: prod.valor, fontSize: 8 },
                { text: prod.valorCompra, fontSize: 8 },
                { text: prod.dataVencimentoPedido, fontSize: 8 },
                { text: prod.quant_frango, fontSize: 8 },
                { text: prod.quant_caixa, fontSize: 8 },
                { text: prod.quilo, fontSize: 8 },
                { text: prod.desconto, fontSize: 8 },
                { text: prod.totalDaNota, fontSize: 8 },
                { text: prod.valorLucro, fontSize: 8 },
            ];
        });
        const lineSum = [
            {
                text: 'TOTAL',
                bold: true,
                fontSize: 8,
            },
            { text: '-', bold: true, fontSize: 8 },
            { text: '-', bold: true, fontSize: 8 },
            { text: '-', bold: true, fontSize: 8 },
            { text: '-', bold: true, fontSize: 8 },
            { text: somas ? somas[0] : '-', bold: true, fontSize: 8 },
            { text: somas ? somas[1] : '-', bold: true, fontSize: 8 },
            { text: somas ? somas[2].toLocaleString('pt-BR', { style: 'decimal' }) + ' kg' : '-', bold: true, fontSize: 8 },
            { text: somas ? somas[3].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-', bold: true, fontSize: 8 },
            { text: somas ? somas[4].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-', bold: true, fontSize: 8 },
            { text: somas ? somas[5].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-', bold: true, fontSize: 8 },
        ];

        let content = [header];
        content = [...content, ...body, lineSum];
        return content;
    }

    GerarRelatorioGeral(corpoDocumento, tituloRelatorio) {
        const documento = {
            pageSize: 'A4',
            pageMargins: [14, 53, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'lightHorizontalLines',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: tituloRelatorio, style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        headerRows: 1,
                        widths: ['11%', '10%', '8%', '8%', '11%', '6%', '6%', '8%', '10%', '11%', '20%'],
                        body: corpoDocumento
                    }
                },
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'lightHorizontalLines',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: '© MauBoa_Softwares',
                                        fontSize: 7,
                                        alignment: 'left',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }

    async PreparaDocumento() {
        const corpoDocumento = this.CriaCorpoDocumento();
        const documento = this.GerarDocumento(corpoDocumento, 'RELATÓRIO DE COBRANÇA DIARIA');
        return documento;
    }

    CriaCorpoDocumento() {
        const header = [
            { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Total da nota', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
            { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] }
        ];
        const body = this.dadosParaImpressao.map((prod) => {
            return [
                { text: prod.name, fontSize: 8 },
                { text: prod.quilo, fontSize: 8 },
                { text: prod.valor, fontSize: 8 },
                { text: prod.desconto, fontSize: 8 },
                { text: prod.totalDaNota, fontSize: 8 },
                { text: prod.dataPedido, fontSize: 8 },
                { text: prod.dataVencimentoPedido, fontSize: 8 },
            ];
        });

        let content = [header];
        content = [...content, ...body];
        return content;
    }

    GerarDocumento(corpoDocumento, tituloRelatorio) {
        const documento = {
            pageSize: 'A4',
            pageMargins: [14, 53, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'lightHorizontalLines',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: tituloRelatorio, style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        body: corpoDocumento
                    }
                },
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'lightHorizontalLines',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: '© MauBoa_Softwares',
                                        fontSize: 7,
                                        alignment: 'left',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }
}