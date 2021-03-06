// function add(x,y){
//   return x+y
  
// }
//arrow: 
// arguments => return
// (x,y) => x+y
// correct above


// or you can save the arrow funct to a value
// const add = (x,y) => x + y

// most verbose way
const add = (x,y) => { return x + y}

//some shortcuts, but they are troubling

// i.e. single param arg does not need parens

function sub (x,y){
  return x-y
}

function mul (x,y){
  return x * y
}

function identity (x){
  return x
}

function identityf(x){
  return function(){
    return x
  }
}

function addf(x){
  return function (y){
  return x +y
  }
}
 //a beautiful and simple way to throw four functions onto a line
// const liftf = fn => x => y => fn(x,y)
// function fn(x,y)
// fn is a var name
// let's rewrite
function liftf(fn){
  return function buffalo(x){ // arrow funcs are anonymous funcs
    return function wings(y){
      return fn(x,y)
    }
  }
}

function curry(fn, x){ //params: binary func + arg
  return liftf(fn)(x) //return func that can take a second arg
// now at 34 specs, 26 failures
}



// haskell
// const curry = (fn, x) => liftf => fn(x,y) does not work
// function twice (fn) {
//   return function (x) {
//     return fn(x,x)
//   }
// }
// try using lambda!

const twice = fn => x => fn(x,x)

// function reverse(fn){
//   // find last index in array -1 index
//   fn(x,x)
//   return reverse(fn)
// } above is incorrect

const reverse = fn => (x,y) => fn(y,x)
// equivalent below
// function reverse(fn){
//   return function (x,y){
//   return fn (y,x)
//   }
// }

// function composeu(f, g){
  
//   function x {
//     return g(f(x))
//   }
// }
//should take two unary functions and return a unary function that calls them both
// const composeu = (f,g) => x => g(f(x)) // not really sure , but perhaps this algebraic function only needs one arg
function composeu(f,g){
  return function func1(x){
    return g(f(x))
  }
}

//should take two binary functions and return a function that calls them both
function composeb(func1,func2){ //is this binary because it returns not one, but two functions?
  return function (g,f, num){ // add 2,3, 7
    return func2(func1(g, f), num) // g function is being invoked, but also being called
  } //conclusion: look at order of 2,3,7 pay attention to naming conventions
}


// firing off multiple payments

// TEST CASE
// const mulLimited = limit(mul, 3)
// mulLimited(3,4)

// function limit (fn, n){
//   // take adv of a var you can declare outside
//   let count = 0

//   return function (x, y){
//     if (count < n){fw
//       return fn

//     }else {
//       return undefined
//     }
//     // return a binary

//     // restrict it from executing fn n number of times
//   }
// }

// const limit = (add, b) => x if(b<x)
// instructor's solution
//should restrict a binary function to be called a limited number of times
// function limit (fn,n){ // got two params, so it's binary
//   let count = 0 //empty counter

//   return function(x,y){ //return a function with two params
//     if(count < n){ //make a conditional about the argument outside this return function
//       count++ //increment the empty counter only if it's less
//       return fn(x,y) //return a binary function
//     }
//     return undefined //why are we doing this?
//   }
// }

function limit(someFunction,num){ //binary is func1, limited is limit
  // count limited number of times
  let count = 0
  //return a function that adds things
  return function func1(a,b){ // returning a func taking two args || binary func
    count++ // b/c returning breaks the loop
    
    if(count > num){
      return undefined
    } else{
    // can never have two returns in a row - does not execute
    return someFunction(a,b) // this is where i return what i have called
    }
  }
}
// What is closure?
// It is saving data inside the function you created

// currying applying argument that has another argument inside of it

// closure is saving that data

// a count is a closure

// functional programming definitions are vague

// vagueness gives power, but difficult to define

// consistency gives closures

// generate - a way to create a range over a space

// what does 'from' return?

// VS

// what does 'index' return?

// what is index?

// index is a function to increment the counter


// function from(start){
//   count = 0
//   for(let i =0; i<start.length-1 ; i++)
//   return i
// }

// function from(start){
//   return function (){ // think about signature of the function

//   }
// }

//IMPLICIT CLOSURE - 
//"should return a generator that will produce a series of values"
  // this code is really short - there must be some hidden logic
// function from(start) { // take one thing
//   // let count = 0
//   // count++
//   return function(){ //return one thing
//     return start++ //that thing is a counter - but according to above I am incorrect
//   }
// }

// function from(begin){
//   let count = 0
//   return function(){
//     count ++
//   }
// }

// to convert to arrow, write inner function
// from = begin => (count=0) = count++
const from = begin =>
{
    let count=begin;
    return () => count++

   }

// you can leave out a return in an arrow function IF you are returning only one thing
// ELSE you must explicitly return it

// const g = to(from(5), 10)

// function from(start){
//   let counter = -1
//   return function(){
//     counter++
//     return start + counter
//   }
// }

//should take a generator and an end value, and return a generator that will produce numbers up to that limit
function to(generator, endVal){
  return function () {
    let count = generator()

    if(count < endVal){
      return count // is this a limit? i thought it was a count
    }
  }
}

// const to = (gen, end) => () => {
//   const x = gen()
// }

//should return a generator that will produce values in a range
const fromTo = (start, end) => {
  let counter = -1 //gotta increment up
  return function () { //now operate!
    counter++ // incrementwihtout for loop
    if(start + counter < end){
      return start + counter //simple addition
    }
  }

}

//second argument should be optional. If a generator is not provided, then each of the elements of the array will be produced
function element(arr, gen){ //should take an array and a generator
  if(gen){
    return() => arr[gen()] //return a function that will collect the results in the array
  }else{ //second argument should be optional
    let counter = -1
    return function (){ //produce elements from the array
      counter++
      return arr[counter]
    }
  } // not sure what's happening here

}


  
function collect(gen, array){ //should take a generator and an array
  return function () { //return a function that will collect the results in the array
    let index = gen()
    if(index != undefined){ // if it's undefined then do the following
      array.push(index)
      return index // return where it is undefined
    }
  }
}

//should take a generator and a predicate, and 
//return a generator that produces only the values approved by the predicate
// function filter(gen(), pred){
  
//   // iterate through something

//   // if statement about evenness

//   // range?

//   // have an edge case about undefined

//   //why did Evan want a while true?
//   return function
// }

function filter(gen, pred){ // two params
  return function () { // return a whole bunch of things
    while (true){ //make sure it executes
      let value = gen() // alias for function
      if(pred(value)){ // a conditional taking in the alias above
        return value //returning the alias if condition executes
      } else if (value === undefined){ //otherwise make it null
        return undefined
      }
    }
  }
}
// should take two generators and return a generator that combines the sequences
//what on Earth is a generator? Evan makes it sounds like a var
// i'm thinking it's a binary function - will consult Freya

function concat(gen1,gen2) {
  return function(){
    const value = gen1()

    if(value !== undefined){
      return value
    } else {
      return gen2()
    }
  }
}

// function repeat (gen) {
//   do {

//   } while {

//   }
//   }
// }}