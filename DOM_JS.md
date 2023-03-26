# = РАБОТА с DOM =


# создать или захватить
let el = document.createElement('canvas')
let el = document.createElement('div')

let canvasEl = document.getElementById('canvasID')
let child_1 = el.firstChild


# добавить/удалить себя
document.body.appendChild(el)     //добавить el в корень html.
el.parentNode.removeChild(el)    //удалить el, отталкиваясь от самого себя   )).


# инъекция дочек
el.innerHTML = `<div  id="${feature.properties.id}" data-action-name="${feature.properties.title}">GO</div>`
el.appendChild(node)    //внутрь el в роли его ПОСЛЕДНЕЙ  дочки вставляется <div> "node".
el.insertBefore(node, nextNode)   //node вставляем непосредственно ПЕРЕД  уже имеющейся дочкой "nextNode".


# удаление дочки
el.removeChild(node)    //удалить дочку "node".



# атрибуты
el.id = "marker-" + feature.properties.id      //add id=""
el.setAttribute('id', 'gg')  //add id="" too.
el.setAttribute('tabindex', '-1')  //add attribute "tabindex='-1".
el.title = 'Привет!'


# CSS
el.className = 'my_marker'
el.classList.add("ok", "understand");
el.style.width = feature.properties.iconSize[0] + 'px';
el.style.height = feature.properties.iconSize[1] + 'px'
el.style.backgroundImage = 'url(https://placekitten.com/img5)'

el.classList.contains('класс')        //содержит ли элемент данный класс
el.classList.toggle('класс')     //добавление-удаление класса
//Если класс у элемента есть, метод classList.toggle ведёт себя как classList.remove и класс у элемента убирает.
//А если указанного класса у элемента нет, то classList.toggle, как и classList.add, добавляет элементу этот класс.





# = ОБРАБОТЧИКИ =

# A-вариант обработчика - el.addEventListener()
## 1.
el.addEventListener('click', function (e) {
  window.alert(feature.properties.message)
  createPopUp(marker)
})


## 2. Событие - возникновение видимости у элемента.
el.addEventListener('visibilitychange', function () {   //when the content of its tab have become visible or have been hidden.
   resetTime = true
})

//аналогично можно использовать document.visibilityState
if (el.visibilityState === 'visible') {
    //включаем что-то
} else {
    //выключаем что-либо
}
// НО(!) в разных броузерах это событие и св-во видимости называется по-разному!




# B-вариант обработчика.
let wrapperEl = document.createElement('div')

//wrapperEl.getElementsByClassName('wrapper_child1')[0].onclick(f)   //срабатывает.
//wrapperEl.getElementById('childId').onclick(f)              //НЕ срабатывает почему-то.
wrapperEl.querySelector("#childId")                 //<<< а так, с использованием id(!), - СРАБАТЫВАЕТ.
  .onclick ( e => {
    console.log('gg')                               // сразу можем что-то сделать, т.к. уже прицелены.

    if(e.target.dataset.actionName === '55') {   // <<<< дополнительно отбираем по [data-action-name="55"].
      console.log('doIt()')
    }

    if (feature.properties.id) {                    //дополнительно отбираем по feature.properties.id.
      console.log('doIt()')
    }
  })



# КЛИК ПО ОПРЕДЕЛЕННОЙ зоне попапа:
- зауживаться в DOM попапа лучше не by wrapperEl.getElementsByClassName() or wrapperEl.querySelector(),
а лучше в целевом теге у попапа прописать еще один data-атрибут по типу data-action-type="addCamera"
и далее отсеиться внутри обработчика:

popUpNode.onclick = (e) => {
  let targetCameraName = e.target.dataset.cameraName
  let targetActionType = e.target.dataset.actionType

  // клик по определенным зонам попапа
  switch (targetActionType) {
    case 'addCamera':    //клик по иконке (+/-), выбранную камеру добавляем/удаляем в/из списка избранных.
      let targetCamera = this.cameraList.find(camera => camera.CAMERA === targetCameraName);
      this.$emit('clickedCamera', targetCamera);
      this.clickedCameraFeature = feature;
      popup.remove();
      clearTimeout(this.popupTimeout);
      break;

  }
}


//CSS для дива с обработчиком
[data-action-name="close"] {
   cursor: pointer;
 }




# C-вариант обработчика
//вешаем на произвольный DOM-элемент из JS
//декларируем с помощью небольшого плагина npm

npm i hammerjs

import Hammer from 'hammerjs'

// get a reference to an element
var stage = document.getElementById('stage');

// create a manager for that element
var manager = new Hammer.Manager(stage);

// create a recognizer
var Rotate = new Hammer.Rotate();

// add the recognizer
manager.add(Rotate);

// subscribe to events
manager.on('rotate', function(e) {
  // do something cool
  var rotation = Math.round(e.rotation);
  stage.style.transform = 'rotate('+rotation+'deg)';
})


//.......................
# КНОПКА включения-выключения чего-либо
<button id="pause"></button>  //текст на кнопке задается в CSS.

<script>
var pauseButton = document.getElementById('pause')

pauseButton.addEventListener('click', function () {
  pauseButton.classList.toggle('go')   //присуждение-отмена класса для элемента. Меняем надпись на кнопке.
  
  if (pauseButton.classList.contains('go')) {
     //включаем что-то
  } else {
     //выключаем что-либо
  }
})


</script>
<style>
button {
  position: absolute;
  margin: 20px;
}
#pause::after {
  content: 'Пауза';   //текст на кнопке
}
#pause.go::after {
  content: 'Go';
}
</style>

//.......................

















