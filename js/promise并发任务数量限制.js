class promiseLimit{
	constructor(limitTask){
		if(typeof limitTask !== "number"){
			throw new TypeError("limitTask must be a number!")
		}
		if(limitTask === 0){
			throw new TypeError("Number of limit task must be greater than 0!")
		}
		this.limitTask = limitTask;
		this.taskQueue = [];
		this.nTask = 0;
	}

	requestTask(promise, ...args){
		return new Promise((resolve, reject) => {
			let nowTask = this.createTask(promise.bind(null, args), resolve, reject);
			if(this.nTask >= this.limitTask){
				this.taskQueue.push(nowTask);
			} else {
				nowTask();
			}
		})
	}

	createTask(promise, resolve, reject){
		return () => {
			promise().then(
				value => resolve(value)
			).catch(
				error => reject(error)
			).finally(() => {
				this.nTask--;
				if(this.taskQueue.length){
					let nowTask = this.taskQueue.shift();
					nowTask();
				}
			})
			this.nTask++;
		}
	}
}

function makePromise(){
	return new Promise((resolve, reject) => {
		resolve("2222")
	})
}

function delay(time) {
	return new Promise((resolve)=>{
		setTimeout(()=>resolve(Date.now()),time);
	})
}

function solution(){
	const promiseRequest = new promiseLimit(5);
	let promises = [];
	for (let i = 0; i < 10; i++) {
		let time = Math.random()*2000;
		console.log('time',i, time)
		promises.push(promiseRequest.requestTask(delay, time).then(
			result => console.log('result', i, result),
			error => console.log(error))
		);
	}
}

solution()