
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { Button, Modal, Input, message, Select } from 'antd';
import axios from 'axios';
import AdrsSkeleton from './AdrsSkeleton';

type Props = {}
interface NewAddress {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
}

type Address = {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
}

type Sel = {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
}

type Loc = {
    value: string;
    label: string;
};

type bg = {
    adrsid: string;
}
const AddressStep = (props: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedbg, setselectedbg] = useState<bg>({
        adrsid: "",
    });
    const [iseditModalOpen, setiseditModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [Alladdress, setallAdrs] = useState<Address[]>([])
    const [locations, setLocations] = useState<Loc[]>([]);
    const [selectedaddress, setSelectedadrs] = useState<Sel[]>([{
        _id: "",
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pin: "",
        phone: ""
    }]);
    const [NewAddress, setNewAddresss] = useState<NewAddress>({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pin: "",
        phone: ""
    });

    const { name, address, city, state, country, pin } = NewAddress;
    console.log({ name, address, city, state, country, pin });

    const GetUser = async () => {
        try {
            const res = await axios.get('/api/user')

            return res.data["data"]['_id'];

        } catch (error) {
            console.log(error);

        }
    }



    const AddAdress = async () => {

        try {
            const id = await GetUser()
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/address/newaddress`, { userid: id, NewAddress: NewAddress })
            handleCancel()
            GetAddress()
            message.success('Address added successfully')

        } catch (error) {
            console.log(error);

        }
    }

    const GetAddress = async () => {

        try {
            const id = await GetUser()
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/address/getalladdress/${id}`)
            setallAdrs(res.data["data"])
            setLoading(false)
        } catch (error) {
            console.log(error);

        }
    }

    const UpdateInit = (adrs: any) => {
        console.log(adrs);
        setSelectedadrs([{
            _id: adrs._id,
            name: adrs.name || "",
            address: adrs.address || "",
            city: adrs.city || "",
            state: adrs.state || "",
            country: adrs.country || "",
            pin: adrs.pin || "",
            phone: adrs.phone || ""
        }]);
    }

    const UpdateAddress = async () => {

        try {
            const id = await GetUser()
            const adid = selectedaddress[0]._id;
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/user/address/updateaddress`, { userid: id, adid: adid, newAddress: selectedaddress })
            handleeditCancel()
            GetAddress()
            message.success("Address updated successfully")
            // setName("")
            // setDOB("")
            // setBreed("")
        } catch (error) {
            console.log(error);

        }
    }

    const fetchLocations = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/manage/get-locations`);
            setLocations(res.data.data.map((loc: { _id: string; district: string }) => ({ value: loc._id, label: loc.district })));
            console.log(res.data.data)
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    useEffect(() => {
        setLoading(true)
        GetAddress()
    }, [])

    const SelectAddress = (adrs: Sel, id: string) => {
        setselectedbg({ ...selectedbg, adrsid: id });
        localStorage.setItem("_dgBkADRS", JSON.stringify(adrs));

    }

    useEffect(() => {
        const adrs = localStorage.getItem("_dgBkADRS");
        const address = adrs ? JSON.parse(adrs) : null;
        if (address) {
            setselectedbg({
                adrsid: address._id
            })
        }
    }, [])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewAddresss(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedadrs(prevState => prevState.map((address, index) => index === 0 ? { ...address, [name]: value } : address));
    };

    const handleSelectChange = (value: string, option: any) => {
        setSelectedadrs(prevState =>
            prevState.map((address, index) =>
                index === 0 ? { ...address, city: option.label } : address
            )
        );
    };

    const showModal = () => {
        fetchLocations()
        setIsModalOpen(true);
    };

    const showeditModal = () => {
        fetchLocations()
        setiseditModalOpen(true);
    };

    const handleeditCancel = () => {
        setiseditModalOpen(false);
    };

    const handleOk = () => {
        AddAdress()
        setIsModalOpen(false);
    };

    const handleeditOk = () => {
        UpdateAddress()
        handleeditCancel
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setNewAddresss({
            name: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pin: "",
            phone: ""
        });
    };

    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -300, // Adjust the value as needed
                behavior: 'smooth',
            });
        }
    };
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300, // Adjust the value as needed
                behavior: 'smooth',
            });
        }
    };


    return (
        <div>
            <div className='sm:block md:hidden items-center justify-center'>
                {/* Sm Address */}
                <div className='flex px-5 items-start justify-start'>
                    <h1 className='text-xl text-black mt-2'>ADDRESS</h1>
                </div>

                {loading === false ? (
                    <div className='flex mt-1 items-center justify-center w-full md:mb-20'>
                        <div className="grid grid-cols-1 gap-5 p-2 w-full items-center">
                            <button onClick={showModal} className="bg-white text-black px-4 py-3 rounded-md border border-gray-300 shadow-lg hover:bg-gray-300">
                                Add New
                            </button>
                            {Alladdress?.length > 0 ? (
                                Alladdress.map((adrs) => (
                                    <div
                                        key={adrs._id}
                                        className={`flex ${selectedbg.adrsid === adrs._id ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-black'} rounded-md border border-gray-300 shadow-lg justify-between p-5 w-full hover:cursor-pointer`}
                                        onClick={() => SelectAddress(adrs, adrs._id)}
                                    >
                                        <div className='mr-12'>
                                            <p>{adrs.name}<br />{adrs.address}<br />{adrs.phone}</p>
                                        </div>
                                        <div className='flex items-center justify-center'>
                                            <button onClick={(e) => { e.stopPropagation(); UpdateInit(adrs); showeditModal(); }} className="bg-gray-200 text-black p-1 px-3">
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                               <div className='flex items-center justify-center'>
                                <h1>No address found, Please add new one</h1>
                               </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='mt-7 items-center justify-center'>
                        <div className="grid grid-cols-1 gap-5 p-2 w-full items-center">
                            <AdrsSkeleton />
                            <AdrsSkeleton />
                            <AdrsSkeleton />
                            <AdrsSkeleton />
                        </div>
                    </div>
                )}
            </div>





            <div className='hidden md:block'>{/* Md Address */}
                <div className='flex items-center justify-between  mb-5 '>
                    <h1 className='font-medium text-xl'>Address</h1>
                    <div className='flex pr-2'>

                        <button
                            onClick={showModal}
                            className="className='hidden hover:bg-slate-100 md:block bg-white px-3 py-1 mr-2  text-black rounded-md border border-gray-300 shadow-lg'
">                                    Add New
                        </button>
                        <button
                            className='hidden hover:bg-slate-100 md:block bg-white px-3 py-1 mr-2 font-bold text-black rounded-md border border-gray-300 '
                            onClick={scrollLeft}
                        >&lt;</button>
                        <button
                            className='hidden md:block hover:bg-slate-100 bg-white px-3 py-1 mr-2 font-bold text-black rounded-md border border-gray-300 '
                            onClick={scrollRight}
                        >&gt;</button>
                    </div>
                </div>

                <div className='flex space-x-3 overflow-x-scroll CBhide-scrollbar' ref={scrollRef}>
                    {loading === false ? (
                        Alladdress?.length > 0 ? (
                            Alladdress.map((adrs) => (
                                <div
                                    key={adrs._id}
                                    className={`flex hover:cursor-pointer ${selectedbg.adrsid === adrs._id ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-black'} rounded-md border border-gray-300 shadow-lg p-5`}
                                    onClick={() => SelectAddress(adrs, adrs._id)}
                                >
                                    <div className='mr-5'>
                                        <p>{adrs.name.split(' ')[0]}<br />{adrs.address.slice(0, 15)}....<br />{adrs.phone}</p>
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); UpdateInit(adrs); showeditModal(); }}
                                            className="bg-gray-200 rounded-md text-black p-1 px-3"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='flex items-center justify-center'>
            <h1>No address found, Please add new one</h1>
                           </div>
                        )
                    ) : (
                        <>
                            <AdrsSkeleton />
                            <AdrsSkeleton />
                            <AdrsSkeleton />
                            <AdrsSkeleton />
                        </>
                    )}
                </div>


            </div>



            {/* Add new Address */}

            <Modal title="Add New Address" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <Input placeholder="Name" name='name' value={NewAddress.name} onChange={handleChange} size='large' className='mb-5 border border-gray-400 h-fit rounded-[0.300rem]' />
                <Input placeholder="Address" maxLength={25} name='address' value={NewAddress.address} onChange={handleChange} size='large' className='mb-5 border border-gray-400 h-fit rounded-[0.300rem]' />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        size="large"
                        className='border border-gray-400 h-fit rounded-[0.300rem]'
                        placeholder="City / District"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                            typeof optionA?.label === 'string' && typeof optionB?.label === 'string'
                                ? optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())
                                : 0
                        }
                        onChange={(value, option: any) => {
                            setNewAddresss(prevFormData => ({
                                ...prevFormData,
                                location: option.label
                            }));
                        }}
                    >
                        {locations.map((loc) => (
                            <Select.Option key={loc.value} value={loc.value} label={loc.label}>
                                {loc.label}
                            </Select.Option>
                        ))}
                    </Select>
                    <Input placeholder="State" name='state' value={NewAddress.state} onChange={handleChange} className='border border-gray-400 h-fit rounded-[0.300rem]' size='large' />
                    <Input placeholder="Country" name='country' value={NewAddress.country} onChange={handleChange} className='border border-gray-400 h-fit rounded-[0.300rem]' size='large' />
                    <Input placeholder="Pincode" name='pin' value={NewAddress.pin} onChange={handleChange} className='border border-gray-400 h-fit rounded-[0.300rem]' size='large' />
                    <Input placeholder="Phone Number" name='phone' value={NewAddress.phone} onChange={handleChange} className='border border-gray-400 h-fit rounded-[0.300rem]' size='large' />
                </div>
            </Modal >

            {/* Edit Address */}

            <Modal title="Edit Address" open={iseditModalOpen} onOk={handleeditOk} onCancel={handleeditCancel}>
                <Input placeholder="Name" size='large' name='name' value={selectedaddress[0]?.name} onChange={handleUpdateChange} className='mb-5 border border-gray-400 h-fit rounded-[0.300rem]' />
                <Input placeholder="Address" size='large' name='address' value={selectedaddress[0]?.address} onChange={handleUpdateChange} className='mb-5 border border-gray-400 h-fit rounded-[0.300rem]' />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        size="large"
                        className='border border-gray-400 h-fit rounded-[0.300rem]'
                        value={selectedaddress[0]?.city}
                        placeholder="City / District"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                            typeof optionA?.label === 'string' && typeof optionB?.label === 'string'
                                ? optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())
                                : 0
                        }
                        onChange={handleSelectChange}
                    >
                        {locations.map((loc) => (
                            <Select.Option key={loc.value} value={loc.value} label={loc.label}>
                                {loc.label}
                            </Select.Option>
                        ))}
                    </Select>
                    {/* <Input placeholder="City" size='large' name='city' value={selectedaddress[0]?.city} onChange={handleUpdateChange} /> */}
                    <Input placeholder="State" size='large' name='state' className='border border-gray-400 h-fit rounded-[0.300rem]' value={selectedaddress[0]?.state} onChange={handleUpdateChange} />
                    <Input placeholder="Country" size='large' name='country' className='border border-gray-400 h-fit rounded-[0.300rem]' value={selectedaddress[0]?.country} onChange={handleUpdateChange} />
                    <Input placeholder="Pincode" size='large' name='pin' className='border border-gray-400 h-fit rounded-[0.300rem]' value={selectedaddress[0]?.pin} onChange={handleUpdateChange} />
                    <Input placeholder="Phone Number " size='large' name='phone' className='border border-gray-400 h-fit rounded-[0.300rem]' value={selectedaddress[0]?.phone} onChange={handleUpdateChange} />
                </div>

            </Modal >


        </div >
    )
}

export default AddressStep