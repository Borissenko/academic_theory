//Здесь вместо оружия у робота - сменяемость типа обрабатываемого отчета.

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
class FormatSelector {
  private static formatters = {
    [ReportTypes.Html]: HtmlFormatter,       //HtmlFormatter - это class(!) на стороне, ReportTypes - enum(!).
    [ReportTypes.Txt]: TxtFormatter,
  }
    //ReportTypes.Html - равно 0, поэтому ключ этого поля равен '0', а его значение - класс HtmlFormatter(!).

  static selectFor(reportType: ReportTypes) {     //ReportTypes - это enum, поэтому сюда вставиться должно ОДНО из enum-перечислений.
    const FormatterFactory = FormatSelector.formatters[reportType]
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

// возможные форматы
enum ReportTypes {
  Html,
  Txt,
}

// класс, который занимается экспортом данных
class ReportExporter {
  name: string
  data: ReportData

  constructor(name: string, data: ReportData) {
    this.name = name
    this.data = data
  }

  export(reportType: ReportTypes): string {
    const formatter: Formatter = FormatSelector.selectFor(reportType)   //FormatSelector - класс на стороне  reportType = 0
    return formatter.format(this.data)
  }
}


//Использование
let dd1 = new ReportExporter('myName', {content: 'Привет'})   //1. заряжаем
dd1.export(0)                          //2. выстреливаем определенным видом