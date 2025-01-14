import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";

export const CreateWorkerPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const Navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        phone_number: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        try {
            const response = await axiosPrivate.post('/worker', formData);

            // Reset the form
            setFormData({
                name: '',
                gender: '',
                phone_number: '',
                email: '',
            });

            withReactContent(Swal).fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                Navigate('/pekerja');
            });

        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response?.data?.message || error.message || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        setIsLoading(false);
    }

    return (
        <>
            <div className="card mb-6">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Tambah Pekerja</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="mb-2 p-auto">
                                <label className="form-label" htmlFor="name"><b>Nama</b></label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-control" placeholder="Komang Wiguna"/>
                            </div>

                            <div className="mb-2 p-auto">
                                <label className="form-label" htmlFor="gender"><b>Jenis Kelamin</b></label>
                                <select name="gender" id="gender" value={formData.gender} onChange={handleChange} required className="form-select">
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="M">Laki-Laki</option>
                                    <option value="F">Perempuan</option>
                                </select>
                            </div>

                            <div className="mb-2 p-auto">
                                <label className="form-label" htmlFor="phone_number"><b>Nomor HP</b></label>
                                <input type="number" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required className="form-control" placeholder="08xxxxxxxxxx"/>
                            </div>

                            <div className="mb-2 p-auto">
                                <label className="form-label" htmlFor="email"><b>Email</b></label>
                                <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required placeholder="peternak@gmail.com"/>
                            </div>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            {
                                isLoading ? (
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : <button type="submit" className="btn btn-primary" >Tambah</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

