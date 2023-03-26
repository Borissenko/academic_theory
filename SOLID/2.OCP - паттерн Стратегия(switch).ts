//паттерн  Strategy - Стратегия
//он НЕ переключает like switch(),
//а является универсальной реализацией case in switch().

//Это НЕ механизм переключения.
//Это УНИВЕРСАЛЬНОСТЬ при использовании какой-либо стратегии.

//Роль ПЕРЕКЛЮЧАТЕЛЯ  может играть один из методов конкретной Стратегии.
//Это когда после исполнения этой Стратегии он переключает в Контексте актуальную стратегию
// на заведомо известную дрегую.

//Используем ПОЛИМОРФИЗМ модуля Контекст, а
// тактически - добавляем в Контекст via композиция, агрегация или через геттеры Контекста
//варианты оружия с одинаковым интерфейсом (набором публичных методов),
// чтобы мы могли добавлять неограниченое количество модулей без изменения кода базовой сущности.


// # это аналог Состояния:
// в Стратегии вспом классы не знают друг о друге и никак не связаны.
// В Состоянии сами конкретные состояния могут переключать статус контекста.


interface IStrategy {
  strategiesId: string
  doIt()
}

class MyStrategy implements IStrategy {
  strategiesId = 'MyStrategy'
  doIt() {
    console.log('MyStrategy ====')
  }
}

enum StrategiesSet {
  gun = 'MyStrategy',
  knife = 'YourStrategy',
  default = 'default'
}


class Context {
  strategiesList: Array<IStrategy> = []

  constructor(strategyList: Array<IStrategy>) {
    this.strategiesList = strategyList
  }

  runStrategy(strategiesId: StrategiesSet) {
    (this.strategiesList as any).find(item => item.strategiesId === strategiesId)
      ?.doIt()
  }
}

const context_1 = new Context([new MyStrategy()])   // композиция, но не наследование
context_1.runStrategy(StrategiesSet.gun)



