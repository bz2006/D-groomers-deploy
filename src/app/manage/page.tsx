import { Button } from 'antd'
import React from 'react'


type Props = {}

const Manage = (props: Props) => {
  return (
    <div>
        <Button href='/manage/locations'>Locations</Button>
        <Button href='/manage/slots'>Slots</Button>
    </div>
  )
}

export default Manage