import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useMutationEffect,
  useRef
} from 'react'
import firebase, { auth, provider, db } from '../firebase'
import {
  Button,
  NavBar,
  Icon,
  List,
  Stepper,
  WingBlank,
  WhiteSpace,
  InputItem,
  Modal,
  Card
} from 'antd-mobile'
import Link from 'next/link'
import Router from 'next/router'

const Item = List.Item

function Play() {
  const [items, setItems] = useState([])
  const [usuario, setUsuario] = useState('')
  let exerciseRef = useRef()

  var listaEjercicios = []
  var contador = 0

  useLayoutEffect(() => {
    var user = firebase.auth().currentUser

    if (user) {
      // User is signed in.
      console.log(`Hola ${user.displayName}`)
      setUsuario(user)
      var entrenamientoRef = db
        .collection('chuches')
        .doc(user.uid)
        .collection('fitness')
        .doc('entrenamiento')
      entrenamientoRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            let temp = doc.data().ejercicios
            listaEjercicios = [...temp]
            setItems(listaEjercicios)
          } else {
            console.log('No such document!')
          }
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
    } else {
      // No user is signed in.
      console.log('No hay ususario')
    }
  }, [])

  console.log('C' + items)

  if (Array.isArray(items) && items.length) {
    var topSetMax = 0
    var i = 0
    var contadorSets = 1
    var numeroEjercicios = items.length - 1

    // Primera impresión. Acciones a realizar en cuanto obtengo los datos de entrenamiento.
    console.log(i)
    console.log(items)

    populateView()
  }

  function populateView() {
    topSetMax = items[i].sets // Asigno el número máximo de sets de ese ejercicio.
    console.log('Mi i es:' + i)
    console.log(items.length)

    document.getElementById('exercise').innerHTML = items[i].nameExercise
    document.getElementById('setField').innerHTML = `Set: ${contadorSets}`
    document.getElementById('repField').innerHTML = `Reps: ${items[i].reps}`
    console.log(items)
  }

  function pressAction() {
    if (Array.isArray(items) && items.length) {
      let relaxCounter = items[i].relax
      document.getElementById('buttonAction').disabled = true
      var myCountdown = setInterval(function() {
        if (relaxCounter > 0) {
          document.getElementById('buttonAction').innerHTML = relaxCounter
          console.log(relaxCounter)
          relaxCounter--
        } else if (relaxCounter === 0) {
          document.getElementById('buttonAction').innerHTML = 'Descanso'
          document.getElementById('buttonAction').disabled = false

          if (contadorSets == topSetMax) {
            console.log(i)
            console.log(items.length)
            if (i == numeroEjercicios) {
              Router.push('/')
              clearInterval(myCountdown)
            } else if (i < numeroEjercicios) {
              i += 1
              contadorSets = 1
              populateView()
              clearInterval(myCountdown)
            }
          } else if (contadorSets < topSetMax) {
            contadorSets += 1
            populateView()
            clearInterval(myCountdown)
          }
        }
      }, 1000)
    }
  }

  return (
    <div>
      <NavBar
        mode="light"
        icon={
          <Link href="/">
            <Icon type="left" />
          </Link>
        }
        onLeftClick={() => {}}
        rightContent={[<Icon key="0" type="ellipsis" />]}>
        Playing
      </NavBar>

      <WingBlank size="lg">
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />

        <h1 style={{ textAlign: 'center' }} id="exercise">
          W
        </h1>
        <h2 style={{ textAlign: 'center' }} id="setField">
          Set:
        </h2>
        <h2 style={{ textAlign: 'center' }} id="repField">
          Reps:
        </h2>
        <WhiteSpace size="lg" />
      </WingBlank>
      <WingBlank size="lg">
        <WingBlank size="lg">
          <WingBlank size="lg">
            <WingBlank size="lg">
              <Button
                id="buttonAction"
                style={{ borderRadius: 100 }}
                type="primary"
                onClick={pressAction}>
                Descanso
              </Button>
            </WingBlank>
          </WingBlank>
        </WingBlank>
      </WingBlank>
    </div>
  )
}

export default Play
