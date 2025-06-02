import React from 'react'
import { useParams } from 'react-router-dom'

export default function Productdetails() {
const paramsId = useParams().id;

  return (
    <div>Productdetails id: {paramsId}</div>
  )
}
