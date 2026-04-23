import * as Yup from 'yup';

export const invoiceSchema = Yup.object().shape({
    senderAddress: Yup.object().shape({
        street: Yup.string().required("can't be empty"),
        city: Yup.string().required("can't be empty"),
        postCode: Yup.string().required("can't be empty"),
        country: Yup.string().required("can't be empty"),
    }),
    clientName: Yup.string().required("can't be empty"),
    clientEmail: Yup.string().email("invalid email").required("can't be empty"),
    clientAddress: Yup.object().shape({
        street: Yup.string().required("can't be empty"),
        city: Yup.string().required("can't be empty"),
        postCode: Yup.string().required("can't be empty"),
        country: Yup.string().required("can't be empty"),
    }),
    createdAt: Yup.date().required("can't be empty"),
    paymentTerms: Yup.number().required("can't be empty"),
    description: Yup.string().required("can't be empty"),
    items: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required("can't be empty"),
            quantity: Yup.number()
                .typeError("must be a number")
                .positive("must be > 0")
                .required("can't be empty"),
            price: Yup.number()
                .typeError("must be a number")
                .positive("must be > 0")
                .required("can't be empty"),
        })
    ).min(1, "An item must be added"),
});
