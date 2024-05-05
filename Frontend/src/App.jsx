import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  // const [products, error, loading] = customReactQuery('/api/products')

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('');

  useEffect(() => {

    const controller = new AbortController()

      ; (async () => {
        try {
          setLoading(true)

          // the controller will control the unusual api request
          const response = await axios.get(`/api/products?search=${search}`, {
            signal: controller.signal
          })
          console.log(response);
          setProducts(response.data)
          setLoading(false)
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('request canceled ', error.message);
            return
          }
          setError(true)
          setLoading(false)
        }
      }
      )()

    // cleanup code
    return () => {
      controller.abort()
    }
  }
    // since the dependency is now at search so on every letter the useEffect will execute and which will cause performance issues
    , [search])

  return (
    <div>
      {loading && <div className='text-6xl'>Loading...</div>}

      {
        error ? <div className='text-5xl'>something went wrong</div> : <div className='h-screen w-screen bg-zinc-900 text-white'>
          No of products are {products.length}
          <input type="search" onChange={(e) => setSearch(e.target.value)} className='border-zinc-400 block bg-transparent border' />
        </div>
      }
    </div>
  )
}

export default App

function customReactQuery(urlPath) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    ; (async () => {
      try {
        setLoading(true)
        const response = await axios.get(urlPath)
        console.log(response);
        setProducts(response.data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    )()
  }
    , [])

  return [products,
    error,
    loading
  ]
}