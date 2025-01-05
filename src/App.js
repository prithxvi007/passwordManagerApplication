// App.js
import React, {Component} from 'react'
import './App.css'

class App extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordList: [],
    showPassword: false,
    searchInput: '',
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    if (websiteInput && usernameInput && passwordInput) {
      const newPassword = {
        id: Date.now(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
      }

      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newPassword],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  onToggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onDeletePassword = id => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(
        password => password.id !== id,
      ),
    }))
  }

  getFilteredPasswords = () => {
    const {passwordList, searchInput} = this.state
    return passwordList.filter(password =>
      password.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      showPassword,
      searchInput,
      passwordList,
    } = this.state

    const filteredPasswords = this.getFilteredPasswords()
    const passwordsCount = passwordList.length

    return (
      <div className="password-manager-bg-container">
        <div className="password-manager-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="password-manager-logo-img"
          />
        </div>

        <div className="password-manager-card-container">
          <div className="password-input-form-container">
            <h1 className="password-heading">Add New Password</h1>
            <form className="password-form" onSubmit={this.onAddPassword}>
              <div className="password-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-logo"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="password-input-text"
                  value={websiteInput}
                  onChange={this.onChangeWebsiteInput}
                />
              </div>
              <div className="password-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-logo"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="password-input-text"
                  value={usernameInput}
                  onChange={this.onChangeUsernameInput}
                />
              </div>
              <div className="password-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-logo"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="password-input-text"
                  value={passwordInput}
                  onChange={this.onChangePasswordInput}
                />
              </div>
              <div className="submit-btn-container">
                <button type="submit" className="password-submit-btn">
                  Add
                </button>
              </div>
            </form>
          </div>

          <div className="password-managaer-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-managaer-img"
            />
          </div>
        </div>

        <div className="password-save-card-container">
          <nav className="password-save-nav-container">
            <h1 className="password-save-heading">Your Passwords</h1>
            <div className="password-save-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-logo"
              />
              <input
                type="search"
                placeholder="Search"
                className="password-input-text"
                value={searchInput}
                onChange={this.onSearchInput}
              />
            </div>
          </nav>
          <hr className="horizontal-line" />
          <form className="show-password-form">
            <input
              type="checkbox"
              id="pass"
              className="checkbox"
              checked={showPassword}
              onChange={this.onToggleShowPassword}
            />
            <label htmlFor="pass" className="pass-label">
              Show Passwords
            </label>
          </form>
          {filteredPasswords.length === 0 ? (
            <div className="no-password-img-container">
              <div className="no-pass-img-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-managaer-img"
                />
                <p className="no-pass-text">No Passwords</p>
              </div>
            </div>
          ) : (
            <ul className="password-list">
              {filteredPasswords.map(password => (
                <li className="password-list-item" key={password.id}>
                  <div className="password-logo-container">
                    <p className="password-logo">
                      {password.website[0].toUpperCase()}
                    </p>
                  </div>
                  <div className="password-details">
                    <p>{password.website}</p>
                    <p>{password.username}</p>
                    <p>
                      {showPassword ? (
                        password.password
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="stars"
                        />
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => this.onDeletePassword(password.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
