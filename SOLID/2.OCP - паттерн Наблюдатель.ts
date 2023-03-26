//watcher за изменениями в экземпляре какого-то класса
//Не дописанная функция. ))
//Геттеров, запускающих проверку, нет.
//Это скорее всего "Оповеститель по списку заявленных пассивных слушателей".

//1. Описываем, характер ответной реакции.
// интерфейс соискателя описывает его имя и желаемую позицию
interface Applicant {
  name: string
  position: string
}

// интерфейс наблюдателя описывает метод,
// который будет вызываться наблюдаемым объектом при наступлении события
interface Observer {
  update(data: any): void
}

interface NewPositionObserver extends Applicant, Observer {
  update(position: string): void
}

class SoftwareEngineerApplicant implements NewPositionObserver {
  name: string
  position: string

  constructor(name: string, position: string) {
    this.name = name
    this.position = position
  }

  update(position: string) {
    if (position !== this.position) return
      console.log(`Hello! My name is ${this.name}, I would like to apply to a ${position} position`)
  }
}

//2. Наблюдаемый клиент.
// базовый интерфейс наблюдаемого объекта
interface Observable {
  subscribe(observer: Observer): void
  unsubscribe(observer: Observer): void
  notify(data: any): void
}

// наблюдаемый объект хранит в себе список наблюдателей,      << ключ
// которых тот будет уведомлять о наступлении события
interface NewPositionObservable extends Observable {
  listeners: NewPositionObserver[]
  notify(position: string): void
}

class HrAgency implements NewPositionObservable {
  listeners: NewPositionObserver[] = []

  subscribe(applicant: NewPositionObserver): void {
    this.listeners.push(applicant)
  }

  unsubscribe(applicant: NewPositionObserver): void {
    this.listeners = this.listeners.filter(listener =>
      listener.name !== applicant.name)
  }

  // уведомляем всех наблюдателей, когда появляется новая вакансия
  notify(position: string): void {
    this.listeners.forEach(listener => {
      listener.update(position)
    })
  }
}

//Не указано, что запускает проверку. Сеттер здесь не обозначен...   ))
