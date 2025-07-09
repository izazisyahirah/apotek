import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { insertPelanggan } from '../../services/pelanggan'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nama, setNama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi tidak sama.')
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      // Tambahkan pelanggan ke tabel pelanggan
      const user = data.user
      if (user) {
        await insertPelanggan({
          id: user.id,
          email: user.email,
          nama,
          alamat,
          phone
        })
      }
      alert('Registrasi berhasil! Silakan login.')
      navigate('/login')
    }
  }

  return (
    <>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Nama</label>
          <input
            type="text"
            placeholder="Masukkan nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#2e5b56] border text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Alamat</label>
          <input
            type="text"
            placeholder="Masukkan alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#2e5b56] border text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">No. Telepon</label>
          <input
            type="text"
            placeholder="Masukkan nomor telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#2e5b56] border text-white"
            required
          />
        </div>
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