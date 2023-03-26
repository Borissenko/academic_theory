// localStorage напрашивается быть жестко вписанным к код класса композицией
//Но мы вставляем ее ЧЕРЕЗ ЗНАЧЕНИЕ ПО-УМОЛЧАНИЮ(!)
//В таком случае при тестировании легко подменить реальный localStorage заглушкой.
//https://ota-solid.vercel.app/ocp/in-real-life


interface Storage {
  getItem(key: string): any
}

interface StorageDependencies {
  storage: Storage
}

class StorageService {
  storage: Storage

  // указываем, какие зависимости следует использовать
  // JSON тоже стоит внедрять подобным образом,
  // но для простоты примера берём в расчёт только localStorage
  constructor({ storage = localStorage }: StorageDependencies) {
    this.storage = storage
  }

  get(key: string): any {
    // используем зависимость через интерфейс
    return JSON.parse(this.storage.getItem(key))
  }
}