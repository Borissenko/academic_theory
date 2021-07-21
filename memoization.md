# Мемоизация
- сохранения результатов дорогостоящих вызовов функций и возвращения кешированного результата для одних и тех же входных данных.

//https://habr.com/ru/company/ruvds/blog/332384/
//https://github.com/developit/decko#memoize


## простая функция, прибавляющая 10 к переданному ей числу
const add = (n) => (n + 10);
add(9);


## аналогичная функция с мемоизацией
const memoizedAdd = () => {
    let cache = {};
    return (n) => {
        if (n in cache) {
            console.log('Fetching from cache');
            return cache[n];
        }
        else {
            console.log('Calculating result');
            let result = n + 10;
            cache[n] = result;
            return result;
        }
    }
}

const newAdd = memoizedAdd();
console.log(newAdd(9)); // вычислено
console.log(newAdd(9)); // взято из кэша





