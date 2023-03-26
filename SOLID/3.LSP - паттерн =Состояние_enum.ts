// поведение объекта меняется в зависимости от его внутреннего состояния.


//1. базисный класс
enum Status {
  Draft,
  Published,
  Deleted
}

class ArticleException extends Error {/*...*/}

class Article {
  status: Status   //его значение - одно из значений энума.

  constructor() {/*...*/}

  edit() {/*...*/}
  delete() {/*...*/}
  restore() {/*...*/}
  unpublish() {/*...*/}

  protected canPublish(): boolean {
    return this.status === Status.Draft       //<< отбор действия по внутреннему состоянию
  }

  publish(): void {
    if (this.status === Status.Draft) {         // << в зависимости от значения enum Status - делаем что-то.
      //..
      this.status = Status.Published
    } else
      throw new ArticleException()
  }
}


//2. подкласс
class ArticlePublishedException extends ArticleException {/*...*/}

class Published extends Article {
  //...

  publish(): void {
    // ArticlePublishedException наследуется от ArticleException,
    // указанного в классе Article, поэтому здесь нарушения нет
    throw new ArticlePublishedException()
  }
}

