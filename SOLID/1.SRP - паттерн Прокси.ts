//Прокси - это класс, который манипулирует исполняющим классом.
//Т.е. к исполняющему классу обращаемся НЕ непосредственно, а через proxy.

//MVC - это из этой оперы.

class Requester {
  async doRequest(url: string): Promise<any> {
    return await new Promise.resolve()
      .then(data => data)
  }
}


class Proxy {
  loggee: Requester

  constructor(loggee: Requester) {
    this.loggee = loggee
  }

  async doIt(url: string): Promise<any> {
    return await this.loggee.doRequest(url)
  }
}

let dd = new Proxy(new Requester)      //доступ к исполняющему классу - через агрегацию
let data = dd.doIt('/api')

//# b-вариант.
//Можно в Прокси по какому-то условию генерировать экземпляр определенного исполняющего класса,
//даступ к нему - композицией,
//и далее запускать тот или иной метод в исполняющем классе.