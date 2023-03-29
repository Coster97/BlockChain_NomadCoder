type Player = {
    readonly name?:String,
    age?:Number
}

const P1 : Player = {
    name: "lynn"
}
const P2 : Player = {
    age : 13
}

const playerMaker = (name:string) : Player => ({name})
const nico = playerMaker("nico")
nico.age = 12
// nico.name = "hi"



//unknown - 타입 확인을 반드시 거쳐야 함
let a:unknown;

if(typeof a === 'number'){
    let b = a + 1
}


//void - 아무것도 return 하지 않음

function hello(){
    console.log('x')
}

// const a = hello(); hello()는 아무것도 반환하지 않기떄문에 a에 대입이 불가능함



//never은 절대 return 하지 않을때 사용하는 타입

function hello2():never{
    throw new Error("xxx")
}



// function add(a:number, b:number) {
//     return a + b
// }


//call Signatures 이 함수가 어떻게 호출되는지 설명해줌 우리가 임의로 모든 타입을 다 지정했다!
type Add = (a:number, b:number) => number;

const add:Add = (a, b) => a + b 




//overloading 패키지나 외부라이브러리를 사용할 때 중요한 부분, 그냥 콜 시그니처가 여러개인 함수


type Add2 = {
    (a:number, b: number) : number
    (a:number, b: string) : number
}

const add2:Add2 = (a, b) => {
    if(typeof b === "string") return a
    return a + b
}


//next.js 에서 확인할 수 있는 완벽한 오버로딩의 예시

// Router.push({
//     path: "/home",
//     state: 1
// })

// .push("/home")



//패키지나 라이브러리를 디자인할떄 많이 쓰는 코드 구조

type Config = {
    path: string,
    state: object
}
type Push = {
    (path:string):void
    (config: Config):void
}

const push:Push = (config) => {
    if(typeof config === "string") console.log(config)
    else{
        console.log(config.path, config.state)
    }
  
}

//다른 여러개의 어규먼트를 가지고 있는 경우도 있다.

type Add3 = {
    (a:number, b: number) : number
    (a:number, b: number, c: number) : number
}

const add3:Add3 = (a, b, c?: number) => {
    if(c) return a + b + c
    return a + b
}

add3(1, 2)
add3(1,2,3)




//Polymorphism 다형성, generic -> 타입의 placeholder 같은것임 call signature을 작성할 때, 들어올 확실한 타입을 모르는 상황에서 generic을 사용함

type SuperPrint = {
    <TypePlaceholder>(arr: TypePlaceholder[]):void
}

const superPrint: SuperPrint = (arr) => {
    arr[0]
}

//아래 함수들의 콜 시그니처를 확인해보면 value에 따라 그에 맞는 타입을 도출하고 있다.
superPrint([1,2,3])
superPrint([true,true,false])
superPrint(["a","b","c"])


//제네릭은 하나 이상도 사용이 가능하다. 제네릭 순서를 기반으로 제네릭의 타입을 알 수 있다. 

type SuperPrint2 = {
    <T, M>(arr: T[], b:M):void
}

const superPrint2: SuperPrint2 = (a) => {
    a[0]
}


superPrint2([1,2,3], 3)


//실제 제네릭의 사용 예시, 상속

type Player2<E> = {
    name:string
    extraInfo:E
}


type nicoExtra = {
    favFood:string
}

type nicoPlayer = Player2<nicoExtra>

const nico2 : nicoPlayer = {
    name: "nico",
    extraInfo: {
        favFood:"kimchi"
    } {}
}






//Classes

//추상클래스 - 다른 클래스가 상속받을 수 있는 클래스, 하지만 직접 새로운 인스턴스를 만들수는 없다.
abstract class User {

    constructor(
        //private - 클래스 안에서만 사용가능
        //public - 외부 모든 곳에서 사용가능
        //protected - 클래스를 상속하는 모든 클래스에서 사용가능
        protected firstName:string,
        protected lastName:string,
        protected nickaname:string
    ) {}

    //추상 메소드, 메소드의 call sig만 가지고 있음. 상속받는 클래스에서 추상메소드를 구현해줘야함
    abstract getNickName():void
    getFullName(){
        return `${this.firstName} ${this.lastName}`
    }

}

class Player3 extends User{
    getNickName(): void {
        console.log(this.nickaname);
    }


}

const nico3 = new Player3("nico", "las", "니꼬")

nico3.getFullName();


//실전


type Words = {
    [key:string]: string
   //프로퍼티의 이름을 모르지만 타입을 알아야할때 유용
}



class Dict {
    private words:Words
    constructor(){
        this.words = {}
    }
    add(word:Word) {
        if(this.words[word.term] === undefined) {
            this.words[word.term] = word.def;
        }
    }
    def(term:string) {
        return this.words[term]
    }
}

class Word {
    constructor (
        public term:string,
        public def: string
    ) {}
}

const kimchi = new Word("kimchi", "korean food")
const dict = new Dict()

dict.add(kimchi);
dict.def("kimchi");


// js 변환 코드
// Define the Words type as an object with string keys and string values.
// const Words = {};

// // Define the Dict class.
// class Dict {
//   // Initialize an empty words object in the constructor.
//   constructor() {
//     this.words = {};
//   }

//   // Add a new word to the dictionary.
//   add(word) {
//     if (this.words[word.term] === undefined) {
//       this.words[word.term] = word.def;
//     }
//   }

//   // Get the definition of a term.
//   def(term) {
//     return this.words[term];
//   }
// }

// // Define the Word class.
// class Word {
//   constructor(term, def) {
//     this.term = term;
//     this.def = def;
//   }
// }

// // Create a new Word instance for "kimchi".
// const kimchi = new Word("kimchi", "korean food");

// // Create a new Dict instance and add "kimchi" to it.
// const dict = new Dict();
// dict.add(kimchi);

// // Look up the definition of "kimchi".
// dict.def("kimchi");


// Interfaces 오로지 오브젝트의 모양을 설명하는 하나의 방법, type이 훨씬 다양한 역할을 할 수 있음 (더 유용함)


type Team = "red" | "blue"
type health = 1 | 2 | 3

interface Player4 {

    nickname:string,
    team:Team,
    health: health
}

// type Player4 {

//     nickname:string,
//     team:Team,
// }


//Interfaces part 2

//추상 클래스, 인스턴스 불가능
// abstract class User2 {
//     constructor(
//         protected firstName : string,
//         protected lastName : string
//     ) {}
//     //추상 메소드, 콜 시그니처만
//     abstract sayHi(name:string):string
//     abstract fullName():string
// }

// //추상 클래스를 상속한 Player5는 추상메소드를 구현해야한다.
// class Player5 extends User2 {
//     fullName() {
//         return `${this.firstName} ${this.lastName}`
        
//     }
//     sayHi(name:string) {   
//         return `Hello ${name}. May name is ${this.fullName()}`
        
//     }
    
// }

//위의 추상클래스를 인터페이스로 바꾸면?

interface User2 {

    firstName : string,
    lastName : string,
    sayHi(name:string):string
    fullName():string
}

//인터페이스를 상속할 때는 프로퍼티를 프라이빗으로 만들지 못한다.
class Player5 implements User2 {
    constructor(
        public firstName:string,
        public lastName:string
    ) {

    }
    fullName() {
        return `${this.firstName} ${this.lastName}`
        
    }
    sayHi(name:string) {   
        return `Hello ${name}. May name is ${this.fullName()}`
        
    }
    
    
}

//인터페이스는 타입도 될수 있다. 어규먼트로 쓸때도 인터페이스의 내용만 잘 넣어주면 됨

function makeUser(user: User2){
    return "hi"
}
makeUser({
    firstName:"nico",
    lastName:"las",
    fullName: () => "xx",
    sayHi: (name) => "string"
})


//다형성, 제네릭, 클래스, 인터페이스를 모두 합쳐서 써보기(브라우저에서 쓰는 로컬스토리지 API 시뮬레이션 해보기)

interface MyStorage<T> {
    [key:string] : T
}
class LocalStorage<T> {
    private storage : MyStorage<T> = {}
    set(key:string, value:T){
        this.storage[key] = value;
    }
    remove(key:string){
        delete this.storage[key];
    }
    get(key:string):T {
        return this.storage[key];
    }
    clear(){
        this.storage = {}
    }
}

const stringStorage = new LocalStorage<string>()

stringStorage.get("ket");
stringStorage.set("hello", "hi");

const booleanStorage = new LocalStorage<boolean>();

booleanStorage.get("xxx")
booleanStorage.set("hello", true)