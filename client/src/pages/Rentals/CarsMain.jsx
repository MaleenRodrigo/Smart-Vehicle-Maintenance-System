import React from 'react'
import Navbar from '../../components/Navbar'



import Image10 from '../../assets/RentalsImages/Cars/premio.png'
import Image11 from '../../assets/RentalsImages/Cars/WagonR.png'
import Image12 from '../../assets/RentalsImages/Cars/bmw1.png'
import Image13 from '../../assets/RentalsImages/Cars/Axio.png'
import Image14 from '../../assets/RentalsImages/Cars/WagonR2.png'
import Image15 from '../../assets/RentalsImages/Cars/BMW2.png'
import Image16 from '../../assets/RentalsImages/Cars/Axio2.png'


const ImageList = [
    {
        id: 10,
        href: "#",
        title: "Premioppp",
        color: "White",
        price: "200km/Rs:3500/=",
    },
]
const ImageList2 = [
    {
        id: 11,
        href: "#",
        title: "WagonR",
        color: "White",
        price: "200km/Rs:3500/=",
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
                                href="../Rentals/NewVehicleForm"
                                className="inline-block rounded-md border border-transparent bg-blue-700 px-10 py-1 text-center font-semibold text-white hover:bg-blue-800"
                            >
                                Add a New Vehicle
                            </a>
                        </div>

                        <div className=' mt-5 flex gap-3 justify-between'>
                            <div className=" mt-5 flex ">
                                {ImageList.map((Car1) => (
                                    <div key={Car1.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image10}

                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex">
                                            <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <a href={Car1.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Car1.title}
                                                    </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">{Car1.color}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">{Car1.price}</p>
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
                                        <div className="mt-4 flex">
                                            <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <a href={Car2.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Car2.title}
                                                    </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">{Car2.color}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">{Car2.price}</p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            {/* Vehicle number 3 */}
                            <div className="mt-5 flex  ">

                                <div className="group relative ">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                        <img
                                            src={Image12}
                                            alt={Image12}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex ">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href={Image12.href}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {Image12.Premio}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{Image12.color}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{Image12.price}</p>
                                    </div>
                                </div>

                            </div>


                        </div>
                        {/* Vehicle number 4 */}
                        <div>
                            <div className='mt-5 flex gap-3 justify-between'>
                                <div className=" mt-5 flex ">

                                    <div className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image13}
                                                alt={Image13}
                                                className="h-full w-full object-cover object-center lg:h-full lg:w-96"
                                            />
                                        </div>
                                        <div className="mt-4 flex">
                                            <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <a href={Image13.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Image13.Premio}
                                                    </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">{Image13.color}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">{Image13.price}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="mt-5 flex  ">

                                    <div className="group relative ">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image16}
                                                alt={Image16}
                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <a href={Image16.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Image16.Premio}
                                                    </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">{Image16.color}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">{Image16.price}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="mt-5 flex  ">

                                    <div className="group relative ">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image15}
                                                alt={Image15}
                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <a href={Image15.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Image15.Premio}
                                                    </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">{Image15.color}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">{Image15.price}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="mt-5 flex  ">

                                    <div className="group relative ">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-55 lg:h-64">
                                            <img
                                                src={Image14}
                                                alt={Image14}
                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex ">
                                            <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <a href={Image14.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {Image14.Premio}
                                                    </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">{Image14.color}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">{Image14.price}</p>
                                        </div>
                                    </div>

                                </div>


                            </div>


                        </div>



                    </div>

                </div>
            </div>
        </>

    )
}
