import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { MainContext } from '../context/context'
import AdminBody from './AdComponents/AdminBody'
import Header from './AdComponents/Header'
import AdFooter from './AdFooter'

const AdMDashBoard = () => {


  return (
    <div>
        <Header />
        <AdminBody />
        <AdFooter />
    </div>
  )
}

export default AdMDashBoard