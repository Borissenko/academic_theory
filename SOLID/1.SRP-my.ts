//C
interface Formatter {
  format(data: ReportData): string
}

// класс для форматирования в HTML
class HtmlFormatter implements Formatter {
  format(data: ReportData): string {
    // форматируем данные в HTML и возвращаем:
    return 'html string'
  }
}

// класс для форматирования в TXT
class TxtFormatter implements Formatter {
  format(data: ReportData): string {
    // форматируем данные в TXT и возвращаем:
    return 'txt string'
  }
}

//B
// возможные форматы
// enum ReportTypes {
//   Html,
//   Txt,
// }
//или
// type ReportTypes = 'Txt' | 'Html'

class ReportTypes {
  html = HtmlFormatter
  txt = TxtFormatter
}

class FormatSelector extends ReportTypes {
  // private formatters = {
  //   html: HtmlFormatter,       //HtmlFormatter - это class(!) на стороне, a ReportTypes - enum(!).
  //   txt: TxtFormatter,
  // }
    //ReportTypes.Html равно 0, поэтому ключ этого поля равен 0, а его значение - класс HtmlFormatter(!)

  selectFor(reportType: string) {     //ReportTypes - это enum, поэтому сюда вставиться должно ОДНО из enum-перечислений.
    const FormatterFactory = this[reportType]
    // const FormatterFactory = this.formatters[reportType]    //наверное, так будет правильней.
    return new FormatterFactory()      //генерируем экземпляр класса HtmlFormatter или HtmlFormatter
  }
}

//A
// тип данных для отчёта
type ReportData = {
  content: string,
  // date: Date,
  // size: number,
}

// класс, который занимается экспортом данных
class ReportExporter extends FormatSelector {
  name: string
  data: ReportData

  constructor(name: string, data: ReportData) {
    super()
    this.name = name
    this.data = data
  }

  export(reportType: string): string {
    const formatter: Formatter = this.selectFor(reportType)   //FormatSelector - класс на стороне  reportType = 0
    return formatter.format(this.data)
  }
}


//Использование
let dd1 = new ReportExporter('myName', {content: 'Привет'})   //1. заряжаем
dd1.export('txt')                          //2. выстреливаем определенным видом