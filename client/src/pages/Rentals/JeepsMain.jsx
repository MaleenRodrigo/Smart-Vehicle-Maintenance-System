import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'



import Image23 from '../../assets/RentalsImages/Jeeps/black-jeep-grand-cherokee.png'
import Image24 from '../../assets/RentalsImages/Jeeps/landcruiser.png'
import Image25 from '../../assets/RentalsImages/Jeeps/prado VX.png'
import Image26 from '../../assets/RentalsImages/Jeeps/jeep.png'
import Image27 from '../../assets/RentalsImages/Jeeps/Toyota-Land-Cruiser-Prado2.png'
import Image28 from '../../assets/RentalsImages/Jeeps/jeep_offroad.png'




const ImageList23 = [
    {
        id: 23,
        href: "#",
        title: "Vehicle Model - black-jeep-grand-cherokee",
        color: "Color - White",
        price: "Distance Price - 100km/Rs:5600/=",
        passengers: "Eight (08)"
    },
]
const ImageList24 = [
    {
        id: 24,
        href: "#",
        title: "Vehicle Model - landcruiser",
        color: "Color - Baige",
        price: "Distance Price - 200km/Rs:3000/=",
        passengers: "Eight (08)"
    },

]
const ImageList25 = [
    {
        id: 25,
        href: "#",
        title: "Vehicle Model - prado VX",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Eight (08)"
    },

]
const ImageList26 = [
    {
        id: 26,
        href: "#",
        title: "Vehicle Model - jeep",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Eight (08)"
    },

]
const ImageList27 = [
    {
        id: 27,
        href: "#",
        title: "Vehicle Model - Toyota-Land-Cruiser-Prado2",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Eight (08)"
    },

]
const ImageList28 = [
    {
        id: 28,
        href: "#",
        title: "Vehicle Model - jeep_offroad",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Ten (10)"
    },

]


export const JeepsMain = () => {
    return (
        <>
        <Navbar />
            <div className="container mx-auto">

                
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className=' mt-10 h-10 px-8 flex justify-between'>
                            <a
                                href="../../NewVehicleForm"
                                className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                            >
                                Add a New Vehicle
                            </a>
                        </div>

                        <div className=' mt-5 flex gap-3 justify-between'>
                            <div className=" mt-5 flex ">
                                {ImageList23.map((J1) => (
                                    <div key={J1.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image23}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={J1.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {J1.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{J1.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{J1.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{J1.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        href="../../jeepsdetails"
                                                        className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                                                    >
                                                        Make Changes Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div>

                                </div>

                            </div>
                            {/* Vehicle number 2 */}
                            <div className="mt-5 flex  ">

                                {ImageList24.map((J2) => (
                                    <div key={J2.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image24}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={J2.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {J2.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{J2.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{J2.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{J2.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        // href="../../CarsMain"
                                                        className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                                                    >
                                                        Make Changes Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            {/* Vehicle number 3 */}
                            <div className="mt-5 flex  ">

                                {ImageList25.map((J3) => (
                                    <div key={J3.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image25}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={J3.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {J3.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{J3.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{J3.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{J3.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        // href="../../CarsMain"
                                                        className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                                                    >
                                                        Make Changes Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>


                        </div>
                        {/* Vehicle number 4 */}
                        <div>
                            <div className='mt-5 flex gap-3 justify-between'>
                                <div className=" mt-5 flex ">

                                {ImageList26.map((J4) => (
                                    <div key={J4.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image26}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={J4.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {J4.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{J4.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{J4.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{J4.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        // href="../../CarsMain"
                                                        className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                                                    >
                                                        Make Changes Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                </div>
                                <div className="mt-5 flex  ">

                                {ImageList27.map((J5) => (
                                    <div key={J5.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image27}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={J5.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {J5.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{J5.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{J5.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{J5.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        // href="../../CarsMain"
                                                        className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                                                    >
                                                        Make Changes Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                </div>
                                <div className="mt-5 flex  ">

                                {ImageList28.map((J6) => (
                                    <div key={J6.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image28}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={J6.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {J6.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{J6.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{J6.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{J6.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        // href="../../CarsMain"
                                                        className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                                                    >
                                                        Make Changes Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                </div>
                                <div className="mt-5 flex  ">

                                

                                </div>


                            </div>


                        </div>



                    </div>

                </div>
            </div>
            <Footer />
        </>

    )
}

