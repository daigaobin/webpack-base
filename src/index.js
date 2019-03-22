
import _ from 'lodash'
import './styles/index.css'
import logo from './images/logo.svg'
console.log(_)

const image = new Image()
image.src = logo
document.body.appendChild(image)

function component() {
  var element = document.createElement('div')

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  return element
}

document.body.appendChild(component())

const A = () => {
  console.log('A')
  console.log('A')
}

A()

class Name {
  a = 1;
}

const a = new Name()
console.log(a.a)
