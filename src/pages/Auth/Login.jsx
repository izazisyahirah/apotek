import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { getPelangganById } from '../../services/pelanggan'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email atau password salah.')
    } else {
      const user = data.user
      if (user) {
        await getPelangganById(user.id)
      }
      setModalMessage("Login berhasil! Anda akan diarahkan...")
      setShowModal(true)

      setTimeout(() => {
        setShowModal(false)
        navigate('/')
      }, 2000)
    }
  }

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        <div>
          <label className="block mb-1 text-sm text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-darkgreen text-white font-semibold py-2 rounded-lg transition"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-sm text-white text-center">
        Belum punya akun?{' '}
        <button onClick={() => navigate('/register')} className="text-green-200 hover:underline">
          Daftar sekarang
        </button>
      </div>

      {/* Modal Notifikasi */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl px-8 py-6 w-[90%] max-w-sm text-center animate-fade-in">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
              ✅
            </div>
            <h3 className="text-green-700 text-xl font-bold mb-2">Login Berhasil</h3>
            <p className="text-gray-700 text-sm">{modalMessage}</p>
          </div>
        </div>
      )}
    </>
  )
}