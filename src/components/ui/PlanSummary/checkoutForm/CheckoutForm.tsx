'use client'
import { useOrderSummaryMutation } from "@/redux/api/userApi";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMemo, useState } from "react";

const CheckoutForm = ({quantity,planId}:{quantity:number,planId:number}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");
    const [success, setSuccess] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [orderSummary] = useOrderSummaryMutation()
const order = {_id:1,paymentPrice:500,userName:'xyz',userEmail:'user@gmail.com' }
    const { _id, userName, userEmail } = order;


        const handleOrderSummary = async () => {
            const data:any = await orderSummary({ data: {totalSeat:quantity}, id: planId });
            setClientSecret(data?.data?.client_secret);
        }
    

    useMemo(() => {
        if (quantity || planId) {
            handleOrderSummary()
        }
    }, [quantity,planId])
    
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });
        console.log(card)

        // ERROR
        if (error) {
            setCardError(error.message as string);
            setSuccess("");
            setProcessing(true);
            console.log("[error]", error);
        } else {
            setCardError("");
            console.log("[PaymentMethod]", paymentMethod);
        }
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: userName,
                        email: userEmail,
                    },
                },
            });
        console.log("intentError",paymentIntent)
        if (intentError) {
            setCardError(intentError?.message as string);
            console.log(intentError)
            setSuccess("");
        }
        else {
            setCardError("");
            setTransactionId(paymentIntent.id);
            setSuccess("Your payment is complete.");

            const payment = {
                order: _id,
                transactionId: paymentIntent.id,
            };
            fetch(`localhost:8000/api/v1/user/order-summary/5`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
                body: JSON.stringify(payment),
            })
                .then((res) => res.json())
                .then((data) => {
                    setProcessing(false);
                });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                }
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button
                    className="btn btn-success alert-success mt-3"
                    type="submit"
                    // disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>
            </form>
            {cardError && <p className="text-danger">{cardError}</p>}
            {success && (
                <div className="text-success">
                    <p>{success} </p>
                    <p>
                        Your transaction Id:{" "}
                        <span className="text-success fw-bold">
                            {transactionId}
                        </span>{" "}
                    </p>
                </div>
            )}
        </>
    );
};

export default CheckoutForm;