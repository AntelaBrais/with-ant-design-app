import React, { Fragment } from 'react'
import { List, WingBlank, WhiteSpace, InputItem, Card } from 'antd-mobile'

function ExList(props) {
  return (
    <>
      {props.items.map((item, index) => (
        <Fragment key={item.id}>
          <Card>
            <Card.Header title={<h2>{item.nameExercise}</h2>} />
            <Card.Body>
              <div>
                <h2>Sets: {item.sets}</h2>
                <h2>Reps: {item.reps}</h2>
                <h2>Rest: {item.relax} s/set</h2>
              </div>
            </Card.Body>
          </Card>
          <WhiteSpace size="lg" />
        </Fragment>
      ))}
    </>
  )
}

export default ExList
