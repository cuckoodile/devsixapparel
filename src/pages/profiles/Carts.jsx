import React from 'react'
import { useParams } from 'react-router-dom'

export default function Carts() {
const paramsId = useParams().id;

  return (
    <div>Carts id: {paramsId}</div>
  )
}
