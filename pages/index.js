import React, { Fragment, useState, useEffect } from 'react'
import firebase, { auth, provider, db } from '../firebase'
import { Button, Card, NavBar, Icon, WingBlank, WhiteSpace } from 'antd-mobile'

import Link from 'next/link'

import io from 'socket.io-client'
import openSocket from 'socket.io-client'

// const socket = io('http://localhost:4000')

function App() {
  const [usuario, setUsuario] = useState('')
  const [timestamp, setTimestamp] = useState('Nothing yet')

  const ref = firebase.database().ref('chuches')

  var chuche = {}

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(`Hola ${user.displayName}`)
        setUsuario(user)
      } else {
        console.log('No hay usuario registrado')
      }
    })
    // socket.on('pollas', function() {
    //   console.log('Has recibido pollas desde el servidor')
    // })
  }, [])

  function cerrarSesion() {
    if (usuario) {
      auth.signOut().then(function() {
        console.log('Salido de la sesisón')
      })
    }
  }

  function saludar() {
    socket.emit('saludo', 'Bruco')
  }

  function iniciarSesion() {
    if (!usuario) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          chuche = {
            name: result.user.displayName,
            email: result.user.email,
            uid: result.user.uid
          }
          agregarChuche(chuche)
        })
        .catch(function(error) {
          var errorCode = error.code
          var errorMessage = error.message
          var email = error.email
          var credential = error.credential
        })
    }
  }

  function agregarChuche(chuche) {
    db.collection('chuches')
      .doc(chuche.uid)
      .update(chuche)
      .then(function() {
        console.log('Document successfully updated!')
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error)
      })
  }

  return (
    <div>
      <NavBar mode="light" rightContent={[<Icon key="0" type="ellipsis" />]}>
        WTF are you gonna do?
      </NavBar>

      <WingBlank size="lg">
        <WhiteSpace size="xl" />

        <Card>
          <Card.Header title="Ir al entrenamiento" />
          <Link href="/play">
            <Card.Body>
              <Button type="primary">Entrenar</Button>
            </Card.Body>
          </Link>
        </Card>
        <WhiteSpace size="xl" />
        <p>{timestamp}</p>
        <Card>
          <Card.Header title="Configurar entrenamiento" />
          <Card.Body>
            <Link href="/setup">
              <Button type="primary">Configurar</Button>
            </Link>
          </Card.Body>
        </Card>
        <WhiteSpace size="xl" />

        <Card>
          <Card.Header title="Iniciar sesión" />
          <Card.Body>
            <Button type="primary" onClick={iniciarSesion}>
              Iniciar sesión
            </Button>
            <WhiteSpace />
            <Button type="primary" onClick={cerrarSesion}>
              Cerrar sesión
            </Button>
            <WhiteSpace />
            <Button type="primary" onClick={saludar}>
              Saludar
            </Button>
          </Card.Body>
        </Card>
        <WhiteSpace size="xl" />
      </WingBlank>
    </div>
  )
}

export default App
