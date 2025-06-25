// loaders/authLoader.js
import { useDispatch, useSelector } from 'react-redux'
import { api } from './api/apiConfig'
import { setUser } from './features/auth/authSlice'

export const authLoader = async () => {

    const authstate = useSelector((state) => state.auth.status)
    const dispatch = useDispatch()

    if (!authstate) {
        try {
            const response = await api.get('/auth/me')
            console.log(response)
            console.log(' auth loader runned')
            if (response.status === 200) {
                dispatch(setUser(response.data.user))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
