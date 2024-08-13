"use client"
import Footer from '@/app/Components/Footer'
import Header from '@/app/Components/Header'
import MypetsCard from '@/app/Components/MypetsCard'
import { message } from 'antd'
import { Button, Modal } from 'antd';
import React, { useState, useEffect } from 'react'
import ImageUpload from './imagup';
import axios from 'axios';
import TextField from '@/app/Components/Textfield';

type Props = {

}
type Pet = {
    _id: string;
    petname: string;
    dob: string;
    breed: string;
    image: string;
}

const MyPets = (props: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isdetModalOpen, setIsdetModalOpen] = useState(false);
    const [Pets, setPets] = useState<Pet[]>([]);
    const [Updateid, setUpdateid] = useState("");
    const [name, setName] = useState("");
    const [DOB, setDOB] = useState("");
    const [breed, setBreed] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [prImage, setprImage] = useState("")

    const GetUser = async () => {
        try {
            const res = await axios.get('/api/user')

            return res.data["data"]['_id'];

        } catch (error) {
            console.log(error);

        }
    }

    const GetPets = async () => {

        try {
            const id = await GetUser()
            const res = await axios.get(`/api/pets/getallpets/${id}`)
            setPets(res.data["data"])
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        GetPets()
    }, [])


    const AddPet = async () => {

        try {
            const id = await GetUser()
            console.log(image)
            const formData = new FormData();
            formData.append('userid', id);
            formData.append('petname', name);
            formData.append('dob', DOB);
            formData.append('breed', breed);
            if (image) {
                formData.append('image', image);
            }

            const res = await axios.post("/api/pets/addpet", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            CloseModel()
            GetPets()
            message.success(`${name} added successfully`)

        } catch (error) {
            console.log(error);

        }
    }

    const UpdatePet = async () => {

        try {
            const id = await GetUser()
            const newDetails = {
                petname: name,
                dob: DOB,
                breed: breed
            }
            const res = await axios.put("/api/pets/updatepet", { userid: id, upid: Updateid, newDetails: newDetails })
            ClosedetModel()
            GetPets()
            message.success(`${name} details updated successfully`)
            setName("")
            setDOB("")
            setBreed("")
        } catch (error) {
            console.log(error);

        }
    }
    const DeletePet = async () => {

        try {
            const id = await GetUser()
            const res = await axios.post("/api/pets/deletepet", { userid: id, upid: Updateid })
            ClosedetModel()
            GetPets()
            setUpdateid("")
            message.success(`${name} deleted successfully`)
        } catch (error) {
            console.log(error);

        }
    }

    const Setname = (value: string) => {
        setName(value)
    }

    const SetDOB = (value: string) => {
        setDOB(value)
    }

    const SetBreed = (value: string) => {
        setBreed(value)
    }

    const CloseModel = () => {
        setIsModalOpen(false)
        setName("")
        setDOB("")
        setBreed("")
    }
    const ClosedetModel = () => {
        setIsdetModalOpen(false)
        setprImage("")
        setName("")
        setDOB("")
        setBreed("")
        setUpdateid("")
    }

    const OpenDetails = (id: string) => {
        console.log('clicked');

        for (let det of Pets) {
            if (det._id === id) {
                setName(det.petname)
                setDOB(det.dob)
                setBreed(det.breed)
                setUpdateid(det._id)
                setprImage(det.image)
                setIsdetModalOpen(true)

            }
        }
    }

    return (
        <>
            <Header />
            <div className='flex justify-between items-center p-5 md:mr-5 mt-5 '>

                <div>
                    <h1 className='text-2xl text-black'>Your Pets</h1>
                    <p className='text-gray-400'>Manage your pets</p>
                </div>
                <Button type="primary" style={{ backgroundColor: "#9400D3" }} size='large' onClick={() => { setIsModalOpen(true) }}>
                    Add New
                </Button>
            </div>


            <Modal title="Add Your Pet" open={isModalOpen} onOk={AddPet} width={400} onCancel={CloseModel}>
                <div className='mt-2'>
                    <ImageUpload onImageChange={(file) => setImage(file)} />
                </div>

                <div className='flex items-center justify-evenly flex-col mt-7'>
                    <TextField
                        label='Name'
                        placeholder='Name'
                        value={name}
                        onChange={Setname}
                    />
                    <TextField
                        label='DOB'
                        placeholder='Date of Birth'
                        value={DOB}
                        onChange={SetDOB}
                    />
                    <TextField
                        label='Breed'
                        placeholder='Golden Retriver'
                        value={breed}
                        onChange={SetBreed}
                    />
                </div>
            </Modal>

            {/* Details Model */}
            <Modal title="Your Pet Details"
                footer={[
                    <div className='flex flex-col sm:flex-row justify-between items-center w-full' key="footer">
                        <Button
                            type="primary"
                            key="book"
                            className='mb-2 sm:mb-0'
                        >
                            Schedule Grooming
                        </Button>
                        <div className='flex space-x-2 '>
                            <Button key="submit" danger
                                onClick={DeletePet}
                            >
                                Delete
                            </Button>
                            <Button
                                key="update"
                                onClick={UpdatePet}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                ]}
                open={isdetModalOpen} width={500} onCancel={ClosedetModel}>
                <div className='mt-2'>
                    <ImageUpload onImageChange={(file) => setImage(file)} primage={prImage} />
                </div>

                <div className='flex items-center justify-evenly flex-col mt-7'>
                    <TextField
                        label='Name'
                        placeholder='Name'
                        value={name}
                        onChange={Setname}
                    />
                    <TextField
                        label='DOB'
                        placeholder='Date of Birth'
                        value={DOB}
                        onChange={SetDOB}
                    />
                    <TextField
                        label='Breed'
                        placeholder='Golden Retriver'
                        value={breed}
                        onChange={SetBreed}
                    />
                </div>
            </Modal>
            <div className=" grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
                {Pets.length > 0 && Pets.map((pet) => (
                    <div className='flex  items-center justify-center'>
                        <MypetsCard
                            key={pet._id}
                            petname={pet.petname}
                            breed={pet.breed}
                            image={pet.image}
                            onClick={() => OpenDetails(pet._id)}
                        />
                    </div>
                ))}

            </div>
            <Footer />
        </>
    )
}

export default MyPets