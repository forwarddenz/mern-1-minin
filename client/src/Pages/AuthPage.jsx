import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/messageError'

export const AuthPage = () => {

  const auth = useContext(AuthContext)

  const message = useMessage()
  const { loading, request, error, clearEorrors } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearEorrors()
  }, [error, message, clearEorrors])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/test', 'POST', { ...form })
      auth.login(data.token, data.userID)
    } catch (err) { }
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (err) { }
  }

  return (
    <div className="row">
      <div className="col s6 offset-3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input placeholder="Введите email" id="email" type="text" name="email" value={form.email} onChange={changeHandler} />
              </div>

              <div className="input-field">
                <input placeholder="Введите пароль" id="password" type="password" name="password" value={form.password} onChange={changeHandler} />
              </div>

            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4 open-btn" onClick={loginHandler} disabled={loading} >Войти</button>
            <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading} >Регистрация</button>
          </div>
        </div>
      </div>
    </div>
  )
}
//  disabled={loading}