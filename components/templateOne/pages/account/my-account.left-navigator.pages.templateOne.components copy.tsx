import React from 'react';
import { useAppSelector } from '../../../../redux/hooks.redux';
import { selectCustomer } from '../../../../redux/slices/user.slices.redux';

export const MyAccountRightSection = () => {
  const customerData = useAppSelector(selectCustomer);

  return (
    <div>
      <ul>
        <li>
          <h3>Name</h3>
          <p>{customerData.name}</p>
        </li>
        <li>
          <h3>Email</h3>
          <p>{customerData.email || 'N/A'}</p>
        </li>
        <li>
          <h3>Phone Number</h3>
          <p>
            +{customerData.country_code} {customerData.phone}
          </p>
        </li>
      </ul>
    </div>
  );
};
