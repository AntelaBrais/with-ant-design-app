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

            // hacerCosasConItems()
            // Con esa función haré cosas guay. Mira la declaración de la función para más info.
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
    document.getElementById('exercise').innerHTML = items[0].nameExercise
    document.getElementById('setField').innerHTML = `Set: ${items[0].sets}`
    document.getElementById('repField').innerHTML = `Reps: ${items[0].reps}`
    console.log(items)
  }

  function hacerCosasConItems() {
    // Aquí haré la manipulación que escribí en los papeles el viernes en la oficina
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
          Set: X
        </h2>
        <h2 style={{ textAlign: 'center' }} id="repField">
          Reps: Y
        </h2>
        <WhiteSpace size="lg" />
      </WingBlank>
      <WingBlank size="lg">
        <WingBlank size="lg">
          <WingBlank size="lg">
            <WingBlank size="lg">
              <Button style={{ borderRadius: 100 }} type="primary">
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
