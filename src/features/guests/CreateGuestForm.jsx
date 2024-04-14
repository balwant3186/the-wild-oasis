import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useCreateGuest } from "./useCreateGuest";
import { EMAIL_REGEX } from "../../utils/constants";
// import { useEditCabin } from "./useEditCabin";

function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { id: editCabinId, ...editValues } = guestToEdit;

  const isEditSession = Boolean(editCabinId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { createGuest, isCreating } = useCreateGuest();

  //   const { editCabin, isEditing } = useEditCabin();

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    if (isEditSession) {
      //   editCabin(
      //     { newCabinData: { ...data, image }, id: editCabinId },
      //     {
      //       onSuccess: () => {
      //         reset();
      //         onCloseModal?.();
      //       },
      //     }
      //   );
    } else {
      createGuest(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  //   const isWorking = isCreating || isEditing;

  const isWorking = false;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Guest Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email address",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          {...register("nationality", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Country Flag" error={errors?.countryFlag?.message}>
        <Input
          type="text"
          id="countryFlag"
          defaultValue={"https://flagcdn.com/jp.svg"}
          {...register("countryFlag", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
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
            {isEditSession ? "Edit" : "Add"} guest
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
