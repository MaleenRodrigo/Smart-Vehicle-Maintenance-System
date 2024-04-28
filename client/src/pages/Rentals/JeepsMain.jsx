import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';


function JeepsMain() {
    const [rentals, setRentals] = useState([]);
    const url = 'http://localhost:5000';
    const [token, setToken] = useState('');

    const fetchJeeps = async () => {
        try {
            const response = await axios.get(url + "/api/rentalVehicles");
            const jeeps = response.data.filter(vehicle => vehicle.vehiclecategory === 'car');
            // console.log(jeeps)
            return jeeps;
        } catch (error) {
            console.error('Error fetching jeeps:', error.message);
            return [];
        }
    };

    useEffect(() => {
        async function loadData() {
            const jeeps = await fetchJeeps();
            setRentals(jeeps);
            // console.log(rentals)
        }

        loadData();
    }, []);


    return (
        <>
            <Navbar />
            <div className="container mx-auto">


                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className=' mt-10 h-10 px-8 flex justify-between'>
                            <a
                                href="#"
                                className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                            >
                                Add a New Vehicle
                            </a>
                        </div>

                        <div className=' mt-5 flex gap-3 justify-between'>
                            <div className=" mt-5 flex ">
                                {rentals && rentals.map((jeep) => (
                                    <div key={jeep.id} className="group ">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={jeep.url}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={jeep.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {jeep.vehiclemodel}
                                                    </a>
                                                </div>
                                                {/* <div className="mt-1 text-sm font-medium text-gray-900">{jeep.color}</div> */}
                                                <div className=" text-sm font-medium text-gray-900">{jeep.distance}</div>
                                                <div className=" text-sm font-medium text-gray-900">{jeep.passengersno}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        href="../../jeepsdetails"
                                                        className="inline-block rounded-md border border-transparent bg-blue-700 px-7 py-1 text-justify font-semibold text-white hover:bg-blue-800"
                                                    >
                                                        Change Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}



                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <Footer />
        </>

    )
}

export default JeepsMain;