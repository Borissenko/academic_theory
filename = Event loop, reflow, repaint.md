
# Event loop в JavaScript — менеджер асинхронных вызовов
https://tyapk.ru/blog/post/event-loop

# В броузере мы имеем 2 JS-движка:
## 1. V8 - движок JS, в Chrome- это V8.
- heap
= stack (call Stack) - отражает то, какая часть кода мобилизована для выполнения, 
а вершок в stack'e- выполняется. 
Величина stack'a в Chrome - 16 000.

## 2. WebAPI(расширения броузера, у Node на backend'e подобное тоже есть- API_C++)
-setTimeout (в движке JS его нет!)
-Promise
-httpHtml-request (ajax/axios/,soap)
-requestAnimationFrame
-addEventListener (вызов обработчика click, точнее, это callback_queue-очередь)
-перерисовка DOM  (см. reflow, repaint, точнее, это Render_queue-очередь)
-геолокация
-аудио
-видео

WebAPI обладает своим JS-движком и поэтому может исполнять "второй поток" JS.
Когда из stack функция setTimeout передается броузеру на свое исполнение, setTimeout из стека удаляется, 
и стек переходит к исполнению следующей команды JS.
Когда интервал setTimeout исполниться WebAPI, то должна вызваться колбэк-функция, прописанная в теле setTimeout,
но насильно запихнуть код этого колбэка из WebAPI обратно в stack мы не можем!!
Колбэк от setTimeout'a сначало помещается в Очередь- task_queu.

3. task_queue- очередь кода, поступающего из "второго потока" WebAPI в stack.

4. Render_queue- очередь перерендеринга, который запускается 60р/с и ждет в Render_queu момента, когда stack очиститься.

5. callback_queue(еще одна очередь)
-onClick
-onLoad
-onDone


## 6. Event loop (относится тоже к броузеру)
-он смотрит на stack, и если он пуст, то перенаправляет задачу из task_queue, или из Render_queue, в stack.



Т.е. камень преткновения - V8 броузера.
пока stack не выработается - броузер не сможет даже перерисовать страницу (кнопки не будут работать и т.д.)


..........
# setTimeout. Task_queu.
..........
## Хитрость(!) like PROMISE(!)
- иногда прописываем функцию внутри setTimeout, у которого ставим задержку 0сек(!). 
Это для того, что бы выполнить эту функцию сразу после того, как stack очиститься!

иными словами, в setTimeout мы прописываем "colback для функции  main".

function main () {
  code...

  console.log('go1')
  setTimeout( function colback () {
    console.log('Hi1')
  }, 0)

  code...
  console.log('go2')
}

main()

Hi1 появиться только тогда, когда ВЕСЬ код внутри main() исполнится, т.е. ПОСЛЕ появления go1 и go2.



.....
# CLICK. Сallback_queue.
.....
click работает как и setTimeout.
Обработчик отправляется во "второй поток" WebAPI и там ждет клика.
Далее, после клика, колбэк обработчика поступает в task_queu и после очистки стека- поступает в V8.

Но сам Обработчик продолжает быть во "вторм потоке" WebAPI и ждать следующих кликов  => 
вновь после очередного клика отсыл колбэка обработчика в task_queu, 
а от туда ПО ОЧЕРЕДИ колбэки обработчика поступает в стек для исполнения.



.............
# Перерисовка DOM. "ТЯЖЕЛЫЙ JS"(обработка видео, сложные анимации, оnScroll). Render_queue.
.............
Перерисовка DOM запускается каждые 16мс, но не может произойти, пока stack не опустошен, и ждет своего часа в Render_queu.
Поэтому "тяжелый" JS-код, например deley(), будет откладывать перерендеринг страницы.

Но Render_queu имет более высокий приоритет, чем колбэки в task_queu, 
и поэтому перерисовка будет "проскакивать" между исполнением соседних задач из очереди task_queu.

Поэтому тяжелый JS не надо исполнять синхронно, это займет stack на длительное время и не позволит совершить перерендеринг.

Тяжелый JS лучше отправлять исполняться асинхронно. 
Он попадет в task_queu и будет оттуда поступать для исполнения кусочками, между которыми сможет проскакивать перерендеринг.

Нр: оnScroll с тяжелым кодом /Нр: deley()/ - ибо при скролле тело его функции запускается 60раз/сек.

МОРАЛЬ:
> Отзывчивость сайта, как правило, достигается за счет использования асинхронных функций(!).





..............
# Прервать поток в Стеке.
.............
Удалить операцию из стека нельзя, можно только прервать поток выполнения. 
Поток выполнения прерывается, если вызвать что-то типа alert или «исключение».




....................................................
# reflow, repaint
...............

> reflow- перерасчет броузером геометрии дивов
> repaint-  обновление броузером стилей. Или самостоятельно, или в конце reflow(всегда).

## Зло- когда несколько стилей прописаны в самом диве, и изменение КАЖДОГО из них вызывает reflow/repaint.
Надо- заявлять их в ОДНОМ стиле-классе, и тогда обновим их by reflow/repaint одним заходом.

Или- перед изменением в диве множества стилей сначала выключаем див by 
displey: none, вносим инменения, 
затем вновь включаем див =>>  reflow/repaint востребуется только 1шт.

## Анимацию надо делать в диве с 
> "position: absolut", тогда не будет в ходе анимации инициализироваться reflow.

cм. https://webformyself.com/10-sposobov-minimizirovat-reflow-i-povysit-proizvoditelnost/






