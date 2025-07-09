import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi tidak sama.')
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      alert('Registrasi berhasil! Silakan login.')
      navigate('/login')
    }
  }

  return (
    <>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            placeholder="Masukkan email"
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
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#2e5b56] border text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Konfirmasi Password</label>
          <input
            type="password"
            placeholder="Ulangi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#2e5b56] border text-white"
            required
          />
        </div>

        {error && <p className="text-red-300 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#69d5c3] hover:bg-[#5cc0b0] text-[#1f3f3b] font-semibold py-2 rounded-lg transition"
        >
          Register Account
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-300 text-center">
        Sudah punya akun?{' '}
        <button onClick={() => navigate('/login')} className="text-[#69d5c3] hover:underline">
          Login sekarang
        </button>
      </div>
    </>
  )
}