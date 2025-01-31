import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router/router.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/Store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
