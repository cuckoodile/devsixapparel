import React from 'react'
import { useParams } from 'react-router-dom';

export default function Profile() {
  const paramId = useParams().id;
  return (
    <div>Profile id: {paramId}</div>
  )
}
