import React from 'react'
import Navbar from '../../components/Navbar'



import Image17 from '../../assets/RentalsImages/Vans/caravan.png'
import Image18 from '../../assets/RentalsImages/Vans/hiace.png'
import Image19 from '../../assets/RentalsImages/Vans/kdh2.png'
import Image20 from '../../assets/RentalsImages/Vans/caravan2.png'
import Image21 from '../../assets/RentalsImages/Vans/hiace2.png'
import Image22 from '../../assets/RentalsImages/Vans/kdh.png'



const ImageList8 = [
    {
        id: 17,
        href: "#",
        title: "Vehicle Model - Caravan",
        color: "Color - White",
        price: "Distance Price - 100km/Rs:4800/=",
        passengers: "Eighteen (18)"
    },
]
const ImageList9 = [
    {
        id: 18,
        href: "#",
        title: "Vehicle Model - hiace",
        color: "Color - Baige",
        price: "Distance Price - 200km/Rs:3000/=",
        passengers: "Eleven (11)"
    },

]
const ImageList10 = [
    {
        id: 19,
        href: "#",
        title: "Vehicle Model - kdh2",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Eleven (11)"
    },

]
const ImageList11 = [
    {
        id: 20,
        href: "#",
        title: "Vehicle Model - caravan2",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Eighteen (18)"
    },

]
const ImageList12 = [
    {
        id: 21,
        href: "#",
        title: "Vehicle Model - hiace2",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Eleven (11)"
    },

]
const ImageList13 = [
    {
        id: 22,
        href: "#",
        title: "Vehicle Model - kdh",
        color: " Color - Black",
        price: "Distance Price - 100km/Rs:5500/=",
        passengers: "Eleven (11)"
    },

]


export const VansMain = () => {
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
                                {ImageList8.map((V1) => (
                                    <div key={V1.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image17}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={V1.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {V1.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{V1.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{V1.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{V1.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        href="../../vansdetails"
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

                                {ImageList9.map((V2) => (
                                    <div key={V2.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image18}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={V2.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {V2.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{V2.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{V2.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{V2.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        // href="../../CarsMain"
                                                        className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                                                    >
                                                        Rent Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            {/* Vehicle number 3 */}
                            <div className="mt-5 flex  ">

                                {ImageList10.map((V3) => (
                                    <div key={V3.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image19}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={V3.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {V3.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{V3.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{V3.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{V3.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        // href="../../CarsMain"
                                                        className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                                                    >
                                                        Rent Now
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

                                {ImageList11.map((V4) => (
                                    <div key={V4.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image20}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={V4.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {V4.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{V4.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{V4.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{V4.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        // href="../../CarsMain"
                                                        className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                                                    >
                                                        Rent Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                </div>
                                <div className="mt-5 flex  ">

                                {ImageList12.map((V5) => (
                                    <div key={V5.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image21}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={V5.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {V5.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{V5.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{V5.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{V5.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        // href="../../CarsMain"
                                                        className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                                                    >
                                                        Rent Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                </div>
                                <div className="mt-5 flex  ">

                                {ImageList13.map((V6) => (
                                    <div key={V6.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image22}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    <a href={V6.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {V6.title}
                                                    </a>
                                                </div>
                                                <div className="mt-1 text-sm font-medium text-gray-900">{V6.color}</div>
                                                <div className=" text-sm font-medium text-gray-900">{V6.price}</div>
                                                <div className=" text-sm font-medium text-gray-900">{V6.passengers}</div>
                                                <div className='mt-2  flex h-10  '>
                                                    <a
                                                        // href="../../CarsMain"
                                                        className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                                                    >
                                                        Rent Now
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
        </>

    )
}

