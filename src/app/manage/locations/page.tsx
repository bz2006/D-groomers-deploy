"use client"
import { Button, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {};

type Loc = {
    _id: string;
    district: string;
};

type NewLoc = {
    district: string;
};

const Locations = (props: Props) => {
    const [locations, setLocations] = useState<Loc[]>([]);
    const [newLocation, setNewLocation] = useState<NewLoc>({ district: '' });

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const res = await axios.get("/api/manage/get-locations");
            setLocations(res.data.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const addLocation = async () => {
        try {
            const res = await axios.post("/api/manage/add-location", {
                district: newLocation.district,
                genSlots: 2,
                defavslt: 5
            });
            message.success('Location added');
            fetchLocations(); 
        } catch (error) {
            console.error('Error adding location:', error);
        }
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewLocation({ ...newLocation, district: e.target.value });
    };

    return (
        <div className='p-16'>
            <div className='flex justify-center items-center'>
                <Input className='w-80 mr-9' onChange={handleLocationChange} value={newLocation.district} type='text' size='large' />
                <Button size='large' onClick={addLocation}>
                    Add Location
                </Button>
            </div>

            <div className='p-10'>
                {locations.length > 0 &&
                    locations.map((loc) => (
                        <h1 key={loc._id}>{loc.district}</h1>
                    ))}
            </div>
        </div>
    );
};

export default Locations;
