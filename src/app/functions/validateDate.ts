export default function validateDate(date: any){
    
    let dateformat = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;

    let result: any = []
    
    // Matching the date through regular expression      
    if (date.match(dateformat)) { /* verifica formato da data pelo regex */
        let operator = date.split('/');

        // Extract the string into month, date and year      
        let datepart = [];
        if (operator.length > 1) {
            datepart = date.split('/');
        }
        let month = parseInt(datepart[0]);
        let day = parseInt(datepart[1]);
        let year = parseInt(datepart[2]);

        // Create a list of days of a month      
        let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month == 1 || month > 2) { /* nao é fevereiro */
            if (day > ListofDays[month - 1]) {
                //to check if the date is out of range SE É MAIOR QUE O PERMITIDO NAO SENDO FEVEREIRO  
                result.push("dia muito alto L25");
                return false; /* aki return false  */
            }
        } else if (month == 2) { /* É FEVEREIRO */
            let leapYear = false; /* NAO É BISEXTO */
            if ((!(year % 4) && year % 100) || !(year % 400)) {
                result.push("é bisexto"); /* aki É BISEXTO */
                leapYear = true;
            }
            if ((leapYear == false) && (day >= 29)) {
                result.push("nao é bisexto e dia é 29");
                return false; /* NAO É BISEXTO */
            }
            else if ((leapYear == true) && (day > 29)) { /* é ano bisexto */
                    console.log('Invalid date format!');
                    result.push("é bisexto mas o dia é maior que 29");
                    return false;
                }
        }
    } else { /* formato regex para data invalido */
        console.log("Invalid date format!");
        return result; /* false por result */
    }
    return "data correta"; /* valid date por result */
}