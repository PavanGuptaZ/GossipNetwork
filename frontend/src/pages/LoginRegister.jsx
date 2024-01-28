import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToggleBTN } from '../components/ToggleBTN';
import styles from '../css/login&register.module.css';
import { ThemeContext, UserContext } from '../hooks/ContextProvider';
import { useContext, useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import PropTypes from 'prop-types'
import { useKey } from '../hooks/useKey';
import { LoginAPI, RegisterAPI } from '../api/LoginandRegister';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingComponent } from '../components/Loading/LoadingComponent';

export const LoginRegister = ({ type }) => {
  let { user, userLoading } = useContext(UserContext)
  const { body, body2, color } = useContext(ThemeContext)
  const [uiUpdates, setUiUpdates] = useState({ password1: true, password2: true, checks: false })
  const [inputValues, setInputValues] = useState({ name: "", email: "", password1: "", password2: "" })
  const location = useLocation()
  const queryClinet = useQueryClient()
  const navigator = useNavigate()

  useKey("Escape", () => clean())

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: () => LoginAPI({ email: inputValues.email, password: inputValues.password1 }),
    onSuccess: (data) => {
      if (data?.user) {
        queryClinet.setQueriesData(['user'], data.user)
        toast.info("Welcome " + data.user.name)
      } else {
        toast.warn(user.message)
      }
    }
  })
  useEffect(() => {
    clean()
  }, [location.pathname])

  useEffect(() => {
    if (user) {
      navigator('/home')
    }
  })

  if (userLoading) {
    return <LoadingComponent />
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setUiUpdates((pre) => ({ ...pre, checks: true }))
    if (type === "Login") {
      if (EmailCheck01 && PasswordCheck01) {
        loginMutation.mutate()
        return
      }
      toast.error("Check Details Once Again - " + (!EmailCheck01 ? "Email " : "") + (!PasswordCheck01 ? " Password" : ""))

    }
    if (type === "Register") {
      if (nameCheck && EmailCheck01 && PasswordCheck01 && PasswordCheck02) {
        RegisterAPI({ email: inputValues.email, password: inputValues.password1, name: inputValues.name })
        return
      }
      toast.error("Check Details Once Again - " + (!nameCheck ? "Name " : "") + (!EmailCheck01 ? "Email " : "") + (!PasswordCheck01 ? " Password" : "") + (!PasswordCheck02 ? " Password are not matched" : ""))

    }
  }
  function clean() {
    setInputValues({ name: "", email: "", password1: "", password2: "" })
    setUiUpdates({ password1: true, password2: true, checks: false })
  }
  const namePattern = /^(?=.{5,30}$)\b[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)?\b$/
  const emailPattern = /^(?=.{5,50}$)[A-Za-z0-9._%+-]{3,40}@[A-Za-z0-9.-]+\.[A-Za-z]{2,50}$/
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@&*#$!?])[\w@&*#$!?]{3,20}$/
  let nameCheck = namePattern.test(inputValues.name);
  let EmailCheck01 = emailPattern.test(inputValues.email);
  let PasswordCheck01 = passwordPattern.test(inputValues.password1)
  let PasswordCheck02 = inputValues.password1 === inputValues.password2

  return (
    <div className={styles.formFullBox}>
      <form id='form' className={styles.form} style={{ background: body, color }} onSubmit={handleSubmit}>
        <label htmlFor="form" className={styles.formLabel}>{type.toUpperCase()} </label>
        {type === "Register" && <div className={styles.inputDivBox}>
          <label htmlFor="nameInput" className={styles.inputLabel}>Name</label>
          <input type="text" name="name" id="nameInput" className={styles.inputBox} placeholder='Name Here'
            value={inputValues.name} onChange={(e) => setInputValues((pre) => ({ ...pre, name: e.target.value }))}
            style={{ backgroundColor: body2, color }} />
          {uiUpdates.checks && !nameCheck && <div className={styles.warningLabel}>{inputValues.email.trim().length} - one or two words, no extra spacing & between 5 to 30 characters only</div>}
        </div>}
        <div className={styles.inputDivBox}>
          <label htmlFor="emailInput" className={styles.inputLabel}>Email</label>
          <input type="email" name="email" id="emailInput" className={styles.inputBox} placeholder='Email Here'
            value={inputValues.email} onChange={(e) => setInputValues((pre) => ({ ...pre, email: e.target.value }))}
            style={{ backgroundColor: body2, color }} />
          {uiUpdates.checks && !EmailCheck01 && <div className={styles.warningLabel}>{inputValues.email.trim().length} - min of 3 and a max of 40 characters @ total 50</div>}
        </div>
        <div className={styles.inputDivBox}>
          <label htmlFor="passwordInput" className={styles.inputLabel}>Password</label>
          <input type={uiUpdates.password1 ? "password" : "text"} name="password" id="passwordInput"
            value={inputValues.password1} onChange={(e) => setInputValues((pre) => ({ ...pre, password1: e.target.value }))}
            className={styles.inputBox + " " + styles.passwordInput} placeholder='Password Here' style={{ backgroundColor: body2, color }} />
          <div className={styles.passwordIcon} onClick={() => setUiUpdates((pre) => ({ ...pre, password1: !uiUpdates.password1 }))}>
            {uiUpdates.password1 ? <FaEye /> : <FaEyeSlash />}
          </div>
          {uiUpdates.checks && !PasswordCheck01 && <div className={styles.warningLabel}>{inputValues.password1.trim().length} - no Spacing, atleast contain one captial, small letter, number and one from @, &, *, #, $, !, ? and limit of 3 to 20</div>}
        </div>
        {type === "Register" && <div className={styles.inputDivBox}>
          <label htmlFor="passwordInput2" className={styles.inputLabel}>Password Again</label>
          <input type={uiUpdates.password2 ? "password" : "text"} name="password2" id="passwordInput2"
            value={inputValues.password2} onChange={(e) => setInputValues((pre) => ({ ...pre, password2: e.target.value }))}
            className={styles.inputBox + " " + styles.passwordInput} placeholder='Password Here' style={{ backgroundColor: body2, color }} />
          <div className={styles.passwordIcon} onClick={() => setUiUpdates((pre) => ({ ...pre, password2: !uiUpdates.password2 }))}>
            {uiUpdates.password2 ? <FaEye /> : <FaEyeSlash />}
          </div>
          {uiUpdates.checks && !PasswordCheck02 && <div className={styles.warningLabel}>{inputValues.password2.trim().length} - Password should be same</div>}
        </div>}
        <div className={styles.inputDivBox}>
          <button type='submit' className={styles.submitBTN}>{type}</button>
        </div>
        <div className={styles.inputDivBox} style={{ textAlign: "center" }}>
          {LoginRegisterProps[type].extLinkText}
          <Link to={"/" + LoginRegisterProps[type].extLink} style={{ color }} >{LoginRegisterProps[type].extLinkLink}</Link>
        </div>
      </form>
      <ToggleBTN />
    </div>
  )
}

LoginRegister.propTypes = {
  type: PropTypes.string.isRequired
}

const LoginRegisterProps = {
  Login: {
    extLink: "register",
    extLinkText: "Don't have Account",
    extLinkLink: "SignUp here"
  },
  Register: {
    extLink: "login",
    extLinkText: "Already have Account",
    extLinkLink: "Login here"
  }
}