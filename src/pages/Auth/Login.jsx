import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { getPelangganById } from '../../services/pelanggan'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) setError('Email atau password salah.')
    else {
      // Ambil data pelanggan
      const user = data.user
      if (user) {
        const { data: pelanggan, error: pelangganError } = await getPelangganById(user.id)
        // Anda bisa simpan pelanggan ke context/state jika perlu
      }
      alert('Login berhasil!')
      navigate('/')
    }
  }

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#2e5b56] border text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#2e5b56] border text-white"
            required
          />
        </div>
        {error && <p className="text-red-300 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#69d5c3] hover:bg-[#5cc0b0] text-[#1f3f3b] font-semibold py-2 rounded-lg transition"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-300 text-center">
        Belum punya akun?{' '}
        <button onClick={() => navigate('/register')} className="text-[#69d5c3] hover:underline">
          Daftar sekarang
        </button>
      </div>
    </>
  )
}