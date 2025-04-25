import { SelectDropdownMultiple } from '@/components/ui/SelectDropdownMultiple';
import { ROLE, PARTNER_ROLE } from '@/enums/role';
import { FieldErrors } from 'react-hook-form';

const roleOptions = [
  { value: ROLE.OWNER, name: 'Owner' },
  { value: ROLE.ADMIN, name: 'Admin' },
  { value: ROLE.SUPPORT, name: 'Support' },
  { value: ROLE.PARTNER, name: 'Partner' },
  { value: PARTNER_ROLE.CURRENCY_SELLER, name: 'Currency Seller' },
  { value: PARTNER_ROLE.CURRENCY_SUPPLIER, name: 'Currency Supplier' },
  { value: PARTNER_ROLE.BOOSTER, name: 'Booster' },
  { value: ROLE.CUSTOMER, name: 'Customer' },
];

interface RoleSelectEmplyeeFormProps {
  selectedRoles: string[];
  handleChange: (selectedOptions: any) => void;
  errors?: FieldErrors;
}

const RoleSelectEmplyeeForm = ({
  selectedRoles,
  handleChange,
  errors,
}: RoleSelectEmplyeeFormProps) => {
  console.log('Current selectedRoles:', selectedRoles); // Debug log

  return (
    <SelectDropdownMultiple
      label='Role in company'
      onChange={(selected) => {
        console.log('Selection changed:', selected); // Debug log
        handleChange(selected);
      }}
      options={roleOptions}
      displayPropName='name'
      valuePropName='value'
      selectedDefaultValue={selectedRoles}
      errors={errors}
      name='roles'
    />
  );
};

export default RoleSelectEmplyeeForm;
