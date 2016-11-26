var assert = require("assert"); //nodejs에서 제공하는 aseert 모듈

describe('테스트', ()=> {
	it('값 비교',  ()=> {
		assert(1 == 1);
	});
	it('값 비교2',  ()=> {
		assert(1 != 1);
	});
});

describe('async code test',  ()=> {
	describe('setTimeout',  ()=> {
		it('2초가 넘어가면 실패!!',  (done)=> {
			setTimeout( ()=> {
				done();
			}, 5000);
		});
	});
});

describe('hooks', function() {

	before(function() {
        //describe내에서 테스트를 시작하기 이전에 한번만 실행
	});

	after(function() {
        //describe내에서 테스트가 끝났을때 한번만 실행
	});

	beforeEach(function() {
        //describe내에서 각각의 it이 실행되기 이전에 실행
	});

	afterEach(function() {
        //describe내에서 각각의 it이 실행된후 실행
	});

	it('test1', ()=>{

    })

	it('test2', ()=>{

    })
});
