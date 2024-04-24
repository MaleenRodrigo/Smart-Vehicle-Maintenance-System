import React from 'react'
import Navbar from '../../components/Navbar'



import Image10 from '../../assets/RentalsImages/Cars/premio.png'
import Image11 from '../../assets/RentalsImages/Cars/WagonR.png'
import Image12 from '../../assets/RentalsImages/Cars/bmw1.png'
import Image13 from '../../assets/RentalsImages/Cars/Axio.png'
import Image14 from '../../assets/RentalsImages/Cars/WagonR2.png'
import Image15 from '../../assets/RentalsImages/Cars/BMW2.png'
import Image16 from '../../assets/RentalsImages/Cars/Axio2.png'


const ImageList1 = [
    {
        id: 10,
        href: "../../pages/Rentals/CarsDetails",
        title: "Vehicle Model - Premio",
        color: "Color - White",
        price: "Distance Price - 100km/Rs:3500/=",
        passengers: "Four (04)"
    },
]
const ImageList2 = [
    {
        id: 11,
        href: "#",
        title: "Vehicle Model - WagonR",
        color: "Color - Baige",
        price: "Distance Price - 200km/Rs:3000/=",
        passengers: "Four (04)"
    },

]
const ImageList3 = [
    {
        id: 12,
        href: "#",
        title: "Vehicle Model - BMW",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Four (04)"
    },

]
const ImageList4 = [
    {
        id: 13,
        href: "#",
        title: "Vehicle Model - BMW",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Four (04)"
    },

]
const ImageList5 = [
    {
        id: 14,
        href: "#",
        title: "Vehicle Model - BMW",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Four (04)"
    },

]
const ImageList6 = [
    {
        id: 15,
        href: "#",
        title: "Vehicle Model - BMW",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Four (04)"
    },

]
const ImageList7 = [
    {
        id: 16,
        href: "#",
        title: "Vehicle Model - BMW",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Four (04)"
    },

]

export const CarsMain = () => {
    return (
        <>
            <div className="container mx-auto">

                <Navbar />
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
                                {ImageList1.map((Car1) => (
                                    <div key={Car1.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image10}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={Car1.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Car1.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{Car1.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car1.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car1.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        href="../../carsdetails"
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

                                {ImageList2.map((Car2) => (
                                    <div key={Car2.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image11}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={Car2.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Car2.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{Car2.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car2.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car2.passengers}</div>
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

                                {ImageList3.map((Car3) => (
                                    <div key={Car3.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image12}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={Car3.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Car3.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{Car3.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car3.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car3.passengers}</div>
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

                                {ImageList4.map((Car4) => (
                                    <div key={Car4.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image13}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={Car4.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Car4.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{Car4.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car4.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car4.passengers}</div>
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

                                {ImageList5.map((Car5) => (
                                    <div key={Car5.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image14}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={Car5.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Car5.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{Car5.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car5.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car5.passengers}</div>
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

                                {ImageList6.map((Car6) => (
                                    <div key={Car6.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image15}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={Car6.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Car6.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{Car6.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car6.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car6.passengers}</div>
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

                                {ImageList7.map((Car7) => (
                                    <div key={Car7.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image16}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={Car7.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Car7.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{Car7.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car7.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{Car7.passengers}</div>
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


                        </div>



                    </div>

                </div>
            </div>
        </>

    )
}
