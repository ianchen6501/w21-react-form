import './App.css';
import styled from 'styled-components'
import { forwardRef, useState } from 'react';

function Warning({isNotEmpty, target}) {
  let div
  if(isNotEmpty[target]) {
    div = <div className='input__error hidden'></div>
  } else {
    div = <div className='input__error'>請填寫內容</div>
  }
  return (
    div
  )
}

function ApplyForm() {
  const [warning, setWarning] = useState(false) //click button 後就開啟 warnging message
  
  const [isNotEmpty, setIsNotEmpty] = useState({
    nickname: null,
    email: null,
    phone: null,
    type: null,
    touchWay: null,
  })

  function handleSetWarning() {
    setWarning(true)
  }

  function handleCheckEmpty(event, key) {
    const newState = Object.assign({}, isNotEmpty) //不能寫 const newState = isNotEmpty
    const value = event.target.value
    if(value) {
      newState[key] = value
      setIsNotEmpty(newState)
    } else {
      newState[key] = null
      setIsNotEmpty(newState)
    }
  }

  function handleCheckFocus(event, key) {
    const newState = Object.assign({}, isNotEmpty)
    const value = event.target.value
    if(event.target.checked) {
      newState[key] = value
      setIsNotEmpty(newState)
    }
  }

  function handleAllert(event) {
    event.preventDefault()
    const values = Object.values(isNotEmpty)
    if(values.some(value => value === null)) return//檢查是否有空值
    const message = `
      已收到您的回覆。
      暱稱:${values[0]}
      電子郵件:${values[1]}
      手機號碼:${values[2]}
      報名類型:${values[3]}
      怎麼知道這個活動的:${values[4]}
      如有錯誤請再來信反映，謝謝!
    `
    alert(message)
  }

  return (
    <form>
      <div className='section'>
        <section className='section__title'>
          暱稱 
          <span className="starsign">*</span>
        </section>
        <input onChange={(event) => handleCheckEmpty(event, "nickname")}/>
        { warning && <Warning isNotEmpty={isNotEmpty} target={'nickname'}/> }
      </div>

      <div className='section'>
        <section className='section__title'>
          電子郵件 <span className="starsign">*</span>
        </section>
        <input onChange={(event) => handleCheckEmpty(event, "email")}/>
        { warning && <Warning isNotEmpty={isNotEmpty} target={'email'}/> }
      </div>

      <div className='section'>
        <section className='section__title'>
          手機號碼 <span className="starsign">*</span>
        </section>
        <input onChange={(event) => handleCheckEmpty(event, "phone")}/>
        { warning && <Warning isNotEmpty={isNotEmpty} target={'phone'}/> }
      </div>

      <div className='section'>
        <section className='section__title'>
          報名類型 <span className="starsign">*</span>
        </section>
        <div className='input__radio'>
          <label>
            <input type="radio" value="躺在床上用想像力實作" name="type" onClick={(event) => handleCheckFocus(event, "type")}/>躺在床上用想像力實作
          </label>
          <label>
            <input type="radio" value="趴在地上滑手機找現成的" name="type" onClick={(event) => handleCheckFocus(event, "type")}/>趴在地上滑手機找現成的
          </label>
        </div>
        { warning && <Warning isNotEmpty={isNotEmpty} target={'type'}/> }
      </div>

      <div className='section'>
        <section className='section__title'>
          怎麼知道這個活動的？<span className="starsign">*</span>
        </section>
        <input onChange={(event) => handleCheckEmpty(event, "touchWay")}/>
        { warning && <Warning isNotEmpty={isNotEmpty} target={'touchWay'}/> }
      </div>

      <div className='section'>
        <section className='section__title'>
          其他
        </section>
        <div className='section__subtitle'>
          對活動的一些建議
        </div>
        <input/>
      </div>

      <div className='section'>
        <input className="button" type='submit' onClick={(event) => {
          handleSetWarning()
          handleAllert(event)
        }}></input>
      </div>

      <div className='section'>
        <div className='section__subtitle'>
          請勿透過表單送出您的密碼。
        </div>
        <div className='buttom'></div>
      </div>
    </form>
  )
}

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className='topbar'></div>
        <header className='header'>
          <h1>新拖延運動報名表單</h1>
          <h2>活動日期：2020/12/10 ~ 2020/12/11</h2>
          <h2>活動地點：台北市大安區新生南路二段1號</h2>
          <h3>*必填</h3>
        </header>
        <ApplyForm></ApplyForm>
      </div>
    </div>
  );
}

export default App;
