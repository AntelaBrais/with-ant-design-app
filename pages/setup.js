import React, { useState, useEffect } from 'react'
import firebase, { auth, provider, db } from '../firebase'

import ExList from '../components/ExList'
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

function SetupTraining() {
  const [nameExercise, setNameExercise] = useState('')
  const [sets, setSets] = useState(0)
  const [reps, setReps] = useState(0)
  const [relax, setRelax] = useState(0)
  const [items, setItems] = useState([])
  const [listaPollas, setListaPollas] = useState([])
  const [name, setName] = useState('')
  const [visibility, setVisibility] = useState(false)
  const [usuario, setUsuario] = useState('')
  const [position, setPosition] = useState(1)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(`Hola ${user.displayName}`)
        setUsuario(user)
      } else {
        console.log('No hay usuario registrado')
      }
    })
  }, [])

  function handleNameChange(e) {
    setNameExercise(e)
    console.log(`eeee: ${e}`)
  }
  function handleSetsChange(e) {
    setSets(e.toString())
  }
  function handleRepsChange(e) {
    setReps(e.toString())
  }
  function handleRelaxChange(e) {
    setRelax(e.toString())
  }

  var listaEjercicios = []
  function getData() {
    let entrenamientoRef = db
      .collection('chuches')
      .doc(usuario.uid)
      .collection('fitness')
      .doc('entrenamiento')

    entrenamientoRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let temp = doc.data().ejercicios
          console.log(doc.data().ejercicios)
          listaEjercicios = [...temp]
          setItems(listaEjercicios)
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error)
      })
  }

  function addElement() {
    if (!nameExercise.length || !sets.length || !reps.length || !relax.length) {
      return
    }
    setPosition(position + 1)
    var ejercicio = {
      id: Date.now(),
      nameExercise: nameExercise,
      sets: sets,
      reps: reps,
      relax: relax,
      position: position
    }
    let userRef = db
      .collection('chuches')
      .doc(usuario.uid)
      .collection('fitness')
      .doc('entrenamiento')

    userRef.update({
      ejercicios: firebase.firestore.FieldValue.arrayUnion({
        id: Date.now(),
        nameExercise: nameExercise,
        sets: sets,
        reps: reps,
        relax: relax
      })
    })

    setItems([...items, ejercicio])
    setNameExercise('')
    setSets(0)
    setReps(0)
    setRelax(0)
  }

  function showModal() {
    setVisibility(true)
  }
  function onClose() {
    setVisibility(false)
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
        Set up training
      </NavBar>

      <WingBlank size="lg">
        <WhiteSpace size="xl" />

        <Card>
          <Card.Header title="Ir al entrenamiento" />
          <Card.Body>
            <Button type="primary" onClick={getData}>
              Obtener datos
            </Button>
          </Card.Body>
        </Card>
        <WhiteSpace size="lg" />

        <ExList items={items} />

        <Modal
          popup
          visible={visibility}
          onClose={onClose}
          animationType="slide-up">
          <List
            renderHeader={() => <div>Añadir Ejercicio</div>}
            className="popup-list">
            <InputItem
              placeholder="Exercise name"
              value={nameExercise}
              onChange={handleNameChange}
            />
            <Item
              extra={
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  defaultValue={0}
                  max={10}
                  min={0}
                  value={sets}
                  onChange={handleSetsChange}
                />
              }>
              Número de Sets
            </Item>
            <Item
              extra={
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  defaultValue={0}
                  max={20}
                  min={0}
                  value={reps}
                  onChange={handleRepsChange}
                />
              }>
              Número de Reps.
            </Item>
            <Item
              extra={
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  defaultValue={0}
                  max={180}
                  min={0}
                  step={30}
                  value={relax}
                  onChange={handleRelaxChange}
                />
              }>
              Segundos de descanso.
            </Item>
            <Item>
              <Button
                onClick={() => {
                  addElement()
                  onClose()
                }}
                type="primary">
                Añadir ejercicio
              </Button>
            </Item>
          </List>
        </Modal>
      </WingBlank>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%'
        }}>
        <List>
          <Button
            style={{ borderRadius: 0 }}
            type="primary"
            onClick={showModal}>
            Añadir Ejercicio
          </Button>
        </List>
      </div>
    </div>
  )
}

export default SetupTraining
