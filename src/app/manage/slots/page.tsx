"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Button, Select, Collapse, Modal, TimePicker } from "antd"
import type { CollapseProps } from 'antd';

type Props = {}

type Loc = {
  value: string;
  label: string;
};

type GroomingSlot = {
  _id: string;
  district: string;
  monthlyslots: MonthlySlot[];
};

type MonthlySlot = {
  time?: any;
  _id: string;
  dayname?: string;
  day?: number;
  month?: string;
  available?: boolean;
  year?: number;
  slots?: Slot[];
};

type Slot = {
  _id: string;
  day: number;
  dayname: string;
  available: boolean;
  time: Time[];
};

type Time = {
  _id: string;
  time: string;
  available: boolean;
};

const Slots = (props: Props) => {

  const [locations, setLocations] = useState<Loc[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<GroomingSlot | null>(null);
  const [selectedSlot, setselectedSlot] = useState<MonthlySlot | null>(null);
  const [selectedMid, setSelectedMonthid] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (slot: any, monthId: string) => {
    setIsModalOpen(true);
    console.log(slot);
    setSelectedMonthid(monthId)
    setselectedSlot(slot);

  };
  console.log(selectedMid);

  const handleOk = async () => {
    setIsModalOpen(false);


    try {
      const res = await axios.put("/api/manage/update-slots",
        { locid: selectedLocation?._id, selectedMid: selectedMid, slotid: selectedSlot?._id, NewSlots: selectedSlot })
      GetSingleLoc(selectedLocation?.district)
    } catch (error) {
      console.log(error);
    }

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const fetchLocations = async () => {
    try {
      const res = await axios.get("/api/manage/get-locations");
      setLocations(res.data.data.map((loc: { _id: string; district: string }) => ({ value: loc._id, label: loc.district })));
      console.log(res.data.data)
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const GetSingleLoc = async (loc?: string) => {
    try {
      let location = loc ? loc : selectedLocation

      const res = await axios.get(`/api/manage/get-singlelocation/${location}`);
      setSelectedLocation(res.data.data);
      console.log(res.data.data)


    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const SelectNew = (id: string, value: boolean) => {
    setselectedSlot(prevSlot => {
      if (!prevSlot) return prevSlot; // Ensure we have a slot selected

      // Create a new slot object with updated time array
      const updatedTime = prevSlot.time.map((slot: { _id: string; }) =>
        slot._id === id ? { ...slot, available: value } : slot
      );

      // Return new state with updated time array
      return { ...prevSlot, time: updatedTime };
    });

  }

  const ChangeSlotav = (value: boolean) => {
    // @ts-ignore
    setselectedSlot({
      ...selectedSlot,
      available: value
    });

  }

  const DeleteTS = (id: string) => {
    setselectedSlot(prevSlot => {
      if (!prevSlot) return prevSlot; // Ensure we have a slot selected

      // Filter out the slot with the matching id
      const updatedTime = prevSlot.time.filter((slot: { _id: string; }) => slot._id !== id);

      // Return new state with updated time array
      return { ...prevSlot, time: updatedTime };
    });
  };



  const AddTime = (time: any, timeString: any) => {
    console.log(time, timeString);

    if (timeString) {
      // @ts-ignore
      setselectedSlot({
        ...selectedSlot,
        time: [...selectedSlot?.time, { time: timeString.toUpperCase(), available: true }]
      })
    }


  }


  console.log(selectedSlot)
  console.log(selectedLocation)

  useEffect(() => {
    fetchLocations();
  }, []);

  const items: CollapseProps['items'] = selectedLocation?.monthlyslots?.map((monthlySlot, index) => ({
    key: `${index}`,
    label: `${monthlySlot.month} ${monthlySlot.year}`,
    children: (
      <div key={index} >
        <h2 className='text-xl pb-3'>{monthlySlot.month} {monthlySlot.year}</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-x-1 gap-y-5'>
          {monthlySlot.slots?.map((slot, slotIndex) => {
            const availableTimeCount = slot.time?.filter(time => time.available).length;
            return (
              <div key={slotIndex} onClick={() => { showModal(slot, monthlySlot._id) }} className='flex flex-col p-5 bg-black w-40 items-center justify-center rounded-md text-white hover:cursor-pointer'>
                <h1>{slot.dayname}, {slot.day}</h1>
                <div className='flex flex-row justify-center items-center mt-2'>
                  <h1 className={`${availableTimeCount <= 2 ? "text-red-700" : "text-green-700"} text-md font-extrabold flex mr-2`}>O</h1>
                  <h1>{availableTimeCount} Slots</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
  })) || [];



  return (
    <div>

      <div className='flex p-20'>

        <Select
          showSearch
          style={{ width: 200, marginRight: '5%' }}
          size="large"
          placeholder="Search to Select"
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
            setSelectedLocation(option.label);
          }}
        >
          {locations.map((loc) => (
            <Select.Option key={loc.value} value={loc.value} label={loc.label}>
              {loc.label}
            </Select.Option>
          ))}
        </Select>

        <Button onClick={() => GetSingleLoc(selectedLocation?.district)}>Fetch</Button>

      </div>

      <div>
        <h1 className={`text-2xl pb-5 p-10 text-white ${selectedLocation ? "block" : "hidden"}`}>Location: {selectedLocation?.district}</h1>
      </div>

      <div className='p-10'>
        <Collapse items={items} />

      </div>

      <Modal title={`${selectedSlot?.dayname}, ${selectedSlot?.day}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

        <div>

          <div className='p-5 text-2xl pb-0'>
            Slot Availability
            <div className='pt-2'>
              <hr className='w-96' />
            </div>
          </div>


          <div className='p-5'>
            <button
              onClick={() => { ChangeSlotav(selectedSlot?.available === true ? false : true) }}
              className={`${selectedSlot?.available === true ? "bg-violet-600 text-white" : "bg-white-500 text-black"}  border border-black  font-bold py-2 px-4 mr-5 rounded-md`}>
              Available
            </button>

            <button
              onClick={() => { ChangeSlotav(selectedSlot?.available === true ? false : true) }}
              className={`${selectedSlot?.available === false ? "bg-violet-600 text-white" : "bg-white-500 text-black"} border border-black   font-bold py-2 px-4 rounded-md`}>
              Not Available
            </button>

          </div>

        </div>



        <div>
          <div className='p-5 text-2xl pb-0'>
            Time Slots
            <div className='pt-2'>
              <hr className='w-96' />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-5 p-5'>
            {selectedSlot?.time.map((t: { _id: string, available: boolean; time: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
              <div
                onClick={() => { SelectNew(t._id, t.available === true ? false : true) }}
                className={`${t.available === true ? "bg-violet-600 text-white font-bold" : "bg-white font-bold"} p-2 items-center justify-center flex min-w-10 border rounded-md border-black hover:cursor-pointer relative`}
                key={t._id}
              >
                <span
                  className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 px-1 bg-red-500 text-white rounded-full hover:bg-red-700 cursor-pointer text-xs"
                  onClick={() => DeleteTS(t._id)}
                >
                  &times;
                </span>
                {t.time}
              </div>
            ))}
            <TimePicker use12Hours size='large' onChange={AddTime} format="h:mm a" />
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default Slots