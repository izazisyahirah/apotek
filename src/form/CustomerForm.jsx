import { useState } from "react";
import Alert from "./components/Alert";
import Card from "./components/Card";
import Input from "./components/Input";
import Button from "./components/Button";

export default function CustomerForm() {
    // Definisi State
    const [nama, setNama] = useState("");
    const [gender, setGender] = useState("");
    const [nomorHp, setNomorHp] = useState("");
    const [alamat, setAlamat] = useState("");

    return (
        <Card title="Formulir Pelanggan Apotek">
            <div className="mb-4">
                <Input
                    lable="Nama Pelanggan" 
                    type="text" 
                    placeholder="Masukkan nama pelanggan" 
                    onChange={(e) => setNama(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Gender</label>
                <div className="flex gap-4">
                    <label className="flex items-center">
                        <input 
                            lable="Laki-laki"
                            type="radio" 
                            name="gender" 
                            value="Laki-laki"
                            className="mr-2"
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Laki-laki
                    </label>
                    <label className="flex items-center">
                        <input 
                            type="radio" 
                            name="gender" 
                            value="Perempuan"
                            className="mr-2"
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Perempuan
                    </label>
                </div>
            </div>
            <div className="mb-4">
                <Input
                    lable="Nomor HP" 
                    type="text" 
                    placeholder="Masukkan nomor HP" 
                    onChange={(e) => setNomorHp(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <Input
                    lable="Alamat" 
                    type="text" 
                    placeholder="Masukkan alamat pelanggan" 
                    onChange={(e) => setAlamat(e.target.value)}
                />
            </div>
            {nama && gender && nomorHp && alamat ? (
                <Alert type="info" message="Data pelanggan telah dimasukkan dengan lengkap" />
            ) : (
                <Alert type="error" message="Harap isi semua data dengan benar" />
            )}
            <Button lable="Simpan Data" onClick={() => alert("Data pelanggan berhasil disimpan!")} />
        </Card>
    );
}
