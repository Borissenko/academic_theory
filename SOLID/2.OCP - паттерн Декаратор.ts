// позволяет не изменять сам объект, но при этом расширять его функциональность
// ОБЕРТЫВАЯ клиента.
//использует композицию

// Отличие декоратора от наследования в возможности расширять функциональность динамически,
// без необходимости описывать каждый класс-наследник отдельно.

// Разница между декоратором и прокси в том, что прокси всегда предоставляет тот же интерфейс,
// в то время как декоратор может предоставлять расширенный интерфейс.

// В примере мы создаём класс BaseGreeting,
// метод greet которого будет выводить строку с приветствием пользователя.
// Декоратор GreetingWithUppercase будет приводить строку с приветствием к верхнему регистру.


//1 Клиент, поля которого будем дорабатывать.
//Здесь - результат работы метода клиента
interface Greeting {
  username: string
  greet(): string       //static ???
}

// базовая функциональность описывается в классе,
// который будет обёрнут с помощью декораторов
class BaseGreeting implements Greeting {
  username: string

  constructor(username: string) {
    this.username = username
  }

  greet(): string {
    return `Hello, ${this.username}!`
  }
}

//2. wrappee — объект, функциональность которого мы будем расширять
//за счет ОБОРАЧИВАНИЯ клиента.
interface GreetingDecorator {
  wrappee: Greeting
  greet(): string
}

class GreetingWithUppercase implements GreetingDecorator {
  wrappee: Greeting

  constructor(wrappee: Greeting) {    //<< Greeting - клиент
    this.wrappee = wrappee
  }

  greet(): string {
    // 1. используем базовое поведение
    const baseGreeting = this.wrappee.greet()
    // 2. расширяем его
    return baseGreeting.toUpperCase()
  }
}
