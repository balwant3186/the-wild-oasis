import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useGuests } from "./useGuests";
import Select from "../../ui/Select";
// import { useCreateCabin } from "./useCreateCabin";
// import { useEditCabin } from "./useEditCabin";
import { useCabins } from "../cabins/useCabins";
import { useSettings } from "../settings/useSettings";
import Checkbox from "../../ui/Checkbox";
import DataItem from "../../ui/DataItem";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import Price from "../../ui/Price";

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { id: editBookingId, ...editValues } = bookingToEdit;

  const isEditSession = Boolean(editBookingId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { guests = [], isGuestsLoading } = useGuests();

  const { cabins = [], isLoading: isCabinsLoading } = useCabins();

  const {
    settings: { maxBookingLength, minBookingLength, maxGuestsPerBooking } = {},
  } = useSettings();

  const guestsOptions = guests?.map((guest) => ({
    value: guest.id,
    label: guest.fullName,
  }));

  guestsOptions.unshift({ value: "", label: "Select guest" });

  const cabinsOptions = cabins?.map((cabin) => ({
    value: cabin.id,
    label: `${cabin.name} - ${cabin.regularPrice}$`,
  }));

  cabinsOptions.unshift({ value: "", label: "Select cabin" });

  console.log("🚀 ~ cabinsOptions ~ cabinsOptions:", cabinsOptions);

  //   const { createCabin, isCreating } = useCreateCabin();

  //   const { editCabin, isEditing } = useEditCabin();

  const onSubmit = (data) => {
    // const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      //   editCabin(
      //     { newBookingData: { ...data, image }, id: editBookingId },
      //     {
      //       onSuccess: () => {
      //         reset();
      //         onCloseModal?.();
      //       },
      //     }
      //   );
    } else {
      //   createCabin(
      //     { ...data, image },
      //     {
      //       onSuccess: () => {
      //         reset();
      //         onCloseModal?.();
      //       },
      //     }
      //   );
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  // const isWorking = isCreating || isEditing || isGuestsLoading || isCabinsLoading;

  const isWorking = false;

  const handleGuestChange = () => {};

  const handleCabinChange = () => {};

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Guest" error={errors?.guest?.message}>
        <Select
          options={guestsOptions}
          value={""}
          type="white"
          onChange={handleGuestChange}
          disabled={isWorking}
          id="guest"
        />
      </FormRow>

      <FormRow label="Cabin" error={errors?.cabin?.message}>
        <Select
          options={cabinsOptions}
          value={""}
          type="white"
          onChange={handleCabinChange}
          disabled={isWorking}
          id="cabin"
        />
      </FormRow>

      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value is 1",
            },
            max: {
              value: maxGuestsPerBooking,
              message: `Maximum value is ${maxGuestsPerBooking}`,
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          type="number"
          id="observations"
          defaultValue=""
          {...register("observations", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Breakfast Included" error={errors?.breakfast?.message}>
        <Input
          type="checkbox"
          id="breakfast"
          defaultValue={false}
          {...register("breakfast")}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Paid" error={errors?.ispaid?.message}>
        <Input
          type="checkbox"
          id="ispaid"
          defaultValue={false}
          {...register("ispaid")}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Total price">
        <Price ispaid={1}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(1000)}
          </DataItem>
        </Price>
      </FormRow>

      <FormRow>
        <>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "Edit" : "Add"} booking
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;

// Todo

// ! Add has breakfast checkbox
// ! Add is Paid checkbox
// ! Add Start Date and End Date inputs
// ? Add status select
// * Add Form validation
// ! Add Total Price for displaying
// * Add Api
// * Edit Form preselect all data
// * Edit Api
