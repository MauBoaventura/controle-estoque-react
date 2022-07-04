import React, { useState, useEffect } from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Impressao } from './impressao';
import moment from 'moment';
import { client } from "../";
import { Link } from 'react-router-dom';
import IconReport from '../../assets/iconRelatorio.png';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    dataInicio: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 150,
    },
    dataFim: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(1),
        width: 150,
    },
}));

// const relatorioListaCobrancaDiaria = async () => {

//     //Buscar dados da API 
//     // Depois fazer uma consulta e jogar o processamento para a API
//     var pedido = (await client.get("/relatorioVencimentoDiario"));
//     var data_hoje = moment().format("YYYY-MM-DD")

//     var pedidos_vencendo_hoje = pedido.data.filter((element) => {
//         let diaVencimento = moment(element.dataVencimentoPedido).format("YYYY-MM-DD")
//         return diaVencimento === data_hoje;
//     }).map((el) => {
//         el.quilo = el.quilo.toLocaleString('pt-BR', { style: 'decimal' }) + ' kg';
//         el.valor = el.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//         el.desconto = el.desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//         el.totalDaNota = el.totalDaNota.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//         el.dataVencimentoPedido = moment(el.dataVencimentoPedido).format("DD-MM-YYYY")
//         el.dataPedido = moment(el.dataPedido).format("DD-MM-YYYY")
//         return el
//     });

//     if (pedidos_vencendo_hoje.length > 0) {
//         const classeImpressao = new Impressao(pedidos_vencendo_hoje);
//         const documento = await classeImpressao.relatorioVencimentoDiario();
//         pdfMake.createPdf(documento)
//             // .download();
//             .open({}, window.open('', '_blank'));
//         // .print();
//     } else {
//         const classeImpressao = new Impressao(pedidos_vencendo_hoje);
//         const documento = await classeImpressao.relatorioVencimentoDiario();
//         pdfMake.createPdf(documento)
//             // .download();
//             .open({}, window.open('', '_blank'));
//         console.error("Não ha pedidos vencendo hoje");
//     }
// }

// const relatorioListaPedidosDoDia = async () => {

//     //Buscar dados da API 
//     // Depois fazer uma consulta e jogar o processamento para a API
//     var pedido = (await client.get("/relatorioPedidosDiario"));

//     var pedidos_feitos_hoje = pedido.data.map((el) => {
//         el.quilo = el.quilo.toLocaleString('pt-BR', { style: 'decimal' }) + ' kg';
//         el.valor = el.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//         el.desconto = el.desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//         el.totalDaNota = el.totalDaNota.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//         el.dataVencimentoPedido = moment(el.dataVencimentoPedido).format("DD-MM-YYYY")
//         el.dataPedido = moment(el.dataPedido).format("DD-MM-YYYY")
//         return el
//     });

//     if (pedidos_feitos_hoje.length > 0) {
//         const classeImpressao = new Impressao(pedidos_feitos_hoje);
//         const documento = await classeImpressao.relatorioListaPedidosDoDia();
//         pdfMake.createPdf(documento)
//             // .download();
//             .open({}, window.open('', '_blank'));
//         // .print();
//     } else {
//         const classeImpressao = new Impressao(pedidos_feitos_hoje);
//         const documento = await classeImpressao.relatorioListaPedidosDoDia();
//         pdfMake.createPdf(documento)
//             // .download();
//             .open({}, window.open('', '_blank'));
//         console.error("Não ha pedidos feitos hoje");
//     }
// }

// const relatorioCadastroPedidosDoDia = async () => {

//     //Buscar dados da API 
//     // Depois fazer uma consulta e jogar o processamento para a API
//     var pedido = (await client.get("/relatorioPedidosCadastradosHoje"));

//     var pedidos_feitos_hoje = pedido.data.map((el) => {
//         el.quilo = el.quilo.toLocaleString('pt-BR', { style: 'decimal' }) + ' kg';
//         el.valor = el.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//         el.desconto = el.desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//         el.totalDaNota = el.totalDaNota.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
//         el.dataVencimentoPedido = moment(el.dataVencimentoPedido).format("DD-MM-YYYY")
//         el.dataPedido = moment(el.dataPedido).format("DD-MM-YYYY")
//         return el
//     });

//     if (pedidos_feitos_hoje.length > 0) {
//         const classeImpressao = new Impressao(pedidos_feitos_hoje);
//         const documento = await classeImpressao.relatorioPedidosCadastradosHoje();
//         pdfMake.createPdf(documento)
//             // .download();
//             .open({}, window.open('', '_blank'));
//         // .print();
//     } else {
//         const classeImpressao = new Impressao(pedidos_feitos_hoje);
//         const documento = await classeImpressao.relatorioPedidosCadastradosHoje();
//         pdfMake.createPdf(documento)
//             // .download();
//             .open({}, window.open('', '_blank'));
//         console.error("Não ha pedidos feitos hoje");
//     }
// }

const relatorioPorIntervaloDataDoPedido = async () => {
    let inicial = document.getElementById('datainicior1').value
    let final = document.getElementById('datafimr1').value
    //Buscar dados da API 
    // Depois fazer uma consulta e jogar o processamento para a API
    var pedido = (await client.get("/relatorioPorIntervaloDataDoPedido?inicial=" + inicial + "&final=" + final));

    var somas = [0, 0, 0, 0]
    var pedidos_feitos_hoje = pedido.data.map((el) => {
        somas = [
            somas[0] + el.quant_frango,
            somas[1] + el.quilo,
            somas[2] + el.desconto,
            somas[3] + el.totalDaNota
        ]
        el.quilo = el.quilo.toLocaleString('pt-BR', { style: 'decimal' }) + ' kg';
        el.valor = el.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.desconto = el.desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.totalDaNota = el.totalDaNota.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.dataVencimentoPedido = moment(el.dataVencimentoPedido).format("DD-MM-YYYY")
        el.dataPedido = moment(el.dataPedido).format("DD-MM-YYYY")
        return el
    });

    if (pedidos_feitos_hoje.length > 0) {
        const classeImpressao = new Impressao(pedidos_feitos_hoje);
        const documento = await classeImpressao.relatorioPorIntervaloDataDoPedido(somas);
        pdfMake.createPdf(documento)
            // .download();
            .open({}, window.open('', '_blank'));
        // .print();
    } else {
        const classeImpressao = new Impressao(pedidos_feitos_hoje);
        const documento = await classeImpressao.relatorioPorIntervaloDataDoPedido();
        pdfMake.createPdf(documento)
            // .download();
            .open({}, window.open('', '_blank'));
        console.error("Não ha pedidos feitos hoje");
    }
}

const relatorioPorIntervaloDataDoPedidoPorCliente = async () => {
    let inicial = document.getElementById('datainicior2').value
    let cliente = document.getElementById('clienter2').value
    let final = document.getElementById('datafimr2').value

    //Buscar dados da API 
    // Depois fazer uma consulta e jogar o processamento para a API
    var pedido = (await client.get("/relatorioPorIntervaloDataDoPedidoPorCliente?inicial=" + inicial + "&final=" + final + "&clienteId=" + cliente));
    var somas = [0, 0, 0, 0]

    var pedidos_feitos_hoje = pedido.data.map((el) => {
        somas = [
            somas[0] + el.quant_frango,
            somas[1] + el.quilo,
            somas[2] + el.desconto,
            somas[3] + el.totalDaNota
        ]
        el.quilo = el.quilo.toLocaleString('pt-BR', { style: 'decimal' }) + ' kg';
        el.valor = el.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.desconto = el.desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.totalDaNota = el.totalDaNota.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.dataVencimentoPedido = moment(el.dataVencimentoPedido).format("DD-MM-YYYY")
        el.dataPedido = moment(el.dataPedido).format("DD-MM-YYYY")
        return el
    });

    if (pedidos_feitos_hoje.length > 0) {
        const classeImpressao = new Impressao(pedidos_feitos_hoje);
        const documento = await classeImpressao.relatorioPorIntervaloDataDoPedidoPorCliente(somas);
        pdfMake.createPdf(documento)
            // .download();
            .open({}, window.open('', '_blank'));
        // .print();
    } else {
        const classeImpressao = new Impressao(pedidos_feitos_hoje);
        const documento = await classeImpressao.relatorioPorIntervaloDataDoPedidoPorCliente();
        pdfMake.createPdf(documento)
            // .download();
            .open({}, window.open('', '_blank'));
        console.error("Não ha pedidos feitos hoje");
    }
}

const relatorioCustoComFrete = async () => {
    let inicial = document.getElementById('datainicior3').value
    let final = document.getElementById('datafimr3').value

    //Buscar dados da API 
    // Depois fazer uma consulta e jogar o processamento para a API
    var pedido = (await client.get("/relatorioCustoComFrete?inicial=" + inicial + "&final=" + final));
    var somas = [0, 0]
    var pedidos_feitos_hoje = pedido.data.map((el) => {
        somas = [
            somas[0] + el.quilo,
            somas[1] + el.frete,
        ]
        el.quilo = el.quilo.toLocaleString('pt-BR', { style: 'decimal' }) + ' kg';
        el.frete = el.frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.dataVencimentoPedido = moment(el.dataVencimentoPedido).format("DD-MM-YYYY")
        el.dataPedido = moment(el.dataPedido).format("DD-MM-YYYY")
        return el
    });

    if (pedidos_feitos_hoje.length > 0) {
        const classeImpressao = new Impressao(pedidos_feitos_hoje);
        const documento = await classeImpressao.relatorioCustoComFrete(somas);
        pdfMake.createPdf(documento)
            // .download();
            .open({}, window.open('', '_blank'));
        // .print();
    } else {
        const classeImpressao = new Impressao(pedidos_feitos_hoje);
        const documento = await classeImpressao.relatorioCustoComFrete();
        pdfMake.createPdf(documento)
            // .download();
            .open({}, window.open('', '_blank'));
        console.error("Não ha pedidos feitos hoje");
    }
}

const relatorioPedidosParaCarregamento = async () => {
    let inicial = document.getElementById('datainicior4').value
    let final = document.getElementById('datainicior4').value

    //Buscar dados da API 
    // Depois fazer uma consulta e jogar o processamento para a API
    var pedido = (await client.get("/relatorioPedidosParaCarregamento?inicial=" + inicial + "&final=" + final));

    var pedidos_feitos_hoje = pedido.data.map((el) => {
        // el.quilo = el.quilo.toLocaleString('pt-BR', { style: 'decimal' }) + ' kg';
        // el.valor = el.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        // el.desconto = el.desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        // el.totalDaNota = el.totalDaNota.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.dataVencimentoPedido = moment(el.dataVencimentoPedido).format("DD-MM-YYYY")
        el.dataPedido = moment(el.dataPedido).format("DD-MM-YYYY")
        return el
    });

    if (pedidos_feitos_hoje.length > 0) {
        const classeImpressao = new Impressao(pedidos_feitos_hoje);
        const documento = await classeImpressao.relatorioPedidosParaCarregamento();
        pdfMake.createPdf(documento)
            // .download();
            .open({}, window.open('', '_blank'));
        // .print();
    } else {
        const classeImpressao = new Impressao(pedidos_feitos_hoje);
        const documento = await classeImpressao.relatorioPedidosParaCarregamento();
        pdfMake.createPdf(documento)
            // .download();
            .open({}, window.open('', '_blank'));
        console.error("Não ha pedidos feitos hoje");
    }
}

const relatorioGeral = async () => {
    let inicial = document.getElementById('datainicior5').value
    let final = document.getElementById('datafimr5').value
    //Buscar dados da API 
    // Depois fazer uma consulta e jogar o processamento para a API
    var pedido = (await client.get("/relatorioGeral?inicial=" + inicial + "&final=" + final));
    console.log(pedido);
    var somas = [0, 0, 0, 0, 0, 0]
    var pedidos_feitos_hoje = pedido.data.map((el) => {
        somas = [
            somas[0] + el.quant_frango,
            somas[1] + el.quant_caixa,
            somas[2] + el.quilo,
            somas[3] + el.desconto,
            somas[4] + el.totalDaNota,
            somas[5] + el.valorLucro
        ]
        el.quilo = el.quilo.toLocaleString('pt-BR', { style: 'decimal' }) + ' kg';
        el.valor = el.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.valorCompra = el.valorCompra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.desconto = el.desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.totalDaNota = el.totalDaNota.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.dataVencimentoPedido = moment(el.dataVencimentoPedido).format("DD-MM-YYYY")
        el.dataPedido = moment(el.dataPedido).format("DD-MM-YYYY")
        el.valorLucro = el.valorLucro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return el
    });

    if (pedidos_feitos_hoje.length > 0) {
        const classeImpressao = new Impressao(pedidos_feitos_hoje);
        const documento = await classeImpressao.relatorioGeral(somas);
        pdfMake.createPdf(documento)
            // .download();
            .open({}, window.open('', '_blank'));
        // .print();
    } else {
        const classeImpressao = new Impressao(pedidos_feitos_hoje);
        const documento = await classeImpressao.relatorioGeral();
        pdfMake.createPdf(documento)
            // .download();
            .open({}, window.open('', '_blank'));
        console.error("Não ha pedidos feitos hoje");
    }
}

function Butao(props) {
    const classes = useStyles();
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const getCamposRelatorios = async () => {
            try {
                var clientes = (await client.get("/clientes"));
                setClientes(clientes.data);
            } catch (e) {

            }
        };
        getCamposRelatorios();
    }, [props.history]);

    return (<>
        <div>
            {/* <div className="Report" >
                <div className='parteTextual'>
                    <img className="ImageReport" src={IconReport} alt="Relatorio" />
                    <Link href="#" onClick={relatorioListaCobrancaDiaria} >
                        <p className="ReportItemTitle">
                            Lista de Cobrança de hoje - {moment().format("DD/MM/YYYY")}
                        </p>
                    </Link>
                </div>
            </div>
            <div className="Report" >
                <div className='parteTextual'>
                    <img className="ImageReport" src={IconReport} alt="Relatorio" />
                    <Link href="#" onClick={relatorioListaPedidosDoDia} >
                        <p className="ReportItemTitle">
                            Pedidos realizados hoje
                        </p>
                    </Link>
                </div>
            </div>
            <div className="Report" > 
                <div className='parteTextual'>
                    <img className="ImageReport" src={IconReport} alt="Relatorio" />
                    <Link href="#" onClick={relatorioCadastroPedidosDoDia} >
                        <p className="ReportItemTitle">
                            Pedidos cadastrados hoje
                        </p>
                    </Link>
                </div>
            </div>*/}
            <div className="Report" >
                <div className='parteTextual'>
                    <img className="ImageReport" src={IconReport} alt="Relatorio" />
                    <Link href="#" onClick={relatorioPorIntervaloDataDoPedido} >
                        <p className="ReportItemTitle">
                            Pedidos entre:
                        </p>
                    </Link>
                </div>
                <TextField
                    id="datainicior1"
                    label="Inicio"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    className={classes.dataInicio}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="datafimr1"
                    label="Fim"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    className={classes.dataFim}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div className="Report" >
                <div className='parteTextual'>
                    <img className="ImageReport" src={IconReport} alt="Relatorio" />
                    <Link href="#" onClick={relatorioPorIntervaloDataDoPedidoPorCliente} >
                        <p className="ReportItemTitle">
                            Pedidos do cliente entre:
                        </p>
                    </Link>
                </div>
                <TextField
                    id="datainicior2"
                    label="Inicio"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    className={classes.dataInicio}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="datafimr2"
                    label="Fim"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    className={classes.dataFim}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="clienter2"
                        className={classes.dataFim}
                    >
                        Cliente
                    </InputLabel>
                    <NativeSelect
                        className={classes.dataFim}
                        inputProps={{
                            name: 'age',
                            id: 'clienter2',
                        }}
                    >
                        {clientes.map((value) => (
                            <option value={value.id}>
                                {value.name}
                            </option>
                        ))}
                    </NativeSelect>
                </FormControl>
            </div>
            <div className="Report" >
                <div className='parteTextual'>
                    <img className="ImageReport" src={IconReport} alt="Relatorio" />
                    <Link href="#" onClick={relatorioCustoComFrete} >
                        <p className="ReportItemTitle">
                            Custos com frete entre as datas:
                        </p>
                    </Link>
                </div>
                <TextField
                    id="datainicior3"
                    label="Inicio"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    className={classes.dataInicio}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="datafimr3"
                    label="Fim"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    className={classes.dataFim}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div className="Report" >
                <div className='parteTextual'>
                    <img className="ImageReport" src={IconReport} alt="Relatorio" />
                    <Link href="#" onClick={relatorioPedidosParaCarregamento} >
                        <p className="ReportItemTitle">
                            Carregamento entre as datas:
                        </p>
                    </Link>
                </div>
                <TextField
                    id="datainicior4"
                    label="Inicio"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    className={classes.dataInicio}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {/* <TextField
                    id="datafimr4"
                    label="Fim"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    className={classes.dataFim}
                    InputLabelProps={{
                        shrink: true,
                    }}
                /> */}
            </div>
            <div className="Report" >
                <div className='parteTextual'>
                    <img className="ImageReport" src={IconReport} alt="Relatorio" />
                    <Link href="#" onClick={relatorioGeral} >
                        <p className="ReportItemTitle">
                            Relatorio Geral:
                        </p>
                    </Link>
                </div>
                <TextField
                    id="datainicior5"
                    label="Inicio"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    className={classes.dataInicio}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="datafimr5"
                    label="Fim"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    className={classes.dataFim}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        </div>
    </>
    )
}

export default Butao;