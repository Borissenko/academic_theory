//Это TS.
//Интерфейсы НЕ используем.
//Типируем в полях класса,
//а структуру полей для пучка однотипных классов декларируем в АБСТРАКТНОМ классе.

//базисный модуль, характер работы методов которого детализированы в конкретном Статусе(state).
class Context {
  private state: State

  constructor(state: State) {
    this.transitionTo(state)
    //поля экземпляра Статуса, который мы вложили как аргумент,
    // копируем в поле state у экземпляра Контекста в момент его созданния,
    // и затем via статус-методом
    // поля Контекста копируем в поле экземпляра Статуса - что бы можно было бы менять Статус в динамике.
  }
  public transitionTo(state: State): void {
    this.state = state
    this.state.setContext(this)     //setContext - это функция из Статуса.
    //this - это все поля Контекста. Их копируем в поле context у экземпляра Статуса.
  }

  //кнопки в Контексте, но запускаем функции конкретного Статуса. КЛЮЧ(!).
  public request1(): void {
    this.state.handle1()
  }

  public request2(): void {
    this.state.handle2()
  }
}

//Абстрактный класс для вариантов Статуса.
abstract class State {
  //КЛЮЧ. ЖЕСТКО прописанный
  protected context: Context             //НЕ абстрактное, а конкретное поле. Его мы НЕ дублируем в акцепторе.

  public setContext(context: Context) {  //НЕ абстрактное, а конкретное поле. Его мы НЕ дублируем в акцепторе.
    this.context = context
  }

  public abstract handle1(): void           // abstract(!) функция. Ее мы прописываем в акцепторе
  public abstract handle2(): void
}

//Варианты Статуса (поведения).
class ConcreteStateA extends State {
  public handle1(): void {
    //...
    this.context.transitionTo(new ConcreteStateB())   //(!) via метод Контекста - переключаем статус.
  }
  public handle2(): void {
    //...
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    //...
  }
  public handle2(): void {
    //...
    this.context.transitionTo(new ConcreteStateA())
  }
}

// Используем
//Запускаем Контекст по сценарию состояния.
const ctx = new Context(new ConcreteStateA())
ctx.request1()  //кнопки в Контексте, но запускаем функции конкретного Статуса. КЛЮЧ(!).
ctx.request2()
