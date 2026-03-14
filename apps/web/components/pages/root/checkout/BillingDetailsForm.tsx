import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BillingDetailsSchemaType } from 'lib/schemas/billingDetails';
import CheckboxField from 'components/base/CheckboxField';
import TextField from 'components/base/TextField';

const BillingDetailsForm = () => {
  const { control } = useForm<BillingDetailsSchemaType>();

  return (
    <div>
      <div className="mb-4 md:mb-6 lg:mb-8">
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <TextField
              type="text"
              label="First Name"
              placeholder="Enter First Name..."
              {...field}
            />
          )}
        />
      </div>
      <div className="mb-4 md:mb-6 lg:mb-8">
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <TextField
              label="Last Name"
              type="text"
              placeholder="Enter Last Name..."
              {...field}
            />
          )}
        />
      </div>
      <div className="mb-4 md:mb-6 lg:mb-8">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              type="email"
              label="Email Address"
              placeholder="Enter Email Address..."
              {...field}
            />
          )}
        />
      </div>
      <div className="mb-4 md:mb-6 lg:mb-8">
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <TextField
              label="Phone"
              type="text"
              placeholder="Enter Phone Number..."
              {...field}
            />
          )}
        />
      </div>
      <div className="mb-4 md:mb-6 lg:mb-8">
        <Controller
          control={control}
          name="address"
          render={({ field }) => (
            <TextField
              label="Address"
              type="text"
              placeholder="Enter Address..."
              {...field}
            />
          )}
        />
      </div>
      <div className="mb-4 md:mb-6 lg:mb-8">
        <Controller
          control={control}
          name="town"
          render={({ field }) => (
            <TextField
              label="Town"
              type="text"
              placeholder="Enter Town..."
              {...field}
            />
          )}
        />
      </div>
      <div className="mb-4 md:mb-6 lg:mb-8">
        <Controller
          control={control}
          name="zip"
          render={({ field }) => (
            <TextField
              label="ZIP Code"
              type="text"
              placeholder="Enter ZIP Code..."
              {...field}
            />
          )}
        />
      </div>
      <div className="">
        <Controller
          control={control}
          name="saveInfo"
          render={({ field }) => (
            <CheckboxField
              label="Save this information for the next checkout"
              labelClassName="text-xs"
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
};

export default BillingDetailsForm;
