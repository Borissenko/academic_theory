//когда могут инъекцироваться или LocalStorage, или LocalStorage_2
//Здесь внешнюю зависимость вставляем не как аргумент конструктора по-умолчанию,
//а как значение аргумента для конструктора, добавляемое при инициации экземпляра.

//Здесь же - паттерн АДАПТЕР.

interface Storage {
  getItem(key: string): any
}

interface StorageDependencies {
  storage: Storage
}

// добавляем АДАПТЕР для LS_2
class LS_2Adapter implements Storage {
  getItem(key: string): any {
    return LS_2.getByKey(key)
  }
}

// то же для localStorage
class LSAdapter implements Storage {
  getItem(key: string): any {
    return localStorage.getItem(key)
  }
}

// код класса StorageService не меняется!
class StorageService {
  storage: Storage

  constructor({ storage = localStorage }: StorageDependencies) {
    this.storage = storage
  }

  get(key: string): any {
    // вся реализация методов обоих хранилищ скрыта за адаптерами
    return this.storage.getItem(key)
  }
}

// использование-1
const storageServiceWithLS = new StorageService({
  storage: new LSAdapter()
})

// использование-2
const storageServiceWithLS_2 = new StorageService({
  storage: new LS_2Adapter()
})



