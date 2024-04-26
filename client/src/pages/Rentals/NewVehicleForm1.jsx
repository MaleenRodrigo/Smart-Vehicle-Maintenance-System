"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Table } from "flowbite-react";


export const NewVehicleForm1 = () => {
    const [vehicleModel, setVehicleModel] = useState('');
    const [numberPlate, setNumberPlate] = useState('');
    const [colour, setColour] = useState('');
    const [about, setAbout] = useState('');
    const [distance, setDistance] = useState('');
    const [price, setPrice] = useState('');
    const [passengerCount, setPassengerCount] = useState('');

    const [errors, setErrors] = useState({
        vehicleModel: '',
        numberPlate: '',
        colour: '',
        about: '',
        distance: '',
        price: '',
        passengerCount: ''
    });

    const validate = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!/^[a-zA-Z0-9 -]*$/.test(vehicleModel)) {
            newErrors.vehicleModel = 'Invalid input';
            isValid = false;
        } else {
            newErrors.vehicleModel = '';
        }

        if (!/^[A-Z0-9-]*$/.test(numberPlate)) {
            newErrors.numberPlate = 'Invalid input';
            isValid = false;
        } else {
            newErrors.numberPlate = '';
        }

        if (!/^[a-zA-Z]*$/.test(colour)) {
            newErrors.colour = 'Invalid input';
            isValid = false;
        } else {
            newErrors.colour = '';
        }

        if (about.length > 500) {
            newErrors.about = 'Exceeded word limit';
            isValid = false;
        } else {
            newErrors.about = '';
        }

        if (!/^\d+$/.test(distance)) {
            newErrors.distance = 'Invalid input';
            isValid = false;
        } else {
            newErrors.distance = '';
        }

        if (!/^\d{1,10}$/.test(price)) {
            newErrors.price = 'Invalid input';
            isValid = false;
        } else {
            newErrors.price = '';
        }

        if (!/^\d{1,2}$/.test(passengerCount)) {
            newErrors.passengerCount = 'Invalid input';
            isValid = false;
        } else {
            newErrors.passengerCount = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Submit the form data
        }
    };

    return (
        <>
            <Navbar />
            <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple MacBook Pro 17"'}
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Google Pixel Phone
            </Table.Cell>
            <Table.Cell>Gray</Table.Cell>
            <Table.Cell>Phone</Table.Cell>
            <Table.Cell>$799</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Apple Watch 5</Table.Cell>
            <Table.Cell>Red</Table.Cell>
            <Table.Cell>Wearables</Table.Cell>
            <Table.Cell>$999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
        </>
    );
};
