export default function valDate(dateString: string) {

    console.log(dateString + "-----")
    let resposta = ''
    let respostaAno: string | number = 'ANO CORRETO'
    let respostaMes: string | number = 'MES CORRETO'
    let respostaDia: string | number = 'DIA CORRETO'
    let array: [string | number, string | number, string | number] =
        [respostaDia, respostaMes, respostaAno]

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var dia = parseInt(parts[0], 10);
    var mes = parseInt(parts[1], 10);
    var ano = parseInt(parts[2], 10);
    console.log(mes + "*"+ dia + "*" + ano )

    if (ano < 1923 || ano > 2023 || isNaN(ano)) {
        array[2] = "Max 100" ;
    } else {
        array[2] = "ANO OK";
    }

    if (mes < 1 || mes > 12 || isNaN(mes)) {
        array[1] = "MES ERRADO ou NaN"
    } else if (dia < 1 || isNaN(dia)) {
        array[0] = "dia menor que 1 ou NaN"
    } else {
        switch (mes) {
            case 1: case 3: case 5: case 7:
            case 8: case 10: case 12:
                if (dia <= 31) {
                    resposta = "Data válida mes com 31 dias";
                } else {
                    resposta = "L:36 Max day 31";
                    array[0] = "L:37 Max day 31";
                }
                break;
            case 4: case 6:
            case 9: case 11:
                if (dia <= 30) {
                    resposta = "L:30 Data válida";
                } else {
                    resposta = "L:43 Max day 30";
                    array[0] = "L:44 Max day 30";
                }
                break;
            case 2:
                if ((ano % 400 == 0) || (ano % 4 == 0 && ano % 100 != 0)) {
                    if (dia <= 29) {
                        resposta = "Data válida é bisexto";
                    } else {
                        resposta = "L:52 Max day 29";
                        array[0] = "L:53 Max day 29";
                    }
                }
                else {
                    if (dia <= 28) {
                        resposta = "Data válida ano comum";
                    } else {
                        resposta = "L:59 Max day 28";
                        array[0] = "L:60 Max day 28";
                    }
                }
        }
        return array
    }

}