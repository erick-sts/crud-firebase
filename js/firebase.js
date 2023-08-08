const firebaseConfig = {
  apiKey: "AIzaSyCdSqaDf21QGY1fH3Ao0COkKTcO66bVN60",
  authDomain: "erick-map.firebaseapp.com",
  databaseURL: "https://erick-map-default-rtdb.firebaseio.com",
  projectId: "erick-map",
  storageBucket: "erick-map.appspot.com",
  messagingSenderId: "33238689088",
  appId: "1:33238689088:web:5c930e385394548cce06a5"
};

//init firebase

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

const urlApp = 'http://127.0.0.1:5500/'

function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).then((result) => {
    window.location.href = `${urlApp}/home.html`
  }).catch((error) => {
    alert('Erro ao efetuar o login ' + error.message)
  })
}

function verificaLogado() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      localStorage.setItem('usuarioId', user.uid)

      //Imagem do usuario
      if (user) {
        localStorage.setItem('usuarioId', user.uid)

        let imagem = document.getElementById("imagemUsuario")

        user.photoURL ? imagem.innerHTML +=
          `<img src="${user.photoURL}" alt="Foto do usuário" title="${user.displayName}" class="img rounded-circle" width="48" />`
          : `<img src="images/logo-google.svg" class="img rounded-circle" width="48" />`
      }

    } else {
      console.error('Usuário não logado!')
      window.location.href = `${urlApp}/`
    }
  })
}

function logoutFirebase() {
  firebase.auth().signOut()
    .then(function () {
      localStorage.removeItem('usuarioId')
      window.location.href = `${urlApp}/`
    })
    .catch(function (error) {
      alert(`Não foi possível fazer o logout:  ${error.message}`)
    })
}

async function salvaEstabelecimento(estabelecimento){
  let usuarioAtual = firebase.auth().currentUser

  return await firebase.database().ref('estabelecimentos').push({
    ...estabelecimento,
    usuarioInclusao: {
      uid: usuarioAtual.uid,
      nome: usuarioAtual.displayName
    }
  }).then(()=>{
    alert('Resgistro incluído com sucesso!')
    //limpa o form
    document.getElementById('formCadastro').reset()

  }).catch(error => {
    alert('Erro ao salvar: ${error.message}')
  })
}

