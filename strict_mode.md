# strict mode

# Включить 
> 'use strict'

или локально, 
в области видимости, ограниченной телом функциии,

function hello() {
  'use strict'
  return 'hey'
}



# Особенности
## Переменная, не заявленная via var/let/const, 
не становиться глобальной, а вызывает ошибку.



##  this у функции не получает доступ к глобальным переменным Window
'use strict'
(function() {
  console.log(this)
})()



## Не получиться перезаписать значение не перезаписываемого свойства у объекта
const car = {}
Object.defineProperty(car, 'color', {
  value: 'blue',
  writable: false        //<< неперезаписываемое свойство
}) 

car.color = 'yellow'     //<< выдаст ошибку
console.log(car.color)




















