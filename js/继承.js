// 原型链
// 缺点：在创建子类实例时无法向父类构造传参, 即没有实现super()的功能
function parent() {
	this.name = ["father"]
}

parent.prototype.getName = function () {
	return this.name;
}

function child() {
	// this.name = "child"
}
child.prototype = new parent()
child.prototype.constructor = child

/* 对象冒充
   通过call或apply改变this指向,并执行了父类的构造函数
   缺点：只能继承超类的构造函数,无法继承原型链上的方法
 */
function parent() {
	this.name = 'father'
}

parent.prototype.getName = function () {
	return this.name
}

function child(){
	parent.call(this, 'child')
}

/* 组合式
   组合以上两种
   缺点：子类创建实例时，原型中会存在两份相同的属性和方法，这并不优雅
*/
function parent() {
	this.name = ['father']
}
parent.prototype.getName = function () {
	return this.name
}

function child(){
	parent.call(this, 'child')
}
child.prototype = new parent();
child.prototype.constructor = child

/* 寄生式
   组合以上两种
   缺点：子类创建实例时，原型中会存在两份相同的属性和方法，这并不优雅
*/
function parent() {
	this.name = ['father']
}
parent.prototype.getName = function () {
	return this.name
}
function child(){
	parent.call(this, 'child')
}
child.prototype = Object.create(parent.prototype)
child.prototype.constructor = child

