//пример
//аналогичный, что и для Инверсии зависимостей

interface Sender {
  sendMessage(message: string): void
}

class SmsSender implements Sender {
  sendMessage(message: string) {
    // конкретный способ реализации
  }
}

class Notifier {
  constructor(private api: Sender, public message: string) { }   //ключ - interface Sender, который ТИПИРУЕТ поле.

  notify(): void {
    this.api.sendMessage(this.message)
  }
}

let dd = new Notifier(new SmsSender, 'Привет!')   //зарядили
dd.notify()                                             //выстрелили

//new SmsSender выполняет роль switch() для выбора действия в зависимости от типа причины(!).
