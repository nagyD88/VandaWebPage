import React from "react";
import { useState } from "react";
import api from "../hooks/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EmailType } from "../model/EmailType";

const EMAIL_REGEX =
  /^[a-zA-Z0-9][a-zA-Z0-9!#$%&'*+-/=?^_`{|]{0,63}@[a-zA-Z0-9-.]{0,253}.(com|net|org|hu)$/;

const PreRegistration = () => {
  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState(true);
  const [registered, setRegistered] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [admin, setAdmin] = useState(false);
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState("");

  const basicRegEmail = 1;

  const postUser = async () =>
    await api.post("/user", {
      email: email,
      admin: admin,
      firstName: firstName,
      lastName: lastName,
    });

  const getEmail = async () => {
    const response = await api.get<EmailType>(`/email/${basicRegEmail}`);
    return response.data;
  };

  const { isLoading, isError, error, data } = useQuery("emial", getEmail);

  const sendEmial = async (response) =>
    await api.post("/email", {
      to: email,
      subject: "Registráció",
      body: `Kedves ${firstName} ${lastName}!\n
    ${data?.body} 'http://localhost:3000/registration?id=${response?.data?.id}&email=${email}`,
    });

  const postUserMutation = useMutation(postUser, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries("Users");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistered(true);
    if (EMAIL_REGEX.test(email)) {
      setEmailValidation(true);
      try {
        const response = await postUserMutation.mutateAsync();
        setErrorMsg("");
        console.log(response);
        const emailResponse = await sendEmial(response);
        console.log(emailResponse);
      } catch (err) {
        if (err.response?.status === 400) {
          setRegistered(false);
          console.log(registered);
        }
        setErrorMsg(err.message);
        console.log(errorMsg);
        console.log(err);
      } finally {
        console.log(`email validation: ${emailValidation}`);
      }
    }
  };

  return (
    <>
      <div className=" bg-[#003f5f] w-80 object-center rounded-xl shadow-2xl mt-16">
        <form onSubmit={handleSubmit} className="">
          <label>
            Vezeték Név:
            <input
              className="ml-2 rounded"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label>
            Kereszt Név:
            <input
              className="ml-2 rounded"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label className="ml-10">
            e-mail:
            <input
              className="ml-2 rounded"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {!registered && <p>This email is already registered.</p>}
          {!emailValidation && <p>Invalid email</p>}

          <label>
            Admin:
            <input
              id="admin"
              type="checkbox"
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
            />
          </label>
          <button type="submit" className=" bg-[#f5f5f5] ml-20">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PreRegistration;
