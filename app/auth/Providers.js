import { FBLoginManager } from 'react-native-facebook-login'
// import GoogleSignIn from 'react-native-google-sign-in'

const Facebook = {
  login: (permissions) => {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
    return new Promise((resolve, reject) => {
      FBLoginManager.loginWithPermissions(permissions, (error, data) => {
        if (!error) {
          resolve(data.credentials.token)
        } else {
          reject(error)
        }
      })
    })
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      FBLoginManager.logout((error, data) => {
        if (!error) {
          resolve(true)
        } else {
          reject(error)
        }
      })
    })
  }
}

// const Google = {
//   configure: (options) => {
//     GoogleSignIn.configure(options)
//   },
//   login: () => {
//     return new Promise((resolve, reject) => {
//       GoogleSignIn.signInPromise()
//         .then((user) => {
//           resolve(user.accessToken)
//         })
//         .catch((err) => {
//           reject(err)
//         })
//         .done()
//     })
//   },
//   logout: () => {
//     return new Promise((resolve, reject) => {
//       GoogleSignIn.signOutPromise()
//         .then(() => {
//           resolve(true)
//         })
//         .catch((err) => {
//           reject(err)
//         })
//     })
//   }
// }

// const Providers = {Facebook, Google}
const Providers = {Facebook}
export default Providers
